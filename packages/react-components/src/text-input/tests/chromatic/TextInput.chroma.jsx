import { Inline } from "@react-components/layout";
import { TextInput } from "@react-components/text-input";
import { createTextInputTestSuite } from "./createTextInputTestSuite";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/TextInput")
        .segment(segment)
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
        <TextInput autoFocus={50} />
    )
    .add("styling", () =>
        <Inline>
            <TextInput className="bg-red" />
            <TextInput style={{ backgroundColor: "red" }} />
            <TextInput wrapperProps={{ className: "border-red" }} />
            <TextInput wrapperProps={{ style: { border: "1px solid red" } }} />
        </Inline>
    );
