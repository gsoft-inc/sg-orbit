import { DEFAULT_RESULTS, LAURIE_VALUE, logValueChanged } from "../shared";
import { SearchInput } from "../../src";
import { storiesBuilder } from "../../../../storybook/utils/stories-builder";

function stories(segment) {
    return storiesBuilder("Search-Input|specs")
        .segment(segment)
        .layoutWidth("80%")
        .chromaticDelay(100)
        .build();
}

stories()
    .add("closed", () =>
        <SearchInput
            results={DEFAULT_RESULTS}
            onValueChange={logValueChanged}
        />
    )
    .add("opened", () =>
        <SearchInput
            open
            results={DEFAULT_RESULTS}
            onValueChange={logValueChanged}
        />
    )
    .add("disabled", () =>
        <SearchInput
            results={DEFAULT_RESULTS}
            onValueChange={logValueChanged}
            disabled
        />
    );

stories("/selected value")
    .add("no selection", () =>
        <SearchInput
            results={DEFAULT_RESULTS}
            onValueChange={logValueChanged}
        />
    )
    .add("value selected", () =>
        <SearchInput
            results={DEFAULT_RESULTS}
            defaultValue={LAURIE_VALUE}
            onValueChange={logValueChanged}
        />
    );
