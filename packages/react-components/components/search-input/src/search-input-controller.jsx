import { AutoControlledPureComponent, KEYS, getAutoControlledStateFromProps, isNullOrEmpty } from "@orbit-ui/react-components-shared";
import { Button, Ref, Search } from "semantic-ui-react";
import { CancelIcon } from "@orbit-ui/icons";
import { RESULT_SHAPE } from "./results";
import { arrayOf, bool, func, node, number, shape, string } from "prop-types";
import { createRef } from "react";
import { debounce, isEmpty, isFunction, isNil } from "lodash";
import { useHandlerProxy } from "@orbit-ui/react-components-shared";
import cx from "classnames";

function defaultResultRenderer({ text }) {
    return <div data-testid="search-input-result">{text}</div>;
}

export class SearchInputController extends AutoControlledPureComponent {
    static propTypes = {
        open: bool,
        results: arrayOf(shape(RESULT_SHAPE)).isRequired,
        value: string,
        defaultValue: string,
        onValueChange: func.isRequired,
        onSearch: func.isRequired,
        // eslint-disable-next-line react/no-unused-prop-types
        onFocus: func,
        onBlur: func,
        onKeyDown: func,
        resultRenderer: func,
        clearOnSelect: bool,
        noResultsMessage: string,
        minCharacters: number,
        placeholder: string,
        debounceDelay: number,
        loading: bool,
        clearIcon: node,
        disabled: bool,
        autofocus: bool,
        autofocusDelay: number,
        className: string
    };

    static defaultProps = {
        resultRenderer: defaultResultRenderer,
        clearOnSelect: false,
        minCharacters: 1,
        placeholder: "Search",
        debounceDelay: 200,
        loading: false,
        clearIcon: <CancelIcon className="h3 w3" />,
        disabled: false,
        autofocus: false,
        autofocusDelay: 50
    };

    static autoControlledProps = ["value"];

    state = {
        transformedResults: [],
        value: null,
        query: null,
        renderPropagationFix: !this.props.disabled
    };

    _inputRef = createRef();
    _clearButtonRef = createRef();
    _autofocusTimeout = null;

    componentDidMount() {
        const { open, autofocus, autofocusDelay } = this.props;

        this.transformResults();

        if (open) {
            this.focus();
        } else if (autofocus) {
            // This is done manually instead of using the "autoFocus" property of the React input component to add a small delay that ensure that it works when the
            // component is rendered in a popup, modal, etc..
            this.focus(autofocusDelay);
        }
    }

    componentDidUpdate(prevProps) {
        const { results } = this.props;

        // This seems like a good opportunity to use "getDerivedStateFromProps" instead of "componentDidUpdate" to compute the transformed results.
        // It might not be since the shallow comparison of the results array will mostly returns false since the array reference will usually be different.
        // Knowing this, we will mostly end up transforming the results before EVERY render if we use "getDerivedStateFromProps".
        if (prevProps.results !== results) {
            this.transformResults();
        }
    }

    componentWillUnmount() {
        this.cancelOnSearchDebounce();
        this.clearAutofocusTimeout();
    }

    static getDerivedStateFromProps(props, state) {
        return getAutoControlledStateFromProps(props, state, SearchInputController.autoControlledProps, ({ value }) => ({
            query: isNil(value) ? "" : value
        }));
    }

    focus(delay = 0) {
        this._autofocusTimeout = setTimeout(() => {
            if (!isNil(this._inputRef.current)) {
                this._inputRef.current.focus();
            }
        }, delay);
    }

    clearAutofocusTimeout() {
        if (!isNil(this._autofocusTimeout)) {
            clearTimeout(this._autofocusTimeout);
        }
    }

    transformResults() {
        const { results } = this.props;

        // YES, this is a weird hack.
        // Why do we do this? The current version of the search component render all the props that are not "title", "description", "price" or "image"
        // as a data properties on the result DOM elements.
        // Rendering those data properties generates a lot of React errors. React doesn't understand why he have to render a data properties called "userId" or "tenantId".
        // Until this is fixed, the solution is to provide all our custom properties as a JSON serialized string through the "description" property.
        // The issue for this matter is: https://github.com/Semantic-Org/Semantic-UI-React/issues/1141
        const transformedResults = results.map(x => ({
            title: x.text,
            description: JSON.stringify(x)
        }));

        this.setState({ transformedResults: transformedResults });
    }

    handleResultSelect = (event, data) => {
        const { clearOnSelect, onValueChange } = this.props;

        const selectedResult = JSON.parse(data.result.description);

        if (clearOnSelect) {
            this.trySetAutoControlledStateValue({ value: null });
            this.setState({ query: "" });
        } else {
            this.trySetAutoControlledStateValue({ value: selectedResult.text });
            this.setState({ query: selectedResult.text });
        }

        onValueChange(event, selectedResult, this.props);
    };

