import { Button } from "semantic-ui-react";
import { storiesBuilder } from "../../../storybook/utils/stories-builder";

function stories(segment) {
    return storiesBuilder("Semantic-UI-Theme|button")
        .segment(segment)
        .layoutWidth("80%")
        .chromaticDelay(100)
        .build();
}

stories()
    .add("specs",
         () =>
            <>
                <Button>Cutoff</Button>
                <Button active>Cutoff</Button>
                <Button disabled>Cutoff</Button>
                <Button primary>Delay</Button>
                <Button primary active>Delay</Button>
                <Button primary disabled>Delay</Button>
                <Button basic>Deflect</Button>
            </>
    );
