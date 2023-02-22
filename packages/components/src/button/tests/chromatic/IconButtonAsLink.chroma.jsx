import { AddMajorIcon } from "@components/icons";
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

createIconButtonTestSuite(<IconButtonAsLink variant="negative" />, stories("/negative"));

stories()
    .add("styling", () =>
        <Inline>
            <IconButtonAsLink border="warning-6" variant="secondary"><AddMajorIcon /></IconButtonAsLink>
            <IconButtonAsLink className="bg-red" variant="secondary"><AddMajorIcon /></IconButtonAsLink>
            <IconButtonAsLink style={{ backgroundColor: "red" }} variant="secondary"><AddMajorIcon /></IconButtonAsLink>
        </Inline>
    );
