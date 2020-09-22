import { Inline } from "@react-components/layout";
import { Link } from "@react-components/link";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Link"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .chromaticDelay(100)
            .build())
        .build();
}

stories()
    .add("default", () =>
        <Inline>
            <Link size="sm" href="#">Flight information</Link>
            <Link href="#">Flight information</Link>
            <Link size="lg" href="#">Flight information</Link>
        </Inline>
    );
