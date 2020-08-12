import { Checkbox } from "@react-components/checkbox";
import { Inline } from "@react-components/layout";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { createTestSuite } from "./createTestSuite";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Checkbox"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .chromaticDelay(100)
            .build())
        .build();
}

createTestSuite(<Checkbox />, stories("/unchecked"));

createTestSuite(<Checkbox defaultChecked />, stories("/checked"));

createTestSuite(<Checkbox defaultIndeterminate />, stories("/indeterminate"));

stories()
    .add("render props", () =>
        <Inline>
            <Checkbox>
                {
                    () => "Milky Way"
                }
            </Checkbox>
            <Checkbox defaultChecked>
                {
                    ({ isChecked }) => isChecked ? "Checked" : "Milky Way"
                }
            </Checkbox>
        </Inline>
    )
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
        <Checkbox autoFocus autoFocusDelay={50}>Milky Way</Checkbox>
    );
