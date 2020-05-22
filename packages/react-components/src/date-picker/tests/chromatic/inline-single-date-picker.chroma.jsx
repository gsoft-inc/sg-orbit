import { AbsoluteRedBox } from "./absolute-red-box";
import { DEFAULT_DATE } from "./data";
import { InlineSingleDatePicker } from "@react-components/date-picker";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { noop } from "lodash";
import moment from "moment";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("DatePicker/single inlined"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%", height: "600px" })
            .chromaticDelay(100)
            .chromaticPauseAnimationAtEnd()
            .build())
        .build();
}

function createInlineSingleDatePicker(props = {}) {
    return <InlineSingleDatePicker
        onDateChange={noop}
        {...props}
    />;
}

stories()
    .add("opened", () =>
        createInlineSingleDatePicker({
            initialVisibleMonth: moment(DEFAULT_DATE),
            defaultOpen: true
        })
    )
    .add("default opened", () =>
        createInlineSingleDatePicker({
            initialVisibleMonth: moment(DEFAULT_DATE),
            defaultOpen: true
        })
    )
    .add("closed", () =>
        createInlineSingleDatePicker()
    );

stories("/selected date/closed")
    .add("no selection", () =>
        createInlineSingleDatePicker()
    )
    .add("date selected", () =>
        createInlineSingleDatePicker({
            date: moment(DEFAULT_DATE)
        })
    )
    .add("null value", () =>
        createInlineSingleDatePicker({
            date: null
        })
    );

stories("/selected date/opened")
    .add("no selection", () =>
        createInlineSingleDatePicker({
            initialVisibleMonth: moment(DEFAULT_DATE),
            defaultOpen: true
        })
    )
    .add("date selected", () =>
        createInlineSingleDatePicker({
            date: moment(DEFAULT_DATE),
            defaultOpen: true
        })
    )
    .add("null value", () =>
        createInlineSingleDatePicker({
            date: null,
            initialVisibleMonth: moment(DEFAULT_DATE),
            defaultOpen: true
        })
    );

stories("/disabled")
    .add("default", () =>
        createInlineSingleDatePicker({
            disabled: true
        })
    )
    .add("selected date", () =>
        createInlineSingleDatePicker({
            defaultDate: moment(DEFAULT_DATE),
            disabled: true
        })
    );

stories("/customization")
    .add("placeholder", () =>
        createInlineSingleDatePicker({
            placeholder: "Custom placeholder"
        })
    )
    .add("date format", () =>
        createInlineSingleDatePicker({
            date: moment(DEFAULT_DATE),
            dateFormat: "YYYY MMM Do"
        })
    )
    .add("styling", () =>
        <div className="flex">
            {createInlineSingleDatePicker({
                className: "bg-red mr5"
            })}
            {createInlineSingleDatePicker({
                style: { backgroundColor: "red" }
            })}
        </div>
    );

stories("/z-index")
    .add("over regular text",
         () =>
             <div>
                 {createInlineSingleDatePicker({
                     initialVisibleMonth: moment(DEFAULT_DATE),
                     defaultOpen: true
                 })}
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
             </div>
    )
    .add("over an element with a z-index greater than 1 but smaller than the date picker",
         () =>
             <div>
                 {createInlineSingleDatePicker({
                     initialVisibleMonth: moment(DEFAULT_DATE),
                     defaultOpen: true
                 })}
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                 <AbsoluteRedBox style={{ zIndex: 2 }} />
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
             </div>
    )
    .add("over an element with a z-index greater than the date picker",
         () =>
             <div>
                 {createInlineSingleDatePicker({
                     initialVisibleMonth: moment(DEFAULT_DATE),
                     defaultOpen: true, zIndex: 1
                 })}
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                 <AbsoluteRedBox style={{ zIndex: 2 }} />
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
             </div>
    );

stories("/font-size")
    .add("default",
         () =>
             createInlineSingleDatePicker()
    )
    .add("adjust to block font-size",
         () =>
             <div className="f9">
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et {createInlineSingleDatePicker()}</p>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
             </div>
    );
