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
        <Label>Where to?</Label>
    )
    .add("complex", () =>
        <Label>
            <span>Where to? (<TextLink color="primary" size="inherit" href="https://www.google.com/sky">view destinations</TextLink>)</span>
        </Label>
    )
    .add("as span", () =>
        <Label as="span">Where to?</Label>
    )
    .add("styling", () =>
        <Inline>
            <Label className="bg-red">Where to?</Label>
            <Label style={{ background: "red" }}>Where to?</Label>
        </Inline>
    );
