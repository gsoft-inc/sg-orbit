import { Inline } from "@react-components/layout";
import { Label } from "@react-components/field";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Label"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

stories()
    .add("default", () =>
        <Inline verticalAlign="end">
            <Label size="sm">Where to?</Label>
            <Label>Where to?</Label>
        </Inline>
    )
    .add("complex", () =>
        <Inline verticalAlign="end">
            <Label size="sm">
                <span>Where to? (<a href="https://www.google.com/sky" target="_blank" rel="noreferrer">view destinations</a>)</span>
            </Label>
            <Label>
                <span>Where to? (<a href="https://www.google.com/sky" target="_blank" rel="noreferrer">view destinations</a>)</span>
            </Label>
        </Inline>
    )
    .add("as span", () =>
        <Inline verticalAlign="end">
            <Label as="span" size="sm">Where to?</Label>
            <Label as="span">Where to?</Label>
        </Inline>
    )
    .add("styling", () =>
        <Inline>
            <Label className="bg-red">Where to?</Label>
            <Label style={{ background: "red" }}>Where to?</Label>
        </Inline>
    );
