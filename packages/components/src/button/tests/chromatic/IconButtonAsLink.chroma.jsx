import { AddIcon } from "@components/icons";
import { IconButtonAsLink } from "@components/button";
import { Inline } from "@components/layout";
import { createIconButtonTestSuite } from "./createIconButtonTestSuite";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/IconButtonAsLink")
        .segment(segment)
        .build();
}

createIconButtonTestSuite(<IconButtonAsLink variant="primary" />, stories("/primary"));

createIconButtonTestSuite(<IconButtonAsLink variant="secondary" />, stories("/secondary"));

createIconButtonTestSuite(<IconButtonAsLink variant="tertiary" />, stories("/tertiary"));

createIconButtonTestSuite(<IconButtonAsLink variant="danger" />, stories("/danger"));

stories()
    .add("styling", () =>
        <Inline>
            <IconButtonAsLink border="warning-7" variant="secondary"><AddIcon /></IconButtonAsLink>
            <IconButtonAsLink className="bg-red" variant="secondary"><AddIcon /></IconButtonAsLink>
            <IconButtonAsLink style={{ backgroundColor: "red" }} variant="secondary"><AddIcon /></IconButtonAsLink>
        </Inline>
    );
