import { DEFAULT_RESULTS, LAURIE_VALUE, logValueChanged } from "../shared";
import { SearchInput, SearchInputController } from "../../src";
import { boolean, number, text, withKnobs } from "@storybook/addon-knobs";
import { storiesBuilder } from "../../../../storybook/utils/stories-builder";

function stories(segment) {
    return storiesBuilder("Search-Input|play")
        .segment(segment)
        .layoutWidth("80%")
        .chromaticIgnoreStory()
        .build();
}

stories()
    .add("default", () =>
        <SearchInput
            results={DEFAULT_RESULTS}
            onValueChange={logValueChanged}
        />
    )
    .add("knobs", () =>
        <SearchInput
            results={DEFAULT_RESULTS}
            defaultValue={text("defaultValue")}
            debounceDelay={number("debounceDelay", SearchInput.defaultProps.debounceDelay)}
            minCharacters={number("minCharacters", SearchInput.defaultProps.minCharacters)}
            noResultsMessage={text("noResultsMessage")}
            placeholder={text("placeholder", SearchInputController.defaultProps.placeholder)}
            disabled={boolean("disabled", false)}
            onValueChange={logValueChanged}
        />,
        { decorators: [withKnobs] }
    )
    .add("selected value", () =>
        <SearchInput
            results={DEFAULT_RESULTS}
            defaultValue={LAURIE_VALUE}
            onValueChange={logValueChanged}
        />
    )
    .add("clear on select", () =>
        <SearchInput
            results={DEFAULT_RESULTS}
            clearOnSelect
            onValueChange={logValueChanged}
        />
    )
    .add("disabled", () =>
        <SearchInput
            results={DEFAULT_RESULTS}
            disabled
            onValueChange={logValueChanged}
        />
    );

stories("/controlled")
    .add("stateful", () =>
        <SearchInput
            results={DEFAULT_RESULTS}
            disabled
            onValueChange={logValueChanged}
        />
    );

