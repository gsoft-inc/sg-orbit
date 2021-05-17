import { AddIcon } from "@react-components/icons";
import { IconLink } from "@react-components/link";
import { Inline } from "@react-components/layout";
import { createIconLinkTestSuite } from "./createIconLinkTestSuite";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/IconLink")
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .build())
        .build();
}

createIconLinkTestSuite(<IconLink />, stories());

createIconLinkTestSuite(<IconLink as="button" />, stories("/button"));

stories()
    .add("styling", () =>
        <Inline>
            <IconLink className="bg-red" href="#" aria-label="Add"><AddIcon /></IconLink>
            <IconLink style={{ backgroundColor: "red" }} href="#" aria-label="Add"><AddIcon /></IconLink>
        </Inline>
    );
