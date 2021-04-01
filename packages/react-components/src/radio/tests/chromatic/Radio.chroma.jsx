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
    .add("styling", () =>
        <Inline>
            <Radio className="bg-red" value="any">Milky Way</Radio>
            <Radio style={{ backgroundColor: "red" }} value="any">Milky Way</Radio>
        </Inline>
    )
    .add("autofocus", () =>
        <Radio autoFocus value="any">Milky Way</Radio>
    )
    .add("when disabled do not autofocus", () =>
        <Radio autoFocus disabled value="any">Milky Way</Radio>
    )
    .add("autofocus with delay", () =>
        <Radio autoFocus={50} value="any">Milky Way</Radio>
    );
