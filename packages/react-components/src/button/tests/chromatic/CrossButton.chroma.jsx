import { CrossButton } from "@react-components/button";
import { Inline } from "@react-components/layout";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("CrossButton"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

stories()
    .add("default", () =>
        <Inline verticalAlign="end">
            <CrossButton size="2xs" aria-label="Clear" />
            <CrossButton size="xs" aria-label="Clear" />
            <CrossButton size="sm" aria-label="Clear" />
            <CrossButton aria-label="Clear" />
        </Inline>
    )
    .add("condensed", () =>
        <Inline verticalAlign="end">
            <CrossButton condensed size="2xs" aria-label="Clear" />
            <CrossButton condensed size="xs" aria-label="Clear" />
            <CrossButton condensed size="sm" aria-label="Clear" />
            <CrossButton condensed aria-label="Clear" />
        </Inline>
    );
