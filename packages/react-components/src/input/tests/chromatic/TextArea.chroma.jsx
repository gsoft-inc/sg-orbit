import { TextArea } from "@react-components/input";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { createTextAreaTestSuite } from "./createTextAreaTestSuite";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("TextArea"))
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

createTextAreaTestSuite(<TextArea variant="outline" />, stories("/outline"));

createTextAreaTestSuite(<TextArea variant="transparent" />, stories("/transparent"));

stories()
    .add("no resize", () =>
        <TextArea resize="none" />
    )
    .add("rows", () =>
        <TextArea rows="12" />
    )
    .add("autofocus", () =>
        <TextArea autoFocus />
    )
    .add("when disabled do not autofocus", () =>
        <TextArea disabled autoFocus />
    )
    .add("autofocus with delay", () =>
        <TextArea autoFocus autoFocusDelay={50} />
    );
