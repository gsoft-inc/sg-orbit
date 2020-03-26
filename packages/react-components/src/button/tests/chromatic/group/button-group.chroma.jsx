import { Button } from "@react-components/button";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { createSharedStories } from "./shared-stories";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Button Group"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .chromaticDelay(100)
            .build())
        .build();
}

createSharedStories(<Button.Group />, stories("/standard"));

createSharedStories(<Button.Group primary />, stories("/primary"));

createSharedStories(<Button.Group secondary />, stories("/secondary"));

createSharedStories(<Button.Group positive />, stories("/positive"));

createSharedStories(<Button.Group negative />, stories("/negative"));

createSharedStories(<Button.Group basic />, stories("/basic"));


