import { Inline } from "@react-components/layout";
import { TextLink } from "@react-components/link";
import { createTextLinkTestSuite } from "./createTextLinkTestSuite";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/TextLink")
        .segment(segment)
        .build();
}

createTextLinkTestSuite(<TextLink />, stories());

createTextLinkTestSuite(<TextLink as="button" />, stories("/button"));

stories()
    .add("styling", () =>
        <Inline>
            <TextLink className="bg-red" href="#">Flight details</TextLink>
            <TextLink style={{ backgroundColor: "red" }} href="#">Flight details</TextLink>
        </Inline>
    )
    .add("autofocus", () =>
        <TextLink autoFocus href="#">Flight details</TextLink>
    )
    .add("when disabled do not autofocus", () =>
        <TextLink disabled autoFocus href="#">Flight details</TextLink>
    )
    .add("autofocus with delay", () =>
        <TextLink autoFocus autoFocusDelay={50} href="#">Flight details</TextLink>
    );
