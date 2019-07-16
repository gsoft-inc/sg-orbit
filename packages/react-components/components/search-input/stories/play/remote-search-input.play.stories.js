import { RemoteSearchInput, SearchInputController } from "../../src";
import { StarWarsCharactersSearchInput } from "./components/star-wars-characters-search-input";
import { boolean, number, text, withKnobs } from "@storybook/addon-knobs";
import { logValueChanged } from "../shared";
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
    );
