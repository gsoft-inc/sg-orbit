import { AddIcon } from "@react-components/icons";
import { IconButtonAsLink } from "@react-components/button";
import { Inline } from "@react-components/layout";
import { createIconButtonTestSuite } from "./createIconButtonTestSuite";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/IconButtonAsLink")
        .segment(segment)
        .build();
}

createIconButtonTestSuite(<IconButtonAsLink variant="solid" />, stories("/solid"));

createIconButtonTestSuite(<IconButtonAsLink variant="outline" />, stories("/outline"));

createIconButtonTestSuite(<IconButtonAsLink variant="ghost" />, stories("/ghost"));

stories()
    .add("styling", () =>
        <Inline>
            <IconButtonAsLink className="bg-red"><AddIcon /></IconButtonAsLink>
            <IconButtonAsLink style={{ backgroundColor: "red" }}><AddIcon /></IconButtonAsLink>
        </Inline>
    );
