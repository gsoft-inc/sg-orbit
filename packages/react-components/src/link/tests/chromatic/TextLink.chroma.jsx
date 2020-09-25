import { Inline } from "@react-components/layout";
import { TextLink } from "@react-components/link";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { createTextLinkTestSuite } from "./createTextLinkTestSuite";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("TextLink"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

createTextLinkTestSuite(<TextLink />, stories("/default"));

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
