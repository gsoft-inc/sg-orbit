import { Inline } from "@react-components/layout";
import { Radio } from "@react-components/radio";
import { createRadioTestSuite } from "./createRadioTestSuite";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Radio")
        .segment(segment)
        .build();
}

createRadioTestSuite(<Radio />, stories("/unchecked"));

createRadioTestSuite(<Radio defaultChecked />, stories("/checked"));

stories()
    .add("render props", () =>
        <Inline>
            <Radio value="any">
                {
                    () => "Milky Way"
                }
            </Radio>
            <Radio defaultChecked value="any">
                {
                    ({ isChecked }) => isChecked ? "Checked" : "Milky Way"
                }
            </Radio>
        </Inline>
    )
    .add("styling", () =>
        <Inline>
            <Radio className="bg-red" value="any">Milky Way</Radio>
            <Radio style={{ backgroundColor: "red" }} value="any">Milky Way</Radio>
        </Inline>
    );
