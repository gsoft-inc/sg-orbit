import { Checkbox } from "@react-components/checkbox";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { createSharedStories } from "./shared-stories";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Checkbox"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .chromaticDelay(100)
            .build())
        .build();
}

createSharedStories(<Checkbox />, stories("/unchecked"));

createSharedStories(<Checkbox checked />, stories("/checked"));

createSharedStories(<Checkbox indeterminate />, stories("/indeterminate"));
