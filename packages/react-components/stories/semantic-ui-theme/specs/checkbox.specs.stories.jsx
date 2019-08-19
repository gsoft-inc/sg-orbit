import { Checkbox } from "semantic-ui-react";
import { storiesBuilder } from "../../../storybook/utils/stories-builder";

function stories(segment) {
    return storiesBuilder("Semantic-UI-Theme|checkbox")
        .segment(segment)
        .layoutWidth("80%")
        .chromaticDelay(100)
        .build();
}

stories()
    .add("specs",
         () =>
            <>
                <Checkbox label="Milky Way" />
                <Checkbox disabled label="Supernova" />
                <Checkbox toggle />
                <Checkbox checked toggle />
                <Checkbox disabled toggle />
                <Checkbox checked disabled toggle />
                <Checkbox radio label="Meteor Shower" />
                <Checkbox slider />
            </>
    );
