import { CrossButton, EmbeddedCrossButton } from "@react-components/button";
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
            <CrossButton size="sm" />
            <CrossButton />
            <CrossButton size="lg" />
        </Inline>
    )
    .add("embedded", () =>
        <Inline verticalAlign="end">
            <EmbeddedCrossButton size="sm" />
            <EmbeddedCrossButton />
            <EmbeddedCrossButton size="lg" />
        </Inline>
    );
