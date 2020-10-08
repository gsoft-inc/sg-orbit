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
            <CrossButton size="2xs" />
            <CrossButton size="xs" />
            <CrossButton size="sm" />
            <CrossButton />
            <CrossButton size="lg" />
        </Inline>
    )
    .add("condensed", () =>
        <Inline verticalAlign="end">
            <CrossButton condensed size="2xs" />
            <CrossButton condensed size="xs" />
            <CrossButton condensed size="sm" />
            <CrossButton condensed />
            <CrossButton condensed size="lg" />
        </Inline>
    );
