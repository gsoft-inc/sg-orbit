import { ArgumentError, AutoControlledPureComponent, KEYS, getAutoControlledStateFromProps } from "@orbit-ui/react-components-shared";
import { SearchInputController } from "./search-input-controller";
import { arrayOf, bool, func, number, shape, string } from "prop-types";
import { isNil } from "lodash";

// Duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise the preset will not render properly in the docs.
const RESULT_SHAPE = {
    id: string.isRequired,
    text: string.isRequired
};

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
         * @param {Object} props - All the props.
         * @returns {void}
         */
        onVisibilityChange: func,
        /**
         * Called when a search event happens.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @param {Result[]} results - Available results.
         * @param {string} query - Search query that triggered the search.
         * @param {Object} props - All the props.
         * @returns {Result[]} - Results to display.
         */
        onSearch: func,
        /**
         * Called when a clear event happens.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @param {Object} props - All the props.
         * @returns {void}
         */
        onClear: func,
        /**
         * Called on blur.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @param {Object} props - All the props.
         * @returns {void}
         */
        onBlur: func,
        /**
         * Called when a click happens outside the search input.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @param {Object} props - All the props.
         * @returns {void}
         */
        onOutsideClick: func,
        /**
         * Render a result.
         * @param {Object} result - Result to render.
         * @param {Object} props - All the props.
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
         * A disabled search input does not allow user interaction.
         */
        disabled: bool,
        /**
         * Whether or not the search input should focus on render.
         */
        autofocus: bool,
        /**
         * Delay before trying to autofocus.
         */
        autofocusDelay: number,
        /**
         * Whether or not the search results should close when the search input loose focus.
         */
        closeOnBlur: bool,
        /**
         * Whether or not the search results should close when a click happens outside the search input.
         * Requires `closeOnBlur` to be `false`.
         */
        closeOnOutsideClick: bool,
        /**
         * Additional classes.
         */
        className: string
    };

    static defaultProps = {
        onSearch: startsWithSearch,
        minCharacters: 1,
        closeOnBlur: true,
        closeOnOutsideClick: false
    };

    static autoControlledProps = ["open"];

    state = {
        open: false,
        visibleResults: []
    };

    static getDerivedStateFromProps(props, state) {
        return getAutoControlledStateFromProps(props, state, SearchInput.autoControlledProps);
    }

    componentDidUpdate() {
        const { closeOnBlur, closeOnOutsideClick } = this.props;

        if (closeOnBlur && closeOnOutsideClick) {
            throw new ArgumentError("SearchInput - The \"closeOnBlur\" and \"closeOnOutsideClick\" props cannot be both \"true\".");
        }
    }

    // TODO: memoizing search result could greatly improved the performance of this component:
    //  - The shallow comparison done by search-input-controller would not force a re-render when this is the same results
    handleSearch = (event, query) => {
        const { results, onSearch, minCharacters } = this.props;

        if (query.length >= minCharacters) {
            const newResults = onSearch(event, results, query, this.props);

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

        onValueChange(event, value, this.props);
    };

    handleClear = event => {
        const { results, onClear, closeOnBlur } = this.props;

        this.setState({ visibleResults: results });

        if (!closeOnBlur) {
            this.close(event);
        }

        if (!isNil(onClear)) {
            onClear(event, this.props);
        }
    };

    // Closing the search input on blur will:
    // - close on outside click
    // - close on blur
    // - close on value select
    handleBlur = event => {
        const { onBlur, closeOnBlur } = this.props;

        if (closeOnBlur) {
            this.close(event);
        }

        if (!isNil(onBlur)) {
            onBlur(event, this.props);
        }
    };

    handleKeyDown = event => {
        const { onKeyDown } = this.props;

        // Since we fully control the open / close of the <Search /> component, we must handle close on "esc" ourself.
        if (event.keyCode === KEYS.esc) {
            this.close(event);
        }

        if (!isNil(onKeyDown)) {
            onKeyDown(event, this.props);
        }
    };

    handleOutsideClick = event => {
        const { onOutsideClick, closeOnOutsideClick } = this.props;

        if (closeOnOutsideClick) {
            this.close(event);
        }

        if (!isNil(onOutsideClick)) {
            onOutsideClick(event, this.props);
        }
    };

    open(event) {
        const { onVisibilityChange } = this.props;
        const { open } = this.state;

        if (!open) {
            this.trySetAutoControlledStateValue({ open: true });

            if (!isNil(onVisibilityChange)) {
                onVisibilityChange(event, true, this.props);
            }
        }
    }

    close(event) {
        const { onVisibilityChange } = this.props;
        const { open } = this.state;

        if (open) {
            this.trySetAutoControlledStateValue({ open: false });

            if (!isNil(onVisibilityChange)) {
                onVisibilityChange(event, false, this.props);
            }
        }
    }

    render() {
        const { value, defaultValue, resultRenderer, clearOnSelect, noResultsMessage, minCharacters, debounceDelay, placeholder, disabled, autofocus, autofocusDelay, className } = this.props;
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
                autofocus={autofocus}
                autofocusDelay={autofocusDelay}
                className={className}
            />
        );
    }
}
