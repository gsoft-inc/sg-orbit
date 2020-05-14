import { AutoControlledPureComponent, DOMEventListener, KEYS, getAutoControlledStateFromProps, isNullOrEmpty, mergeClasses } from "../../shared";
import { Button } from "../../button";
import { CloseIcon, MagnifierIcon } from "../../icons";
import { DEFAULT_SIZE, SIZES } from "./sizes";
import { RESULT_SHAPE } from "./results";
import { Ref, Search } from "semantic-ui-react";
import { TextInput } from "../../text-input";
import { arrayOf, bool, func, number, object, oneOf, shape, string } from "prop-types";
import { createRef } from "react";
import { debounce, isEmpty, isFunction, isNil } from "lodash";

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
        onClear: func,
        onBlur: func,
        onKeyDown: func,
        onOutsideClick: func,
        resultRenderer: func,
        clearOnSelect: bool,
        noResultsMessage: string,
        minCharacters: number,
        placeholder: string,
        debounceDelay: number,
        loading: bool,
        disabled: bool,
        autofocus: bool,
        autofocusDelay: number,
        fluid: bool,
        size: oneOf(SIZES),
        className: string,
        style: object
    };

    static defaultProps = {
        resultRenderer: defaultResultRenderer,
        clearOnSelect: false,
        minCharacters: 1,
        placeholder: "Search",
        debounceDelay: 200,
        loading: false,
        disabled: false,
        autofocus: false,
        autofocusDelay: 50,
        size: DEFAULT_SIZE,
        fluid: false
    };

    static autoControlledProps = ["value"];

    state = {
        transformedResults: [],
        value: null,
        query: null,
        renderPropagationFix: !this.props.disabled
    };

    _containerRef = createRef();
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

        if (!isNil(this._clearButtonRef.current) && !this._clearButtonRef.current.contains(event.relatedTarget)) {
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

    handleClear = event => {
        const { onClear } = this.props;

        this.clear(event);

        if (!isNil(onClear)) {
            onClear(event);
        }
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
            onKeyDown(event);
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

    handleDocumentClick = event => {
        const { onOutsideClick } = this.props;

        if (!isNil(onOutsideClick)) {
            if (!isNil(this._containerRef.current) && !this._containerRef.current.contains(event.target)) {
                onOutsideClick(event);
            }
        }
    };

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

    renderResult = result => {
        const { resultRenderer } = this.props;

        const data = JSON.parse(result.description);

        return resultRenderer(data);
    };

    renderClearButton() {
        if (!this.canClear()) {
            return null;
        }

        return (
            <Button
                icon={<CloseIcon />}
                onClick={this.handleClear}
                ref={this._clearButtonRef}
                data-testid="search-input-clear-button"
            />
        );
    }

    renderInput = () => {
        const { open, loading, disabled, autofocus, autofocusDelay, size, fluid } = this.props;

        return (
            <TextInput
                onKeyDown={this.handleInputKeyDown}
                icon={<MagnifierIcon />}
                iconPosition="left"
                button={this.renderClearButton()}
                loading={loading && !disabled}
                autofocus={open || autofocus}
                autofocusDelay={open ? undefined : autofocusDelay}
                disabled={disabled}
                size={size}
                fluid={fluid}
                ref={this._inputRef}
                data-testid="search-input-textbox"
            />
        );
    }

    render() {
        const { open, loading, disabled, noResultsMessage, minCharacters, placeholder, fluid, className, style } = this.props;
        const { transformedResults, query } = this.state;

        const searchClasses = mergeClasses(
            "outline-none",
            className
        );

        return (
            <>
                <Ref innerRef={this._containerRef}>
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
                        input={this.renderInput()}
                        placeholder={placeholder}
                        disabled={disabled}
                        tabIndex="-1"
                        loading={loading && !disabled}
                        fluid={fluid}
                        className={searchClasses}
                        style={style}
                    />
                </Ref>

                <If condition={open}>
                    <DOMEventListener name="click" on={this.handleDocumentClick} />
                </If>
            </>
        );
    }
}
