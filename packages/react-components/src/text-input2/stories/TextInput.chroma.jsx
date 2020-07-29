import { TextInput } from "@react-components/text-input2";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { createTextInputTestSuite } from "./createTextInputTestSuite";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("TextInput2"))
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

createTextInputTestSuite(<TextInput variant="outline" />, stories("/outline"));

createTextInputTestSuite(<TextInput variant="transparent" />, stories("/transparent"));

/*
outline
transparent
*/

/*
default
value
icon
button
icon + button
text
states
styling
error
*/
