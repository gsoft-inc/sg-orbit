import { Checkbox } from "@react-components/checkbox";
import { Div } from "@react-components/html";
import { Inline } from "@react-components/layout";
import { createCheckboxTestSuite } from "./createCheckboxTestSuite";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Checkbox")
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .build())
        .build();
}

createCheckboxTestSuite(<Checkbox />, stories("/unchecked"));

createCheckboxTestSuite(<Checkbox defaultChecked />, stories("/checked"));

createCheckboxTestSuite(<Checkbox defaultIndeterminate />, stories("/indeterminate"));

stories()
    .add("zoom", () =>
        <Inline>
            <Div className="zoom-in">
                <Checkbox>Milky Way</Checkbox>
            </Div>
            <Div className="zoom-out'">
                <Checkbox>Milky Way</Checkbox>
            </Div>
        </Inline>
    ).add("styling", () =>
        <Inline>
            <Checkbox border="sunray-10">Milky Way</Checkbox>
            <Checkbox className="bg-red">Milky Way</Checkbox>
            <Checkbox style={{ backgroundColor: "red" }}>Milky Way</Checkbox>
        </Inline>
    );
