import { ControlledStarWarsCharactersSearchInput } from "./components/controlled-star-wars-characters-search-input";
import { LAURIE_VALUE, logValueChanged } from "../shared";
import { RemoteSearchInput, SearchInputController } from "../../src";
import { StarWarsCharactersSearchInput } from "../components/star-wars-characters-search-input";
import { boolean, number, text, withKnobs } from "@storybook/addon-knobs";
import { storiesBuilder } from "../../../../storybook/utils/stories-builder";

function stories(segment) {
    return storiesBuilder("Remote-Search-Input|play")
        .segment(segment)
        .layoutWidth("80%")
        .chromaticIgnoreStory()
        .build();
}

stories()
    .add("default", () =>
        <StarWarsCharactersSearchInput
            onValueChange={logValueChanged}
        />
    )
    .add("knobs", () =>
        <StarWarsCharactersSearchInput
            defaultValue={text("defaultValue")}
            debounceDelay={number("debounceDelay", RemoteSearchInput.defaultProps.debounceDelay)}
            loadingDelay={number("loadingDelay", RemoteSearchInput.defaultProps.loadingDelay)}
            minCharacters={number("minCharacters", RemoteSearchInput.defaultProps.minCharacters)}
            noResultsMessage={text("noResultsMessage")}
            placeholder={text("placeholder", SearchInputController.defaultProps.placeholder)}
            disabled={boolean("disabled", false)}
            onValueChange={logValueChanged}
        />,
        { decorators: [withKnobs] }
    )
    .add("selected value", () =>
        <StarWarsCharactersSearchInput
            defaultValue={LAURIE_VALUE}
            onValueChange={logValueChanged}
        />
    )
    .add("clear on select", () =>
        <StarWarsCharactersSearchInput
            clearOnSelect
            onValueChange={logValueChanged}
        />
    )
    .add("disabled", () =>
        <StarWarsCharactersSearchInput
            disabled
            onValueChange={logValueChanged}
        />
    );

stories("/controlled")
    .add("stateful", () =>
        <ControlledStarWarsCharactersSearchInput
            value={LAURIE_VALUE}
            onValueChange={logValueChanged}
        />
    );
