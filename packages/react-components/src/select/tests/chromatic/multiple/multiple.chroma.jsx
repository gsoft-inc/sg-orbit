import { Select } from "@react-components/select";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { createSharedStories } from "./shared-stories";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Select/multiple"))
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

createSharedStories(<Select />, stories());

createSharedStories(<Select transparent />, stories("/transparent"));
