import { Inline } from "@react-components/layout";
import { Label } from "@react-components/field";
import { TextLink } from "@react-components/link";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Label")
        .segment(segment)
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
                <span>Where to? (<TextLink color="primary" size="inherit" href="https://www.google.com/sky">view destinations</TextLink>)</span>
            </Label>
            <Label>
                <span>Where to? (<TextLink color="primary" size="inherit" href="https://www.google.com/sky">view destinations</TextLink>)</span>
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
