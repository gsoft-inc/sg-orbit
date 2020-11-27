import { Inline } from "@react-components/layout";
import { Tag } from "@react-components/tag";
import { createTestSuite } from "./createTestSuite";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Tag")
        .segment(segment)
        .build();
}

createTestSuite(<Tag variant="solid" />, stories("/solid"));

createTestSuite(<Tag variant="outline" />, stories("/outline"));

stories()
    .add("styling", () =>
        <Inline>
            <Tag className="bg-red">Falcon 9</Tag>
            <Tag style={{ backgroundColor: "red" }}>Falcon 9</Tag>
        </Inline>
    );

