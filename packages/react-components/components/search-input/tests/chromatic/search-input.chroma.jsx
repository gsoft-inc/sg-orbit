import { DEFAULT_RESULTS, LAURIE_VALUE } from "@react-components/search-input/stories/data";
import { SearchInput } from "@orbit-ui/react-search-input/src";
import { createChromaticSection } from "@utils/create-section";
import { noop } from "lodash";
import { paramsBuilder } from "@utils/params-builder";
import { storiesOfBuilder } from "@utils/stories-of-builder";

function createSearchInput({ results = DEFAULT_RESULTS, ...otherProps } = {}) {
    return <SearchInput
        results={results}
        onValueChange={noop}
        {...otherProps}
    />;
}

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Search Input/results set"))
        .segment(segment)
        .parameters(
            paramsBuilder()
                .width("80%")
                .chromaticDelay(100)
                .sortLast()
                .build()
        )
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
