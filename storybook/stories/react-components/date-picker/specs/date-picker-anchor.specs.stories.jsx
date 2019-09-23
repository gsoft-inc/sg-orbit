import { BOTTOM_CENTER, BOTTOM_LEFT, BOTTOM_RIGHT, DatePickerAnchor, TOP_CENTER, TOP_LEFT, TOP_RIGHT } from "@orbit-ui/react-date-picker/src";
import { noop } from "lodash";
import { storiesBuilder } from "@utils/stories-builder";

function createDatePickerAnchor({ open = true, disabled = false, ...otherProps } = {}) {
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
             createDatePickerAnchor({
                 open: false
             })
    )
    .add("open",
         () =>
             createDatePickerAnchor({
                 open: true
             })
    )
    .add("bottom left",
         () =>
             createDatePickerAnchor({
                 position: BOTTOM_LEFT,
                 open: true
             })
    )
    .add("bottom center",
         () =>
             createDatePickerAnchor({
                 position: BOTTOM_CENTER,
                 open: true
             })
    )
    .add("bottom right",
         () =>
             createDatePickerAnchor({
                 position: BOTTOM_RIGHT,
                 open: true
             })
    )
    .add("top left",
         () =>
             createDatePickerAnchor({
                 position: TOP_LEFT,
                 open: true
             }),
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
             createDatePickerAnchor({
                 position: TOP_CENTER,
                 open: true
             }),
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
             createDatePickerAnchor({
                 position: TOP_RIGHT,
                 open: true
             }),
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
        createDatePickerAnchor({
            position: BOTTOM_LEFT,
            offsets: ["30px", "30px"],
            open: true
        })
    )
    .add("left+negative", () =>
        createDatePickerAnchor({
            position: BOTTOM_LEFT,
            offsets: ["-30px", "-30px"],
            open: true
        })
    )
    .add("right+positive", () =>
        createDatePickerAnchor({
            position: BOTTOM_RIGHT,
            offsets: ["30px", "30px"],
            open: true
        })
    )
    .add("right+negative", () =>
        createDatePickerAnchor({
            position: BOTTOM_RIGHT,
            offsets: ["-30px", "-30px"],
            open: true
        })
    );

stories("/offsets/top")
    .add("left+positive", () =>
        createDatePickerAnchor({
            position: TOP_LEFT,
            offsets: ["30px", "30px"],
            open: true
        }),
         {
             options: {
                 layout: {
                     marginTop: "350px"
                 }
             }
         }
    )
    .add("left+negative", () =>
        createDatePickerAnchor({
            position: TOP_LEFT,
            offsets: ["-30px", "-30px"],
            open: true
        }),
         {
             options: {
                 layout: {
                     marginTop: "350px"
                 }
             }
         }
    )
    .add("right+positive", () =>
        createDatePickerAnchor({
            position: TOP_RIGHT,
            offsets: ["30px", "30px"],
            open: true
        }),
         {
             options: {
                 layout: {
                     marginTop: "350px"
                 }
             }
         }
    )
    .add("right+negative", () =>
        createDatePickerAnchor({
            position: TOP_RIGHT,
            offsets: ["-30px", "-30px"],
            open: true
        }),
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
             createDatePickerAnchor({
                 className: "border-red",
                 open: false
             }),
    );
