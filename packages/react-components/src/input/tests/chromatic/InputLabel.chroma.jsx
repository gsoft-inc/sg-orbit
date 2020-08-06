import { Inline } from "@react-components/layout";
import { InputLabel } from "@react-components/input";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("InputLabel"))
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

stories()
    .add("default", () =>
        <Inline align="end">
            <InputLabel size="small">Where to?</InputLabel>
            <InputLabel>Where to?</InputLabel>
            <InputLabel size="large">Where to?</InputLabel>
        </Inline>
    )
    .add("complex", () =>
        <InputLabel>
            <span>Where to? (<a href="https://www.google.com/sky" target="_blank" rel="noreferrer">view destinations</a>)</span>
        </InputLabel>
    )
    .add("as span", () =>
        <Inline align="end">
            <InputLabel as="span" size="small">Where to?</InputLabel>
            <InputLabel as="span">Where to?</InputLabel>
            <InputLabel as="span" size="large">Where to?</InputLabel>
        </Inline>
    );
