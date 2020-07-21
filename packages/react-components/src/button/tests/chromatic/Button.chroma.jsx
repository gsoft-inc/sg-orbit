import { Button, embedButton } from "@react-components/button";
import { Inline, Stack } from "@react-components/layout";
import { createButtonTestSuite } from "./createButtonTestSuite";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Button"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .chromaticDelay(100)
            .build())
        .build();
}

createButtonTestSuite(<Button variant="solid" />, stories("/solid"));

createButtonTestSuite(<Button variant="outline" />, stories("/outline"));

createButtonTestSuite(<Button variant="ghost" />, stories("/ghost"));

createButtonTestSuite(<Button variant="link" />, stories("/link"));

stories()
    .add("embedded", () =>
        <Inline align="end">
            {embedButton(<Button>Button</Button>, { size: "small" })}
            {embedButton(<Button>Button</Button>)}
            {embedButton(<Button>Button</Button>, { size: "large" })}
        </Inline>
    );




