import { Inline } from "@components/layout";
import { TextLink, TextLinkAsButton } from "@components/link";
import { createTextLinkTestSuite } from "./createTextLinkTestSuite";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/TextLink")
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .build())
        .build();
}

createTextLinkTestSuite(<TextLink />, stories());

createTextLinkTestSuite(<TextLinkAsButton type="button" />, stories("/button"));

stories()
    .add("styling", () =>
        <Inline>
            <TextLink border="warning-7" href="#">Flight details</TextLink>
            <TextLink className="bg-red" href="#">Flight details</TextLink>
            <TextLink style={{ backgroundColor: "red" }} href="#">Flight details</TextLink>
        </Inline>
    );
