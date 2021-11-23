import { Inline } from "@components/layout";
import { Label } from "@components/field";
import { Span } from "@components/html";
import { TextLink } from "@components/link";
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
            <Span>Where to? (<TextLink variant="primary" size="inherit" href="https://www.google.com/sky">view destinations</TextLink>)</Span>
        </Label>
    )
    .add("as span", () =>
        <Label as="span">Where to?</Label>
    )
    .add("styling", () =>
        <Inline>
            <Label border="warning-7">Where to?</Label>
            <Label className="bg-red">Where to?</Label>
            <Label style={{ background: "red" }}>Where to?</Label>
        </Inline>
    );
