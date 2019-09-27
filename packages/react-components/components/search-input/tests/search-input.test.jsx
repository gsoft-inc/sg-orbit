import { SearchInput, searchInputResult } from "@orbit-ui/react-search-input/src";
import { noop } from "lodash";

const RESULT_ID = "search-input-result";
const CLEAR_BUTTON_ID = "search-input-clear-button";

const GEORGE_VALUE = "George";
const LAURIE_VALUE = "Laurie";
const CLARA_VALUE = "Clara";
const FELIX_VALUE = "Felix";
const AUDREY_VALUE = "Audrey";

const DEFAULT_RESULTS = [
    searchInputResult("1", GEORGE_VALUE),
    searchInputResult("2", LAURIE_VALUE),
    searchInputResult("3", CLARA_VALUE),
    searchInputResult("4", FELIX_VALUE),
    searchInputResult("5", AUDREY_VALUE)
];

function createSearchInput({ results = DEFAULT_RESULTS, onValueChange = noop, ...otherProps } = {}) {
    return <SearchInput
        results={results}
        onValueChange={onValueChange}
        {...otherProps}
    />;
}
