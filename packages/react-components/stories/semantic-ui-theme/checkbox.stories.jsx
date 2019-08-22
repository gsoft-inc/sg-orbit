import { Checkbox } from "semantic-ui-react";
import { storiesBuilder } from "../../storybook/utils/stories-builder";

function stories(segment) {
    return storiesBuilder("Semantic-UI-Theme|checkbox")
        .segment(segment)
        .chromaticDelay(100)
        .build();
}

stories()
    .add("default",
         () =>
            <>
                <div className="flex">
                    <Checkbox label="Milky Way" />
                    <Checkbox checked label="Supernova" />
                    <Checkbox disabled label="Supernova" />
                    <Checkbox checked disabled label="Supernova" />
                </div>
                <div className="flex">
                    <Checkbox defaultIndeterminate label="Milky Way" />
                    <Checkbox defaultIndeterminate checked label="Supernova" />
                    <Checkbox defaultIndeterminate disabled label="Supernova" />
                    <Checkbox defaultIndeterminate checked disabled label="Supernova" />
                </div>
                <div className="flex">
                    <Checkbox toggle />
                    <Checkbox checked toggle />
                    <Checkbox disabled toggle />
                    <Checkbox checked disabled toggle />
                </div>
                <div className="flex">
                    <Checkbox radio label="Meteor Shower" />
                    <Checkbox radio checked label="Meteor Shower" />
                    <Checkbox radio disabled label="Meteor Shower" />
                    <Checkbox radio checked disabled label="Meteor Shower" />
                </div>
            </>
    );
