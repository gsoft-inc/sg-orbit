import { Checkbox } from "@react-components/checkbox";
import { Count } from "@react-components/count";
import { Label } from "@react-components/label";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { createTestSuite } from "./createTestSuite";
import { isNil } from "lodash";

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

function setRedBackground(element) {
    if (!isNil(element)) {
        element.classList.add("bg-red");
    }
}

stories("/label")
    .add("element ref", () =>
        <Checkbox text="Milky Way" label={<Label ref={setRedBackground}>6</Label>} />
    )
    .add("object", () =>
        <div className="flex">
            <Checkbox text="Milky Way" label={{ content: "6" }} className="mr5" />
            <Checkbox text="Milky Way" label={{ content: "6", className: "bg-red" }} className="mr5" />
            <Checkbox text="Milky Way" label={{ content: "6", ref: setRedBackground }} />
        </div>
    );

stories("/count")
    .add("element ref", () =>
        <Checkbox text="Milky Way" count={<Count ref={setRedBackground}>6</Count>} />
    )
    .add("object", () =>
        <div className="flex">
            <Checkbox text="Milky Way" count={{ content: "6" }} className="mr5" />
            <Checkbox text="Milky Way" count={{ content: "6", className: "bg-red" }} className="mr5" />
            <Checkbox text="Milky Way" count={{ content: "6", ref: setRedBackground }} />
        </div>
    );
