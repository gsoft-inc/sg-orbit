import { Button } from "@components/button";
import { Div } from "@components/html";
import { Inline } from "@components/layout";
// import { cloneElement } from "react";
import { createButtonTestSuite } from "./createButtonTestSuite";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Button")
        .segment(segment)
        .build();
}

createButtonTestSuite(<Button variant="solid" />, stories("/solid"));

createButtonTestSuite(<Button variant="outline" />, stories("/outline"));

createButtonTestSuite(<Button variant="ghost" />, stories("/ghost"));

stories()
    .add("styling", () =>
        <Inline>
            <Button border="warning-7" color="secondary">Button</Button>
            <Button className="bg-red" color="secondary">Button</Button>
            <Button style={{ backgroundColor: "red" }} color="secondary">Button</Button>
        </Inline>
    );
