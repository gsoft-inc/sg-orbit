import { AddIcon } from "@components/icons";
import { IconButton } from "@components/button";
import { Inline } from "@components/layout";
import { createIconButtonTestSuite } from "./createIconButtonTestSuite";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/IconButton")
        .segment(segment)
        .build();
}

createIconButtonTestSuite(<IconButton variant="outline" />, stories("/outline"));

createIconButtonTestSuite(<IconButton variant="solid" />, stories("/solid"));

createIconButtonTestSuite(<IconButton variant="ghost" />, stories("/ghost"));

stories()
    .add("styling", () =>
        <Inline>
            <IconButton border="warning-7" color="secondary" aria-label="Add"><AddIcon /></IconButton>
            <IconButton className="bg-red" color="secondary" aria-label="Add"><AddIcon /></IconButton>
            <IconButton style={{ backgroundColor: "red" }} color="secondary" aria-label="Add"><AddIcon /></IconButton>
        </Inline>
    );
