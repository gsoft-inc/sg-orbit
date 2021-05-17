import { Button } from "@react-components/button";
import { Inline } from "@react-components/layout";
import { createButtonTestSuite } from "./createButtonTestSuite";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Button")
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
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
    );



