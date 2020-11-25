import { Select } from "@react-components/select";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@stories/utils";
import { createTestSuite } from "./createTestSuite";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Select/transparent"))
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

createTestSuite(<Select transparent />, stories());

