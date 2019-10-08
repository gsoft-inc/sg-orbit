import {
    BOTTOM_CENTER,
    BOTTOM_LEFT,
    BOTTOM_RIGHT,
    TOP_CENTER,
    TOP_LEFT,
    TOP_RIGHT
} from "@orbit-ui/react-popup/src";
import { RedBoxPopup } from "@stories/react-components/popup/components/red-box-popup";
import { storiesBuilder } from "@utils/stories-builder";

function stories(segment) {
    return storiesBuilder(module, "Popup|specs")
        .segment(segment)
        .chromaticDelay(100)
        .build();
}

stories()
    .add("close",
         () =>
             <RedBoxPopup />
    )
    .add("open",
         () =>
             <RedBoxPopup defaultOpen />
    )
    .add("bottom left",
         () =>
             <RedBoxPopup position={BOTTOM_LEFT} defaultOpen />
    )
    .add("bottom center",
         () =>
             <RedBoxPopup position={BOTTOM_CENTER} defaultOpen />
    )
    .add("bottom right",
         () =>
             <RedBoxPopup position={BOTTOM_RIGHT} defaultOpen />
    )
    .add("top left",
         () =>
             <RedBoxPopup position={TOP_LEFT} defaultOpen />,
         {
             options: {
                 layout: {
                     marginTop: "350px"
                 }
             }
         }
    )
    .add("top center",
         () =>
             <RedBoxPopup position={TOP_CENTER} defaultOpen />,
         {
             options: {
                 layout: {
                     marginTop: "350px"
                 }
             }
         }
    )
    .add("top right",
         () =>
             <RedBoxPopup position={TOP_RIGHT} defaultOpen />,
         {
             options: {
                 layout: {
                     marginTop: "350px"
                 }
             }
         }
    );

stories("/offsets/bottom")
    .add("left+positive", () =>
        <RedBoxPopup position={BOTTOM_LEFT} offsets={["30px", "30px"]} defaultOpen />,
    )
    .add("left+negative", () =>
        <RedBoxPopup position={BOTTOM_LEFT} offsets={["-30px", "-30px"]} defaultOpen />,
    )
    .add("right+positive", () =>
        <RedBoxPopup position={BOTTOM_RIGHT} offsets={["30px", "30px"]} defaultOpen />,
    )
    .add("right+negative", () =>
        <RedBoxPopup position={BOTTOM_RIGHT} offsets={["-30px", "-30px"]} defaultOpen />,
    );

stories("/offsets/top")
    .add("left+positive", () =>
        <RedBoxPopup position={TOP_LEFT} offsets={["30px", "30px"]} defaultOpen />,
         {
             options: {
                 layout: {
                     marginTop: "350px"
                 }
             }
         }
    )
    .add("left+negative", () =>
        <RedBoxPopup position={TOP_LEFT} offsets={["-30px", "-30px"]} defaultOpen />,
         {
             options: {
                 layout: {
                     marginTop: "350px"
                 }
             }
         }
    )
    .add("right+positive", () =>
        <RedBoxPopup position={TOP_RIGHT} offsets={["30px", "30px"]} defaultOpen />,
         {
             options: {
                 layout: {
                     marginTop: "350px"
                 }
             }
         }
    )
    .add("right+negative", () =>
        <RedBoxPopup position={TOP_RIGHT} offsets={["-30px", "-30px"]} defaultOpen />,
         {
             options: {
                 layout: {
                     marginTop: "350px"
                 }
             }
         }
    );

stories()
    .add("css class",
         () =>
             <RedBoxPopup className="border-red" />
    );
