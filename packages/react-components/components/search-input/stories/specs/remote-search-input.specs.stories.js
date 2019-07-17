import { LAURIE_VALUE, logValueChanged } from "../shared";
import { StarWarsCharactersSearchInput } from "../components/star-wars-characters-search-input";
import { storiesBuilder } from "../../../../storybook/utils/stories-builder";

function stories(segment) {
    return storiesBuilder("Remote-Search-Input|specs")
        .segment(segment)
        .layoutWidth("80%")
        .chromaticDelay(100)
        .build();
}

stories()
    .add("closed", () =>
        <StarWarsCharactersSearchInput
            onValueChange={logValueChanged}
        />
    )
    .add("opened", () =>
        <StarWarsCharactersSearchInput
            open
            onValueChange={logValueChanged}
        />
    )
    .add("disabled", () =>
        <StarWarsCharactersSearchInput
            onValueChange={logValueChanged}
            disabled
        />
    );

stories("/selected value")
    .add("no selection", () =>
        <StarWarsCharactersSearchInput
            onValueChange={logValueChanged}
        />
    )
    .add("value selected", () =>
        <StarWarsCharactersSearchInput
            defaultValue={LAURIE_VALUE}
            onValueChange={logValueChanged}
        />
    );
