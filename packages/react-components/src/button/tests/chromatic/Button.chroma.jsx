import { Button } from "@react-components/button";
import { Inline } from "@react-components/layout";
import { createButtonTestSuite } from "./createButtonTestSuite";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Button"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

createButtonTestSuite(<Button variant="solid" />, stories("/solid"));

createButtonTestSuite(<Button variant="outline" />, stories("/outline"));

createButtonTestSuite(<Button variant="ghost" />, stories("/ghost"));

stories()
    .add("styling", () =>
        <Inline>
            <Button className="bg-red">Button</Button>
            <Button style={{ backgroundColor: "red" }}>Button</Button>
        </Inline>
    )
    .add("autofocus", () =>
        <Button autoFocus>Button</Button>
    )
    .add("when disabled do not autofocus", () =>
        <Button disabled autoFocus>Button</Button>
    )
    .add("autofocus with delay", () =>
        <Button autoFocus autoFocusDelay={50}>Button</Button>
    );



