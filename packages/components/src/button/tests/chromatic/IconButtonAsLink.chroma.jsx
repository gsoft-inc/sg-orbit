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

createIconButtonTestSuite(<IconButtonAsLink color="primary" />, stories("/primary"));

createIconButtonTestSuite(<IconButtonAsLink color="secondary" />, stories("/secondary"));

createIconButtonTestSuite(<IconButtonAsLink color="danger" />, stories("/danger"));

stories()
    .add("styling", () =>
        <Inline>
            <IconButtonAsLink border="warning-7" color="secondary"><AddIcon /></IconButtonAsLink>
            <IconButtonAsLink className="bg-red" color="secondary"><AddIcon /></IconButtonAsLink>
            <IconButtonAsLink style={{ backgroundColor: "red" }} color="secondary"><AddIcon /></IconButtonAsLink>
        </Inline>
    );
