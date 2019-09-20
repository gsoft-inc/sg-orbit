import { BOTTOM_CENTER, BOTTOM_LEFT, BOTTOM_RIGHT, DatePickerAnchor as DPA, TOP_CENTER, TOP_LEFT, TOP_RIGHT } from "@orbit-ui/react-date-picker/src";
import { noop } from "lodash";
import { storiesBuilder } from "@utils/stories-builder";

function DatePickerAnchor({ open = true, disabled = false, ...otherProps }) {
    const INPUT_HEIGHT = 30;

    return <DPA
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
             <DatePickerAnchor
                 open={false}
             />
    )
    .add("open",
         () =>
             <DatePickerAnchor
                 open
             />
    )
    .add("bottom left",
         () =>
             <DatePickerAnchor
                 position={BOTTOM_LEFT}
                 open
             />
    )
    .add("bottom center",
         () =>
             <DatePickerAnchor
                 position={BOTTOM_CENTER}
                 open
             />
    )
    .add("bottom right",
         () =>
             <DatePickerAnchor
                 position={BOTTOM_RIGHT}
                 open
             />
    )
    .add("top left",
         () =>
             <DatePickerAnchor
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
             <DatePickerAnchor
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
             <DatePickerAnchor
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
        <DatePickerAnchor
            position={BOTTOM_LEFT}
            offsets={["30px", "30px"]}
            open
        />
    )
    .add("left+negative", () =>
        <DatePickerAnchor
            position={BOTTOM_LEFT}
            offsets={["-30px", "-30px"]}
            open
        />
    )
    .add("right+positive", () =>
        <DatePickerAnchor
            position={BOTTOM_RIGHT}
            offsets={["30px", "30px"]}
            open
        />
    )
    .add("right+negative", () =>
        <DatePickerAnchor
            position={BOTTOM_RIGHT}
            offsets={["-30px", "-30px"]}
            open
        />
    );

stories("/offsets/top")
    .add("left+positive", () =>
        <DatePickerAnchor
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
        <DatePickerAnchor
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
        <DatePickerAnchor
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
        <DatePickerAnchor
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
             <DatePickerAnchor
                 className="border-red"
                 open={false}
             />,
    );
