import { DEFAULT_RESULTS, LAURIE_VALUE } from "./data";
import { SearchInput } from "@react-components/search-input";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@stories/utils";
import { noop } from "lodash";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("SearchInput/results set"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .chromaticDelay(100)
            .build())
        .build();
}

function createSearchInput({ results = DEFAULT_RESULTS, ...otherProps } = {}) {
    return <SearchInput
        results={results}
        onValueChange={noop}
        {...otherProps}
    />;
}

stories()
    .add("closed",
         () =>
             createSearchInput()
    )
    .add("opened",
         () =>
             createSearchInput({
                 open: true
             })
    )
    .add("default opened",
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
