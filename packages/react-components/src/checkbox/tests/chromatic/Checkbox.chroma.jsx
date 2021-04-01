import { Checkbox } from "@react-components/checkbox";
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
    .add("styling", () =>
        <Inline>
            <Checkbox className="bg-red">Milky Way</Checkbox>
            <Checkbox style={{ backgroundColor: "red" }}>Milky Way</Checkbox>
        </Inline>
    )
    .add("autofocus", () =>
        <Checkbox autoFocus>Milky Way</Checkbox>
    )
    .add("when disabled do not autofocus", () =>
        <Checkbox autoFocus disabled>Milky Way</Checkbox>
    )
    .add("autofocus with delay", () =>
        <Checkbox autoFocus={50}>Milky Way</Checkbox>
    );
