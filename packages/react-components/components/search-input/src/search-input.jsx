import { AutoControlledPureComponent, KEYS, getAutoControlledStateFromProps } from "@orbit-ui/react-components-shared/src";
import { RESULT_SHAPE } from "./results";
import { SearchInputController } from "./search-input-controller";
import { arrayOf, bool, func, number, shape, string } from "prop-types";
import { isNil } from "lodash";

export function startsWithSearch(items, query) {
    return items.filter(x => x.text.toUpperCase().startsWith(query.toUpperCase()));
}

export class SearchInput extends AutoControlledPureComponent {
    static propTypes = {
        results: arrayOf(shape(RESULT_SHAPE)).isRequired,
        value: string,
        defaultValue: string,
        onValueChange: func.isRequired,
        onVisibilityChange: func,
        onSearch: func,
        onBlur: func,
        resultRenderer: func,
        clearOnSelect: bool,
        noResultsMessage: string,
        debounceDelay: number,
        minCharacters: number,
        placeholder: string,
        defaultOpen: bool,
        open: bool,
        disabled: bool,
        autofocus: bool,
        className: string
    };

    static defaultProps = {
        onSearch: startsWithSearch,
        minCharacters: 1,
        debounceDelay: 200,
        autofocus: false
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
            const newResults = onSearch(results, query, this.props);

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

        if (isNil(value)) {
            this.handleClear(event);
        }

        onValueChange(event, value, this.props);
    };

    handleClear = () => {
        const { results } = this.props;

        this.setState({ visibleResults: results });
    };

    handleBlur = event => {
        const { onBlur } = this.props;

        this.close(event);

        if (!isNil(onBlur)) {
            onBlur(event, this.props);
        }
    };

    handleKeyDown = event => {
        const { onKeyDown } = this.props;

        if (event.keyCode === KEYS.esc) {
            this.close(event);
        }

        if (!isNil(onKeyDown)) {
            onKeyDown(event, this.props);
        }
    };

    open(event) {
        const { onVisibilityChange } = this.props;

        this.trySetAutoControlledStateValue({ open: true });

        if (!isNil(onVisibilityChange)) {
            onVisibilityChange(event, true, this.props);
        }
    }

    close() {
        const { onVisibilityChange } = this.props;

        this.trySetAutoControlledStateValue({ open: false });

        if (!isNil(onVisibilityChange)) {
            onVisibilityChange(event, false, this.props);
        }
    }

    render() {
        const { value, defaultValue, resultRenderer, clearOnSelect, noResultsMessage, minCharacters, debounceDelay, placeholder, disabled, autofocus, className } = this.props;
        const { open, visibleResults } = this.state;

        return (
            <SearchInputController
                open={open}
                results={visibleResults}
                value={value}
                defaultValue={defaultValue}
                onValueChange={this.handleValueChange}
                onSearch={this.handleSearch}
                onBlur={this.handleBlur}
                onKeyDown={this.handleKeyDown}
                resultRenderer={resultRenderer}
                clearOnSelect={clearOnSelect}
                noResultsMessage={noResultsMessage}
                minCharacters={minCharacters}
                debounceDelay={debounceDelay}
                placeholder={placeholder}
                disabled={disabled}
                autofocus={autofocus}
                className={className}
            />
        );
    }
}
