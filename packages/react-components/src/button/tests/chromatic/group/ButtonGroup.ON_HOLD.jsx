import { Button } from "@react-components/button";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { createTestSuite } from "./createTestSuite";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("ButtonGroup"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .chromaticDelay(100)
            .build())
        .build();
}

createTestSuite(<Button.Group />, stories("/standard"));

createTestSuite(<Button.Group primary />, stories("/primary"));

createTestSuite(<Button.Group secondary />, stories("/secondary"));

createTestSuite(<Button.Group positive />, stories("/positive"));

createTestSuite(<Button.Group negative />, stories("/negative"));

createTestSuite(<Button.Group basic />, stories("/basic"));


