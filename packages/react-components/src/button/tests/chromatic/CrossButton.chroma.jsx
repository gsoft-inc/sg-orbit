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
        <Inline align="end">
            <CrossButton size="xs" />
            <CrossButton size="sm" />
            <CrossButton />
            <CrossButton size="lg" />
        </Inline>
    );
