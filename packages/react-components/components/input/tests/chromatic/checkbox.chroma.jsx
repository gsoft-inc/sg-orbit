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
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createCheckbox({
                    icon: <CommunicationIcon />,
                    text: null,
                    size: "small",
                    className: "mr5"
                })}
                {createCheckbox({
                    icon: <CommunicationIcon />,
                    size: "small"
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createCheckbox({
                    icon: <CommunicationIcon />,
                    text: null,
                    className: "mr5"
                })}
                {createCheckbox({
                    icon: <CommunicationIcon />
                })}
            </div>
            <div className="flex">
                {createCheckbox({
                    icon: <CommunicationIcon />,
                    text: null,
                    size: "large",
                    className: "mr5"
                })}
                {createCheckbox({
                    icon: <CommunicationIcon />,
                    size: "large"
                })}
            </div>
        </div>
    )
    .add("label", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createCheckbox({
                    label: <Label>6</Label>,
                    text: null,
                    size: "small",
                    className: "mr5"
                })}
                {createCheckbox({
                    label: <Label>6</Label>,
                    size: "small"
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createCheckbox({
                    label: <Label>6</Label>,
                    text: null,
                    className: "mr5"
                })}
                {createCheckbox({
                    label: <Label>6</Label>
                })}
            </div>
            <div className="flex">
                {createCheckbox({
                    label: <Label>6</Label>,
                    text: null,
                    size: "large",
                    className: "mr5"
                })}
                {createCheckbox({
                    label: <Label>6</Label>,
                    size: "large"
                })}
            </div>
        </div>
    )
    .add("size", () =>
        <div className="flex flex-column">
            <div className="flex items-end mb5">
                {createCheckbox({
                    size: "small",
                    className: "mr5"
                })}
                {createCheckbox({
                    className: "mr5"
                })}
                {createCheckbox({
                    size: "large"
                })}
            </div>
            <div className="flex items-end">
                {createCheckbox({
                    size: "small",
                    defaultChecked: true,
                    className: "mr5"
                })}
                {createCheckbox({
                    defaultChecked: true,
                    className: "mr5"
                })}
                {createCheckbox({
                    defaultChecked: true,
                    size: "large"
                })}
            </div>
        </div>
    );
