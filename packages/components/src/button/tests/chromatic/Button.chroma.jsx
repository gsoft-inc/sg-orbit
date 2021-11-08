import { Button } from "@components/button";
import { Div } from "@components/html";
import { Inline } from "@components/layout";
import { cloneElement } from "react";
import { createButtonTestSuite } from "./createButtonTestSuite";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Button")
        .segment(segment)
        .build();
}

function SunrayBackground({ button, ...rest }) {
    console.log(button, rest);

    return (
        <Div color="warning-7" backgroundColor="warning-1">
            {cloneElement(button, rest)}
        </Div>
    );
}

createButtonTestSuite(<Button color="primary" />, stories("/primary"));

createButtonTestSuite(<Button color="secondary" />, stories("/secondary"));

createButtonTestSuite(<SunrayBackground button={<Button color="secondary" inherit />} />, stories("/secondary (inherit)"));

createButtonTestSuite(<SunrayBackground button={<Button color="tertiary" inherit />} />, stories("/tertiary (inherit)"));

createButtonTestSuite(<Button color="danger" />, stories("/danger"));

stories()
    .add("styling", () =>
        <Inline>
            <Button border="warning-7" color="secondary">Button</Button>
            <Button className="bg-red" color="secondary">Button</Button>
            <Button style={{ backgroundColor: "red" }} color="secondary">Button</Button>
        </Inline>
    );
