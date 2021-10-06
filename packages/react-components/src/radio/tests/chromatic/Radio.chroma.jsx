import { Div } from "@react-components/html";
import { Inline } from "@react-components/layout";
import { Radio } from "@react-components/radio";
import { createRadioTestSuite } from "./createRadioTestSuite";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Radio")
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .build())
        .build();
}

createRadioTestSuite(<Radio />, stories("/unchecked"));

createRadioTestSuite(<Radio defaultChecked />, stories("/checked"));

stories()
    .add("zoom", () =>
        <Inline>
            <Div className="zoom-in">
                <Radio value="any">Milky Way</Radio>
            </Div>
            <Div className="zoom-out">
                <Radio value="any">Milky Way</Radio>
            </Div>
        </Inline>
    )
    .add("styling", () =>
        <Inline>
            <Radio border="sunray-10" value="any">Milky Way</Radio>
            <Radio className="bg-red" value="any">Milky Way</Radio>
            <Radio style={{ backgroundColor: "red" }} value="any">Milky Way</Radio>
        </Inline>
    );
