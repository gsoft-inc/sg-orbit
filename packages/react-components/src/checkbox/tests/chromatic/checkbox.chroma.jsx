import { Checkbox } from "@react-components/checkbox";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { createTestSuite } from "./createTestSuite";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Checkbox"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .chromaticDelay(100)
            .build())
        .build();
}

createTestSuite(<Checkbox />, stories("/unchecked"));

createTestSuite(<Checkbox defaultChecked />, stories("/checked"));

createTestSuite(<Checkbox defaultIndeterminate />, stories("/indeterminate"));
