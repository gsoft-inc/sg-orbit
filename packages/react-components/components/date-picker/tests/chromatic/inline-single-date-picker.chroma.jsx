import { ChevronIcon } from "@orbit-ui/icons";
import { DEFAULT_DATE } from "./data";
import { INLINE_SINGLE_DATE_PICKER_SECTION } from "@react-components/date-picker/stories/metadata";
import { InlineSingleDatePicker } from "@orbit-ui/react-date-picker/src";
import { noop } from "lodash";
import { paramsBuilder } from "@utils/params-builder";
import { storiesOfBuilder } from "@utils/stories-of-builder";
import moment from "moment";

function createInlineSingleDatePicker(props = {}) {
    return <InlineSingleDatePicker
        onDateChange={noop}
        {...props}
    />;
}

function stories(segment) {
    return storiesOfBuilder(module, `${INLINE_SINGLE_DATE_PICKER_SECTION}/chromatic`)
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
    .add("disabled open icon", () =>
        createInlineSingleDatePicker({
            input: <InlineSingleDatePicker.Input disabledOpenIcon={<ChevronIcon className="w4 h4 rotate-270 fill-red" />} />,
            defaultOpen: true,
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