    handleSearchChange = (event, data) => {
        this.setState({ query: data.value });

        if (!isNil(this.onSearch)) {
            this.onSearch(event, data.value, this.props);
        }
    };

    handleBlur = event => {
        const { onBlur, disabled } = this.props;

        const afterHandlingBlur = () => {
            if (!disabled) {
                this.setState({ renderPropagationFix: true });
            }

            if (!isNil(onBlur)) {
                onBlur(event, this.props);
            }
        };

        if (!this._clearButtonRef.current.contains(event.relatedTarget)) {
            // Without a defered execution the selected value is always different than the typed value.
            setTimeout(() => {
                const { value, query } = this.state;

                if (isNil(value)) {
                    if (!isNullOrEmpty(query)) {
                        // When the user modified the query but didn't select any result and we dont know of any selected result, clear everything.
                        this.trySetAutoControlledStateValue({ value: null });
                        this.setState({ query: "" });
                    }
                } else {
                    // When the user modified the query but didn't select any result, reset the query to the last known selected result.
                    if (value !== query) {
                        this.setState({ query: value });
                    }
                }

                afterHandlingBlur();
            }, 0);
        } else {
            afterHandlingBlur();
        }
    };

    handleFocus = useHandlerProxy(this, "onFocus");

    handleClear = event => {
        this.clear(event);
    };

    handleInputKeyDown = event => {
        const { onKeyDown } = this.props;

        switch (event.keyCode) {
            case KEYS.enter:
                this.handleInputEnter(event);
                break;
            case KEYS.esc:
                this.handleInputEscape(event);
                break;
        }

        if (!isNil(onKeyDown)) {
            onKeyDown(event, this.props);
        }
    };

    handleInputEnter = event => {
        const { loading } = this.props;
        const { query } = this.state;

        if (!loading) {
            if (isNullOrEmpty(query)) {
                this.clear(event);
            }
        }
    };

    handleInputEscape = event => {
        const { open } = this.props;

        if (!open) {
            this.clear(event);
        }
    };

    onSearch = this.props.debounceDelay !== 0 ? debounce(this.props.onSearch, this.props.debounceDelay, { leading: true }) : this.props.onSearch;

    cancelOnSearchDebounce() {
        if (isFunction(this.onSearch.cancel)) {
            this.onSearch.cancel();
        }
    }

    clear(event) {
        const { onValueChange } = this.props;
        const { value, query } = this.state;

        if (!isNullOrEmpty(query)) {
            this.setState({ query: "" });
        }

        if (!isNil(value)) {
            this.trySetAutoControlledStateValue({ value: null });

            onValueChange(event, null, this.props);
        }
    }

    canClear() {
        const { disabled } = this.props;
        const { query } = this.state;

        return !isEmpty(query) && !disabled;
    }

    getInputCssClasses() {
        const { className } = this.props;

        const inputDefaultClasses = "fluid";

        return isNil(className) ? inputDefaultClasses : `${inputDefaultClasses} ${className}`;
    }

    renderResult = result => {
        const { resultRenderer } = this.props;

        const data = JSON.parse(result.description);

        return resultRenderer(data, this.props);
    };

    renderClearButton = () => {
        const { clearIcon } = this.props;

        return (
            <div className={cx("cancel-btn-container absolute", { dn: !this.canClear() })}>
                <Ref innerRef={this._clearButtonRef}>
                    <Button
                        circular
                        size="mini"
                        primary
                        icon
                        className="transparent"
                        onClick={this.handleClear}
                        type="button"
                        data-testid="search-input-clear-button"
                    >
                        {clearIcon}
                    </Button>
                </Ref>

                <style jsx>{`
                    .cancel-btn-container {
                        position: absolute;
                        top: 50%;
                        right: calc(var(--scale-juliett) / 2);
                        transform: translateX(50%) translateY(-50%);
                    }
                `}</style>
            </div>
        );
    };

    render() {
        const { open, loading, disabled, noResultsMessage, minCharacters, placeholder } = this.props;
        const { transformedResults, query } = this.state;

        return (
            <div className="search-input relative w-100">
                <Search
                    open={open && !disabled}
                    minCharacters={minCharacters}
                    noResultsMessage={noResultsMessage}
                    onResultSelect={this.handleResultSelect}
                    onSearchChange={this.handleSearchChange}
                    onBlur={this.handleBlur}
                    resultRenderer={this.renderResult}
                    results={transformedResults}
                    value={query}
                    input={{
                        icon: loading && !disabled ? "" : "search",
                        iconPosition: "left",
                        className: this.getInputCssClasses(),
                        onKeyDown: this.handleInputKeyDown,
                        ref: this._inputRef,
                        "data-testid": "search-input-textbox"
                    }}
                    placeholder={placeholder}
                    disabled={disabled}
                    loading={loading && !disabled}
                />
                {this.renderClearButton()}

                <style jsx>{`
                    .search-input :global(.prompt) {
                        padding-right: var(--scale-juliett) !important;
                    }
                `}</style>
            </div>
        );
    }
}
