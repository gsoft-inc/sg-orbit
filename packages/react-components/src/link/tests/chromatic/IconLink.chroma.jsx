import { AddIcon } from "@react-components/icons";
import { IconLink } from "@react-components/link";
import { Inline } from "@react-components/layout";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { createIconLinkTestSuite } from "./createIconLinkTestSuite";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("IconLink"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

createIconLinkTestSuite(<IconLink />, stories("/default"));

createIconLinkTestSuite(<IconLink as="button" />, stories("/button"));

stories()
    .add("styling", () =>
        <Inline>
            <IconLink className="bg-red" href="#" aria-label="Add"><AddIcon /></IconLink>
            <IconLink style={{ backgroundColor: "red" }} href="#" aria-label="Add"><AddIcon /></IconLink>
        </Inline>
    )
    .add("autofocus", () =>
        <IconLink autoFocus href="#" aria-label="Add"><AddIcon /></IconLink>
    )
    .add("when disabled do not autofocus", () =>
        <IconLink disabled autoFocus href="#" aria-label="Add"><AddIcon /></IconLink>
    )
    .add("autofocus with delay", () =>
        <IconLink autoFocus autoFocusDelay={50} href="#" aria-label="Add"><AddIcon /></IconLink>
    );
