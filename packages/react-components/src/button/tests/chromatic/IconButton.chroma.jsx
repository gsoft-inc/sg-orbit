import { AddIcon } from "@react-components/icons";
import { IconButton } from "@react-components/button";
import { Inline } from "@react-components/layout";
import { createIconButtonTestSuite } from "./createIconButtonTestSuite";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/IconButton")
        .segment(segment)
        .build();
}

createIconButtonTestSuite(<IconButton variant="primary" />, stories("/primary"));

createIconButtonTestSuite(<IconButton variant="secondary" />, stories("/secondary"));

createIconButtonTestSuite(<IconButton variant="tertiary" />, stories("/tertiary"));

createIconButtonTestSuite(<IconButton variant="danger" />, stories("/danger"));

stories()
    .add("styling", () =>
        <Inline>
            <IconButton className="bg-red" variant="secondary" aria-label="Add"><AddIcon /></IconButton>
            <IconButton style={{ backgroundColor: "red" }} variant="secondary" aria-label="Add"><AddIcon /></IconButton>
        </Inline>
    );
