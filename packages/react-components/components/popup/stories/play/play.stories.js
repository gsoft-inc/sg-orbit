import { ControlledRedBox } from "./components/controlled-red-box";
import { isNil } from "lodash";
import { storiesBuilder } from "../../../../storybook/utils/stories-builder";
import { text, withKnobs } from "@storybook/addon-knobs";

function pixelKnob(name) {
    let value = text(name);

    if (!isNil(value) && !value.endsWith("px")) {
        value += "px";
    }

    return value;
}

function stories(segment) {
    return storiesBuilder("Popup|play")
        .segment(segment)
        .chromaticIgnoreStory()
        .build();
}

stories()
    .add("default", () =>
        <ControlledRedBox />
    )
    .add("knobs", () =>
        <ControlledRedBox
            top={pixelKnob("top")}
            bottom={pixelKnob("bottom")}
            left={pixelKnob("left")}
            right={pixelKnob("right")}
        />,
        { decorators: [withKnobs] }
    );
