import { AutoControlledPureComponent, getAutoControlledStateFromProps, isNullOrEmpty } from "@sharegate/react-components-shared";
import { Button, Ref, Search } from "semantic-ui-react";
import { ReactComponent as ClearIcon } from "./assets/icon-clear.svg";
import { RESULT_SHAPE } from "./results";
import { arrayOf, bool, func, node, number, shape, string } from "prop-types";
import { createRef } from "react";
import { debounce, isEmpty, isFunction, isNil } from "lodash";
import cx from "classnames";

const KEYS = {
    esc: 27,
    enter: 13
};

function defaultResultRenderer({ text }) {
    return <div>{text}</div>;
}

export class SearchInputController extends AutoControlledPureComponent {
    static propTypes = {
        open: bool,
        results: arrayOf(shape(RESULT_SHAPE)).isRequired,
        value: string,
        defaultValue: string,
        onValueChange: func.isRequired,
        onSearch: func.isRequired,
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
        className: string
    };

    static defaultProps = {
        resultRenderer: defaultResultRenderer,
        clearOnSelect: false,
        minCharacters: 1,
        placeholder: "Search",
        debounceDelay: 200,
        loading: false,
        clearIcon: <ClearIcon />,
        disabled: false
    };

    static autoControlledProps = ["value"];

    state = {
        results: [],
        transformedResults: [],
        value: null,
        query: null,
        renderPropagationFix: !this.props.disabled
    };

    _inputRef = createRef();
    _clearButtonRef = createRef();

    componentDidMount() {
        this.transformResults();
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
    }

    static getDerivedStateFromProps(props, state) {
        return getAutoControlledStateFromProps(props, state, SearchInputController.autoControlledProps, ({ value }) => ({
            query: isNil(value) ? "" : value
        }));
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

        onValueChange(event, selectedResult);
    };

    handleSearchChange = (event, data) => {
        this.setState({ query: data.value });

        if (!isNil(this.onSearch)) {
            this.onSearch(event, data.value);
        }
    };

    handleBlur = event => {
        const { onBlur, disabled } = this.props;

        const afterHandlingBlur = () => {
            if (!disabled) {
                this.setState({ renderPropagationFix: true });
            }

            if (!isNil(onBlur)) {
                onBlur(event);
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

    handleFocus = event => {
        const { onFocus } = this.props;

        if (!isNil(onFocus)) {
            onFocus(event);
        }
    };

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
            default:
                if (!isNil(onKeyDown)) {
                    onKeyDown(event);
                }
        }
    };

    handleInputEnter = event => {
        const { loading, onKeyDown } = this.props;
        const { query } = this.state;

        if (!loading) {
            if (isNullOrEmpty(query)) {
                this.clear(event);
            } else {
                if (!isNil(onKeyDown)) {
                    onKeyDown(event);
                }
            }
        }
    };

    handleInputEscape = event => {
        const { open, onKeyDown } = this.props;

        if (open === false) {
            this.clear(event);
        } else {
            if (!isNil(onKeyDown)) {
                onKeyDown(event);
            }
        }
    };

    handlePropagationFixFocus = () => {
        const { disabled } = this.props;

        if (!disabled) {
            this.setState({ renderPropagationFix: false });

            setTimeout(() => {
                this._inputRef.current.focus();
            }, 0);
        }
    };

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

            onValueChange(event, null);
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

        return resultRenderer(data);
    };

    renderPropagationFix = () => {
        const { disabled } = this.props;
        const { renderPropagationFix } = this.state;

        return (
            // prettier-ignore
            <div
                className={cx("absolute top-0 left-0 w-100 h-100 cursor-text o-0", { dn: !renderPropagationFix })}
                onFocus={this.handlePropagationFixFocus}
                tabIndex={disabled ? null : "0"}
            />
        );
    };

    renderClearButton = () => {
        const { clearIcon } = this.props;

        return (
            <div className={cx("cancel-btn-container absolute", { dn: !this.canClear() })}>
                <Ref innerRef={this._clearButtonRef}>
                    <Button circular size="mini" primary icon className="transparent" onClick={this.handleClear}>
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
        const { open, loading, disabled, noResultsMessage, minCharacters, placeholder, fluid } = this.props;
        const { transformedResults, query } = this.state;

        return (
            <div className="search-input relative w-100">
                {/* prettier-ignore */}
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
                    input={{ icon: loading && !disabled ? "" : "search", iconPosition: "left", className: this.getInputCssClasses(), onKeyDown: this.handleInputKeyDown, ref: this._inputRef }}
                    placeholder={placeholder}
                    disabled={disabled}
                    loading={loading && !disabled}
                />
                {this.renderPropagationFix()}
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
