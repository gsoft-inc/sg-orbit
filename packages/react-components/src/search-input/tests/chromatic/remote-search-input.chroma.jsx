import { CountriesSearchInput } from "./countries-search-input";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { noop } from "lodash";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("SearchInput/remote"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .chromaticDelay(100)
            .build())
        .build();
}

function createRemoteSearchInput(props = {}) {
    return <CountriesSearchInput
        onValueChange={noop}
        {...props}
    />;
}

stories()
    .add("closed",
         () =>
             createRemoteSearchInput()
    )
    .add("opened",
         () =>
             createRemoteSearchInput({
                 open: true
             })
    )
    .add("default opened",
         () =>
             createRemoteSearchInput({
                 defaultOpen: true
             })
    )
    .add("disabled",
         () =>
             createRemoteSearchInput({
                 disabled: true
             })
    );

stories("/selected value")
    .add("no selection",
         () =>
             createRemoteSearchInput()
    )
    .add("value selected",
         () =>
             createRemoteSearchInput({
                 defaultValue: "Canada"
             })
    );
