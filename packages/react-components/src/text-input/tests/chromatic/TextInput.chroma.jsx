import { TextInput } from "@react-components/text-input";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { createTextInputTestSuite } from "./createTextInputTestSuite";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("TextInput"))
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

createTextInputTestSuite(<TextInput variant="outline" />, stories("/outline"));

createTextInputTestSuite(<TextInput variant="transparent" />, stories("/transparent"));

stories()
    .add("autofocus", () =>
        <TextInput autoFocus />
    )
    .add("when disabled do not autofocus", () =>
        <TextInput disabled autoFocus />
    )
    .add("autofocus with delay", () =>
        <TextInput autoFocus autoFocusDelay={50} />
    );
