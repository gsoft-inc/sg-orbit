import { Stack } from "@react-components/stack";
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

createTestSuite(<Tag variant="solid" />, stories("/solid"));

createTestSuite(<Tag variant="outline" />, stories("/outline"));

stories()
    .add("styling", () =>
        <Stack>
            <Tag className="bg-red">Falcon 9</Tag>
            <Tag style={{ backgroundColor: "red" }}>Falcon 9</Tag>
        </Stack>
    );

