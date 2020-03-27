import { Radio } from "@react-components/radio";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { createSharedStories } from "./shared-stories";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Radio"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .chromaticDelay(100)
            .build())
        .build();
}

createSharedStories(<Radio />, stories("/unchecked"));

createSharedStories(<Radio checked />, stories("/checked"));

stories()
    .add("group", () =>
        <div className="flex flex-column">
            <Radio text="Mars" name="checkboxRadioGroup" value="mars" className="mb2" />
            <Radio text="Moon" name="checkboxRadioGroup" value="moon" className="mb2" />
            <Radio text="Venus" name="checkboxRadioGroup" value="venus" />
        </div>
    );
