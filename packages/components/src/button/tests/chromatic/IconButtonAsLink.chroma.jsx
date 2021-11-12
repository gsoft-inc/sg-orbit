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

createIconButtonTestSuite(<IconButtonAsLink variant="outline" />, stories("/outline"));

createIconButtonTestSuite(<IconButtonAsLink variant="solid" />, stories("/solid"));

createIconButtonTestSuite(<IconButtonAsLink variant="ghost" />, stories("/ghost"));

stories()
    .add("styling", () =>
        <Inline>
            <IconButtonAsLink border="warning-7" color="basic"><AddIcon /></IconButtonAsLink>
            <IconButtonAsLink className="bg-red" color="basic"><AddIcon /></IconButtonAsLink>
            <IconButtonAsLink style={{ backgroundColor: "red" }} color="basic"><AddIcon /></IconButtonAsLink>
        </Inline>
    );
