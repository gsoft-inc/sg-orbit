import { Button } from "@react-components/button";
import { Div } from "@react-components/html";
import { Inline } from "@react-components/layout";
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
        <Div color="sunray-10" backgroundColor="sunray-1">
            {cloneElement(button, rest)}
        </Div>
    );
}

createButtonTestSuite(<Button variant="primary" />, stories("/primary"));

createButtonTestSuite(<Button variant="secondary" />, stories("/secondary"));

createButtonTestSuite(<SunrayBackground button={<Button variant="secondary" inherit />} />, stories("/secondary (inherit)"));

createButtonTestSuite(<Button variant="tertiary" />, stories("/tertiary"));

createButtonTestSuite(<SunrayBackground button={<Button variant="tertiary" inherit />} />, stories("/tertiary (inherit)"));

createButtonTestSuite(<Button variant="danger" />, stories("/danger"));

stories()
    .add("styling", () =>
        <Inline>
            <Button border="sunray-10" variant="secondary">Button</Button>
            <Button className="bg-red" variant="secondary">Button</Button>
            <Button style={{ backgroundColor: "red" }} variant="secondary">Button</Button>
        </Inline>
    );
