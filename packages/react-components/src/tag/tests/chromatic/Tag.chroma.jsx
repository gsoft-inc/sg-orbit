import { Badge } from "@react-components/badge";
import { Button } from "@react-components/button";
import { CloseIcon, LightbulbIcon } from "@react-components/icons";
import { Tag } from "@react-components/tag";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { createTestSuite } from "./createTestSuite";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Tag"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .chromaticDelay(100)
            .build())
        .build();
}

stories()
    .add("standard", createTestSuite(<Tag />))
    .add("basic", createTestSuite(<Tag basic />));

