import { Message } from "@react-components/message";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { createSharedStories } from "./shared-stories";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Message"))
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

createSharedStories(<Message />, stories("/standard"));

createSharedStories(<Message info />, stories("/info"));

createSharedStories(<Message warning />, stories("/warning"));

createSharedStories(<Message positive />, stories("/positive"));

createSharedStories(<Message negative />, stories("/negative"));
