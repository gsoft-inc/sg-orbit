import { BOTTOM_CENTER, BOTTOM_LEFT, BOTTOM_RIGHT, DatePickerAnchor, TOP_CENTER, TOP_LEFT, TOP_RIGHT } from "@orbit-ui/react-date-picker/src";
import { noop } from "lodash";
import { storiesBuilder } from "@utils/stories-builder";

function Anchor({ open = true, disabled = false, ...otherProps }) {
    const INPUT_HEIGHT = 30;

    return <DatePickerAnchor
        input={<div className="bg-blue" style={{ width: "100%", height: `${INPUT_HEIGHT}px` }}></div>}
        inputHeight={INPUT_HEIGHT}
        calendar={<div className="bg-red" style={{ width: "200px", height: "150px" }}></div>}
        open={open}
        disabled={disabled}
        onOutsideClick={noop}
        onEscapeKeyDown={noop}
        {...otherProps}
    />;
}

function stories(segment, layout = {}) {
    return storiesBuilder(module, "Date-Picker-Anchor|specs")
        .segment(segment)
        .layout({
            width: "80%",
            ...layout
        })
        .chromaticDelay(100)
        .build();
}

stories()
    .add("close",
         () =>
             <Anchor
                 open={false}
             />
    )
    .add("open",
         () =>
             <Anchor
                 open
             />
    )
    .add("bottom left",
         () =>
             <Anchor
                 position={BOTTOM_LEFT}
                 open
             />
    )
    .add("bottom center",
         () =>
             <Anchor
                 position={BOTTOM_CENTER}
                 open
             />
    )
    .add("bottom right",
         () =>
             <Anchor
                 position={BOTTOM_RIGHT}
                 open
             />
    )
    .add("top left",
         () =>
             <Anchor
                 position={TOP_LEFT}
                 open
             />,
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
             <Anchor
                 position={TOP_CENTER}
                 open
             />,
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
             <Anchor
                 position={TOP_RIGHT}
                 open
             />,
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
        <Anchor
            position={BOTTOM_LEFT}
            offsets={["30px", "30px"]}
            open
        />
    )
    .add("left+negative", () =>
        <Anchor
            position={BOTTOM_LEFT}
            offsets={["-30px", "-30px"]}
            open
        />
    )
    .add("right+positive", () =>
        <Anchor
            position={BOTTOM_RIGHT}
            offsets={["30px", "30px"]}
            open
        />
    )
    .add("right+negative", () =>
        <Anchor
            position={BOTTOM_RIGHT}
            offsets={["-30px", "-30px"]}
            open
        />
    );

stories("/offsets/top")
    .add("left+positive", () =>
        <Anchor
            position={TOP_LEFT}
            offsets={["30px", "30px"]}
            open
        />,
         {
             options: {
                 layout: {
                     marginTop: "350px"
                 }
             }
         }
    )
    .add("left+negative", () =>
        <Anchor
            position={TOP_LEFT}
            offsets={["-30px", "-30px"]}
            open
        />,
         {
             options: {
                 layout: {
                     marginTop: "350px"
                 }
             }
         }
    )
    .add("right+positive", () =>
        <Anchor
            position={TOP_RIGHT}
            offsets={["30px", "30px"]}
            open
        />,
         {
             options: {
                 layout: {
                     marginTop: "350px"
                 }
             }
         }
    )
    .add("right+negative", () =>
        <Anchor
            position={TOP_RIGHT}
            offsets={["-30px", "-30px"]}
            open
        />,
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
             <Anchor
                 className="border-red"
                 open={false}
             />,
    );
