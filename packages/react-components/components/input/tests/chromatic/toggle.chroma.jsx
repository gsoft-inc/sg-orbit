import { CommunicationIcon } from "@orbit-ui/react-icons/src";
import { Label } from "@orbit-ui/react-label/src";
import { Toggle } from "@orbit-ui/react-input/src";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Toggle"))
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .build())
        .build();
}

function createToggle({ text = "Milky Way", ...otherProps } = {}) {
    return (
        <Toggle
            text={text}
            {...otherProps}
        />
    );
}

stories()
    .add("text", () =>
        createToggle()
    )
    .add("checked", () =>
        createToggle({
            checked: true
        })
    )
    .add("no text", () =>
        createToggle({
            text: null
        })
    )
    .add("disabled", () =>
        <div className="flex">
            {createToggle({
                disabled: true,
                className: "mr5"
            })}
            {createToggle({
                disabled: true,
                checked: true,
                className: "mr5"
            })}
            {createToggle({
                disabled: true,
                text: null
            })}
        </div>
    )
    .add("readonly", () =>
        <div className="flex">
            {createToggle({
                readOnly: true,
                className: "mr5"
            })}
            {createToggle({
                readOnly: true,
                checked: true,
                className: "mr5"
            })}
            {createToggle({
                readOnly: true,
                text: null
            })}
        </div>
    )
    .add("icons", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createToggle({
                    icons: <CommunicationIcon />,
                    text: null,
                    size: "tiny",
                    className: "mr5"
                })}
                {createToggle({
                    icons: <CommunicationIcon />,
                    size: "tiny",
                    className: "mr5"
                })}
                {createToggle({
                    icons: [<CommunicationIcon />, <CommunicationIcon />, <CommunicationIcon />],
                    size: "tiny",
                    className: "mr5"
                })}
                {createToggle({
                    icons: [<CommunicationIcon />, <CommunicationIcon />, <CommunicationIcon />],
                    label: <Label>6</Label>,
                    size: "tiny"
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createToggle({
                    icons: <CommunicationIcon />,
                    text: null,
                    size: "small",
                    className: "mr5"
                })}
                {createToggle({
                    icons: <CommunicationIcon />,
                    size: "small",
                    className: "mr5"
                })}
                {createToggle({
                    icons: [<CommunicationIcon />, <CommunicationIcon />, <CommunicationIcon />],
                    size: "small",
                    className: "mr5"
                })}
                {createToggle({
                    icons: [<CommunicationIcon />, <CommunicationIcon />, <CommunicationIcon />],
                    label: <Label>6</Label>,
                    size: "small"
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createToggle({
                    icons: <CommunicationIcon />,
                    text: null,
                    className: "mr5"
                })}
                {createToggle({
                    icons: <CommunicationIcon />,
                    className: "mr5"
                })}
                {createToggle({
                    icons: [<CommunicationIcon />, <CommunicationIcon />, <CommunicationIcon />],
                    className: "mr5"
                })}
                {createToggle({
                    icons: [<CommunicationIcon />, <CommunicationIcon />, <CommunicationIcon />],
                    label: <Label>6</Label>
                })}
            </div>
            <div className="flex">
                {createToggle({
                    icons: <CommunicationIcon />,
                    text: null,
                    size: "large",
                    className: "mr5"
                })}
                {createToggle({
                    icons: <CommunicationIcon />,
                    size: "large",
                    className: "mr5"
                })}
                {createToggle({
                    icons: [<CommunicationIcon />, <CommunicationIcon />, <CommunicationIcon />],
                    size: "large",
                    className: "mr5"
                })}
                {createToggle({
                    icons: [<CommunicationIcon />, <CommunicationIcon />, <CommunicationIcon />],
                    size: "large",
                    label: <Label>6</Label>
                })}
            </div>
        </div>
    )
    .add("label", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createToggle({
                    label: <Label>6</Label>,
                    text: null,
                    size: "tiny",
                    className: "mr5"
                })}
                {createToggle({
                    label: <Label>6</Label>,
                    size: "tiny"
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createToggle({
                    label: <Label>6</Label>,
                    text: null,
                    size: "small",
                    className: "mr5"
                })}
                {createToggle({
                    label: <Label>6</Label>,
                    size: "small"
                })}
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createToggle({
                    label: <Label>6</Label>,
                    text: null,
                    className: "mr5"
                })}
                {createToggle({
                    label: <Label>6</Label>
                })}
            </div>
            <div className="flex">
                {createToggle({
                    label: <Label>6</Label>,
                    text: null,
                    size: "large",
                    className: "mr5"
                })}
                {createToggle({
                    label: <Label>6</Label>,
                    size: "large"
                })}
            </div>
        </div>
    )
    .add("size", () =>
        <div className="flex flex-column">
            <div className="flex items-end mb5">
                {createToggle({
                    size: "tiny",
                    className: "mr5"
                })}
                {createToggle({
                    size: "small",
                    className: "mr5"
                })}
                {createToggle({
                    className: "mr5"
                })}
                {createToggle({
                    size: "large"
                })}
            </div>
            <div className="flex items-end">
                {createToggle({
                    size: "tiny",
                    defaultChecked: true,
                    className: "mr5"
                })}
                {createToggle({
                    size: "small",
                    defaultChecked: true,
                    className: "mr5"
                })}
                {createToggle({
                    defaultChecked: true,
                    className: "mr5"
                })}
                {createToggle({
                    defaultChecked: true,
                    size: "large"
                })}
            </div>
        </div>
    );
