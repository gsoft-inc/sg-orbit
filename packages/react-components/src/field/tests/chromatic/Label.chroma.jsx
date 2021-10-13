import { Inline } from "@react-components/layout";
import { Label } from "@react-components/field";
import { Span } from "@react-components/html";
import { TextLink } from "@react-components/link";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Label")
        .segment(segment)
        .build();
}

stories()
    .add("default", () =>
        <Label>Where to?</Label>,
         {
             ...paramsBuilder()
                 .withBreakpoints()
                 .build()
         }
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
            <Label border="sunray-10">Where to?</Label>
            <Label className="bg-red">Where to?</Label>
            <Label style={{ background: "red" }}>Where to?</Label>
        </Inline>
    );
