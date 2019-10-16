import {
    BOTTOM_CENTER,
    BOTTOM_LEFT,
    BOTTOM_RIGHT,
    Popup,
    TOP_CENTER,
    TOP_LEFT,
    TOP_RIGHT
} from "@orbit-ui/react-popup/src";
import { ControlledRedBox, RedBoxPopup } from "./components";
import { array, select, withKnobs } from "@storybook/addon-knobs";
import { paramsBuilder } from "@utils/params-builder";

export default {
    title: "Popup",
    component: Popup
};

export const defaultState = () => <RedBoxPopup />;
defaultState.story = {
    name: "default"
};

export const knobs = () => <RedBoxPopup
    position={select("position", { TopLeft: TOP_LEFT, TopRight: TOP_RIGHT, TopCenter: TOP_CENTER, BottomLeft: BOTTOM_LEFT, BottomRight: BOTTOM_RIGHT, BottomCenter: BOTTOM_CENTER })}
    offsets={array("offsets", ["0px", "0px"])}
/>;
knobs.story = {
    name: "knobs",
    decorators: [withKnobs],
    parameters: paramsBuilder()
        .marginTop("150px")
        .build()
};

export const controlled = () => <ControlledRedBox />;
controlled.story = {
    name: "controlled"
};
