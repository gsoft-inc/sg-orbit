import { DEFAULT_RESULTS, LAURIE_VALUE, logValueChanged } from "@stories/react-components/search-input/shared";
import { SearchInput } from "@orbit-ui/react-search-input/src";
import { storiesBuilder } from "@utils/stories-builder";

function createSearchInput({ results = DEFAULT_RESULTS, ...otherProps } = {}) {
    return <SearchInput
        results={results}
        onValueChange={logValueChanged}
        {...otherProps}
    />;
}

function stories(segment) {
    return storiesBuilder(module, "Search-Input|specs")
        .segment(segment)
        .layoutWidth("80%")
        .chromaticDelay(100)
        .build();
}

stories()
    .add("closed",
         () =>
             createSearchInput()
    )
    .add("opened",
         () =>
             createSearchInput({
                 defaultOpen: true
             })
    )
    .add("disabled",
         () =>
             createSearchInput({
                 disabled: true
             })
    );

stories("/selected value")
    .add("no selection",
         () =>
             createSearchInput()
    )
    .add("value selected",
         () =>
             createSearchInput({
                 defaultValue: LAURIE_VALUE
             })
    );
