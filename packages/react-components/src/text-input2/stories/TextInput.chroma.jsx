import { Button } from "@react-components/button";
import { CrossIcon, MagnifierIcon } from "@react-components/icons";
import { TextInput } from "@react-components/text-input2";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("TextInput2"))
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

stories()
    .add("default", () =>
        <TextInput
            placeholder="Where to?"
        />
    );
