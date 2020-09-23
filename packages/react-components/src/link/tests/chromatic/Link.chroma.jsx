import { Inline } from "@react-components/layout";
import { Link } from "@react-components/link";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { createLinkTestSuite } from "./createLinkTestSuite";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Link"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

createLinkTestSuite(<Link />, stories("/default"));

createLinkTestSuite(<Link as="button" />, stories("/button"));

stories()
    .add("styling", () =>
        <Inline>
            <Link className="bg-red" href="#">Flight details</Link>
            <Link style={{ backgroundColor: "red" }} href="#">Flight details</Link>
        </Inline>
    )
    .add("autofocus", () =>
        <Link autoFocus href="#">Flight details</Link>
    )
    .add("when disabled do not autofocus", () =>
        <Link disabled autoFocus href="#">Flight details</Link>
    )
    .add("autofocus with delay", () =>
        <Link autoFocus autoFocusDelay={50} href="#">Flight details</Link>
    );
