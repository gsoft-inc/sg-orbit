import { ChevronIcon } from "@orbit-ui/icons";
import { DEFAULT_DATE } from "./data";
import { InlineSingleDatePicker } from "@orbit-ui/react-date-picker/src";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { noop } from "lodash";
import moment from "moment";

function createInlineSingleDatePicker(props = {}) {
    return <InlineSingleDatePicker
        onDateChange={noop}
        {...props}
    />;
}

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Date Picker/single inlined"))
        .segment(segment)
        .parameters(
            paramsBuilder()
                .width("80%")
                .chromaticDelay(100)
                .build()
        )
        .build();
}

stories()
    .add("closed",
         () =>
             createInlineSingleDatePicker()
    )
    .add("opened",
         () =>
             createInlineSingleDatePicker({
                 initialVisibleMonth: moment(DEFAULT_DATE),
                 defaultOpen: true
             })
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
    .add("close icon", () =>
        createInlineSingleDatePicker({
            input: <InlineSingleDatePicker.Input closeIcon={<ChevronIcon className="w4 h4 rotate-90 fill-red" />} />
        })
    )
    .add("open icon", () =>
        createInlineSingleDatePicker({
            input: <InlineSingleDatePicker.Input openIcon={<ChevronIcon className="w4 h4 rotate-270 fill-red" />} />,
            initialVisibleMonth: moment(DEFAULT_DATE),
            defaultOpen: true
        })
    )
    .add("disabled close icon", () =>
        createInlineSingleDatePicker({
            input: <InlineSingleDatePicker.Input disabledCloseIcon={<ChevronIcon className="w4 h4 rotate-90 fill-red" />} />,
            disabled: true
        })
    )
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
    .add("css class", () =>
        createInlineSingleDatePicker({
            className: "bg-red"
        })
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
                 <div className="w7 h7 bg-red" style={{ zIndex: 2, position: "relative" }}></div>
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
                     defaultOpen: true, zIndex: "1"
                 })}
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                 <div className="w7 h7 bg-red" style={{ zIndex: 2, position: "relative" }}></div>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum et</p>
             </div>
    );
