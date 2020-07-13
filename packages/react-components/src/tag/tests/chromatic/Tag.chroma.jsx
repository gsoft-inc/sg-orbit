import { Tag } from "@react-components/tag";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { createTestSuite } from "./createTestSuite2";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Tag"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "95%" })
            .chromaticDelay(100)
            .build())
        .build();
}

createTestSuite(<Tag variant="solid" />, stories("/solid"));

createTestSuite(<Tag variant="outline" />, stories("/outline"));

