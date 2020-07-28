import { AutoControlledPureComponent, KEYS, getAutoControlledStateFromProps } from "../../shared";
import { SearchInputController } from "./search-input-controller";
import { arrayOf, bool, element, elementType, func, number, oneOf, oneOfType, shape, string } from "prop-types";
import { isNil } from "lodash";

// Duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise the props will not render properly in the docs.
const RESULT_SHAPE = {
    id: string.isRequired,
    text: string.isRequired
};

// Sizes constants are duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise it will not render properly in the docs.
const SIZES = ["small", "medium", "large"];

export function startsWithSearch(event, items, query) {
    return items.filter(x => x.text.toUpperCase().startsWith(query.toUpperCase()));
}

export class SearchInput extends AutoControlledPureComponent {
    static propTypes = {
        /**
         * Array of results.
         */
        results: arrayOf(shape(RESULT_SHAPE)).isRequired,
        /**
         * A controlled value property.
         */
        value: string,
        /**
         * Initial value.
         */
        defaultValue: string,
        /**
         *  Called when the value change.
         */
        onValueChange: func.isRequired,
        /**
         * Called when the search results open / close.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @param {boolean} isVisible - Indicate if the search input results are visible.
         * @returns {void}
         */
        onVisibilityChange: func,
        /**
         * Called when a search event happens.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @param {Result[]} results - Available results.
         * @param {string} query - Search query that triggered the search.
         * @returns {Result[]} - Results to display.
         */
        onSearch: func,
        /**
         * Called when a clear event happens.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @returns {void}
         */
        onClear: func,
        /**
         * Called on blur.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @returns {void}
         */
        onBlur: func,
        /**
         * Render a result.
         * @param {Object} result - Result to render.
         * @returns {ReactElement} - React element to render.
         */
        resultRenderer: func,
        /**
         * Whether or not the query should be cleared when a result is selected.
         */
        clearOnSelect: bool,
        /**
         * Message to display when there are no results matching the query.
         */
        noResultsMessage: string,
        /**
         * Delay before initiating a search when the query change.
         */
        debounceDelay: number,
        /**
         * Minimum characters to query for results.
         */
        minCharacters: number,
        /**
         * The search input placeholder text.
         */
        placeholder: string,
        /**
         * A controlled open value that determined whether or not the search results are displayed.
         */
        open: bool,
        /**
         * The initial value of open.
         */
        defaultOpen: bool,
        /**
         * Whether or not the search input should autoFocus on render.
         */
        autoFocus: bool,
        /**
         * Delay before trying to autofocus.
         */
        autoFocusDelay: number,
        /**
         * A search input can have different sizes.
         */
        size: oneOf(SIZES),
        /**
         * Whether or not the search input take up the width of its container.
         */
        fluid: bool,
        /**
         * [Text input](/?path=/docs/components-textinput--default-story) component to render.
         */
        input: oneOfType([element, elementType])
    };

    static defaultProps = {
        onSearch: startsWithSearch,
        minCharacters: 1
    };

    static autoControlledProps = ["open"];

    state = {
        open: false,
        visibleResults: []
    };

    static getDerivedStateFromProps(props, state) {
        return getAutoControlledStateFromProps(props, state, SearchInput.autoControlledProps);
    }

    // TODO: memoizing search result could greatly improved the performance of this component:
    //  - The shallow comparison done by search-input-controller would not force a re-render when this is the same results
    handleSearch = (event, query) => {
        const { results, onSearch, minCharacters } = this.props;

        if (query.length >= minCharacters) {
            const newResults = onSearch(event, results, query);

            this.setState({ visibleResults: newResults });
            this.open(event);
        } else {
            this.setState({ visibleResults: [] });
            this.close(event);
        }
    };

    handleValueChange = (event, value) => {
        const { onValueChange } = this.props;

        this.close(event);

        onValueChange(event, value);
    };

    handleClear = event => {
        const { results, onClear, closeOnBlur } = this.props;

        this.setState({ visibleResults: results });

        if (!closeOnBlur) {
            this.close(event);
        }

        if (!isNil(onClear)) {
            onClear(event);
        }
    };

    // Closing the search input on blur will:
    // - close on outside click
    // - close on blur
    // - close on value select
    handleBlur = event => {
        const { onBlur } = this.props;

        this.close(event);

        if (!isNil(onBlur)) {
            onBlur(event);
        }
    };

    handleKeyDown = event => {
        const { onKeyDown } = this.props;

        // Since we fully control the open / close of the <Search /> component, we must handle close on "esc" ourself.
        if (event.keyCode === KEYS.esc) {
            this.close(event);
        }

        if (!isNil(onKeyDown)) {
            onKeyDown(event);
        }
    };

    handleOutsideClick = event => {
        this.close(event);
    };

    open(event) {
        const { onVisibilityChange } = this.props;
        const { open } = this.state;

        if (!open) {
            this.trySetAutoControlledStateValue({ open: true });

            if (!isNil(onVisibilityChange)) {
                onVisibilityChange(event, true);
            }
        }
    }

    close(event) {
        const { onVisibilityChange } = this.props;
        const { open } = this.state;

        if (open) {
            this.trySetAutoControlledStateValue({ open: false });

            if (!isNil(onVisibilityChange)) {
                onVisibilityChange(event, false);
            }
        }
    }

    render() {
        const {
            value,
            defaultValue,
            resultRenderer,
            clearOnSelect,
            noResultsMessage,
            minCharacters,
            debounceDelay,
            placeholder,
            disabled,
            autoFocus,
            autoFocusDelay,
            size,
            fluid,
            input,
            className,
            style
        } = this.props;

        const { open, visibleResults } = this.state;

        return (
            <SearchInputController
                open={open}
                results={visibleResults}
                value={value}
                defaultValue={defaultValue}
                onValueChange={this.handleValueChange}
                onSearch={this.handleSearch}
                onClear={this.handleClear}
                onBlur={this.handleBlur}
                onKeyDown={this.handleKeyDown}
                onOutsideClick={this.handleOutsideClick}
                resultRenderer={resultRenderer}
                clearOnSelect={clearOnSelect}
                noResultsMessage={noResultsMessage}
                minCharacters={minCharacters}
                debounceDelay={debounceDelay}
                placeholder={placeholder}
                disabled={disabled}
                autoFocus={autoFocus}
                autoFocusDelay={autoFocusDelay}
                size={size}
                fluid={fluid}
                input={input}
                className={className}
                style={style}
            />
        );
    }
}
