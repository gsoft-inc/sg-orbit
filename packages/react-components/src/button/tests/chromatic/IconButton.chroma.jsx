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

createIconButtonTestSuite(<IconButton variant="solid" />, stories("/solid"));

createIconButtonTestSuite(<IconButton variant="outline" />, stories("/outline"));

createIconButtonTestSuite(<IconButton variant="ghost" />, stories("/ghost"));

stories()
    .add("styling", () =>
        <Inline>
            <IconButton className="bg-red" aria-label="Add"><AddIcon /></IconButton>
            <IconButton style={{ backgroundColor: "red" }} aria-label="Add"><AddIcon /></IconButton>
        </Inline>
    )
    .add("autofocus", () =>
        <IconButton autoFocus aria-label="Add"><AddIcon /></IconButton>
    )
    .add("when disabled do not autofocus", () =>
        <IconButton disabled autoFocus aria-label="Add"><AddIcon /></IconButton>
    )
    .add("autofocus with delay", () =>
        <IconButton autoFocus autoFocusDelay={50} aria-label="Add"><AddIcon /></IconButton>
    );
