import { Checkbox } from "@orbit-ui/react-input/src";
import { CommunicationIcon } from "@orbit-ui/react-icons/src";
import { Label } from "@orbit-ui/react-label/src";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Checkbox"))
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .build())
        .build();
}

function createCheckbox({ text = "Milky Way", ...otherProps } = {}) {
    return (
        <Checkbox
            text={text}
            {...otherProps}
        />
    );
}

stories()
    .add("text", () =>
        createCheckbox()
    )
    .add("checked", () =>
        createCheckbox({
            checked: true
        })
    )
    .add("indeterminate", () =>
        createCheckbox({
            defaultIndeterminate: true
        })
    )
    .add("no text", () =>
        <div className="flex">
            {createCheckbox({
                text: null,
                className: "mr5"
            })}
            {createCheckbox({
                text: null,
                checked: true,
                className: "mr5"
            })}
            {createCheckbox({
                text: null,
                defaultIndeterminate: true
            })}
        </div>
    )
    .add("disabled", () =>
        <div className="flex">
            {createCheckbox({
                disabled: true,
                className: "mr5"
            })}
            {createCheckbox({
                disabled: true,
                checked: true,
                className: "mr5"
            })}
            {createCheckbox({
                disabled: true,
                defaultIndeterminate: true,
                className: "mr5"
            })}
            {createCheckbox({
                disabled: true,
                text: null
            })}
        </div>
    )
    .add("readonly", () =>
        <div className="flex">
            {createCheckbox({
                readOnly: true,
                className: "mr5"
            })}
            {createCheckbox({
                readOnly: true,
                checked: true,
                className: "mr5"
            })}
            {createCheckbox({
                readOnly: true,
                defaultIndeterminate: true,
                className: "mr5"
            })}
            {createCheckbox({
                readOnly: true,
                text: null
            })}
        </div>
    )
    .add("icon", () =>
        <div className="flex">
            {createCheckbox({
                icon: <CommunicationIcon />,
                text: null,
                className: "mr5"
            })}
            {createCheckbox({
                icon: <CommunicationIcon />,
                text: "Email"
            })}
        </div>
    )
    .add("label", () =>
        <div className="flex">
            {createCheckbox({
                label: <Label>6</Label>,
                text: null,
                className: "mr5"
            })}
            {createCheckbox({
                label: <Label>6</Label>,
                text: "Email"
            })}
        </div>
    );
