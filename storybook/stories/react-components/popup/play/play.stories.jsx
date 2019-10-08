import {
    BOTTOM_CENTER,
    BOTTOM_LEFT,
    BOTTOM_RIGHT,
    TOP_CENTER,
    TOP_LEFT,
    TOP_RIGHT
} from "@orbit-ui/react-popup/src";
import { ControlledRedBox } from "./components/controlled-red-box";
import { RedBoxPopup } from "@stories/react-components/popup/components/red-box-popup";
import { array, select, withKnobs } from "@storybook/addon-knobs";
import { storiesBuilder } from "@utils/stories-builder";

function stories(segment) {
    return storiesBuilder(module, "Popup|play")
        .segment(segment)
        .chromaticIgnoreStory()
        .build();
}

stories()
    .add("default",
         () =>
             <RedBoxPopup />
    )
    .add("knobs",
         () =>
             <RedBoxPopup
                 position={select("position", { TopLeft: TOP_LEFT, TopRight: TOP_RIGHT, TopCenter: TOP_CENTER, BottomLeft: BOTTOM_LEFT, BottomRight: BOTTOM_RIGHT, BottomCenter: BOTTOM_CENTER })}
                 offsets={array("offsets", ["0px", "0px"])}
             />,
         {
             decorators: [withKnobs],
             options: {
                 layout: {
                     marginTop: "150px"
                 }
             }
         }
    )
    .add("controlled",
         () =>
             <ControlledRedBox />
    );
