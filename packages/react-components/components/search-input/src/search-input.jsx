import { PureComponent } from "react";
import { RESULT_SHAPE } from "./results";
import { SearchInputController } from "./search-input-controller";
import { arrayOf, bool, func, number, shape, string } from "prop-types";
import { isNil } from "lodash";

export function startsWithSearch(items, query) {
    return items.filter(x => x.text.toUpperCase().startsWith(query.toUpperCase()));
}

const KEYS = {
    esc: 27
};

export class SearchInput extends PureComponent {
    static propTypes = {
        results: arrayOf(shape(RESULT_SHAPE)).isRequired,
        value: string,
        defaultValue: string,
        onValueChange: func.isRequired,
        resultRenderer: func,
        clearOnSelect: bool,
        noResultsMessage: string,
        debounceDelay: number,
        minCharacters: number,
        placeholder: string,
        fluid: bool,
        disabled: bool,
        className: string
    };

    static defaultProps = {
        minCharacters: 1,
        debounceDelay: 200
    };

    state = {
        isOpen: false,
        visibleResults: []
    };

    // TODO: memoizing search result could greatly improved the performance of this component:
    //  - The shallow comparison done by search-input-controller would not force a re-render when this is the same results
    handleSearch = (event, query) => {
        const { results, minCharacters } = this.props;

        if (query.length >= minCharacters) {
            const newResults = startsWithSearch(results, query);

            this.setState({ isOpen: true, visibleResults: newResults });
        } else {
            this.setState({ isOpen: false, visibleResults: [] });
        }
    };

    handleValueChange = (event, value) => {
        const { onValueChange } = this.props;

        this.setState({ isOpen: false });

        if (isNil(value)) {
            this.handleClear(event);
        }

        onValueChange(event, value);
    };

    handleClear = () => {
        const { results } = this.props;

        this.setState({ visibleResults: results });
    };

    handleBlur = () => {
        this.setState({ isOpen: false });
    };

    handleKeyDown = event => {
        if (event.keyCode === KEYS.esc) {
            this.setState({ isOpen: false });
        }
    };

    render() {
        const { value, defaultValue, resultRenderer, clearOnSelect, noResultsMessage, minCharacters, debounceDelay, placeholder, fluid, disabled, className } = this.props;
        const { isOpen, visibleResults } = this.state;

        return (
            <SearchInputController
                open={isOpen}
                results={visibleResults}
                value={value}
                defaultValue={defaultValue}
                onValueChange={this.handleValueChange}
                onSearch={this.handleSearch}
                onBlur={this.handleBlur}
                resultRenderer={resultRenderer}
                clearOnSelect={clearOnSelect}
                noResultsMessage={noResultsMessage}
                minCharacters={minCharacters}
                debounceDelay={debounceDelay}
                placeholder={placeholder}
                fluid={fluid}
                disabled={disabled}
                className={className}
            />
        );
    }
}
