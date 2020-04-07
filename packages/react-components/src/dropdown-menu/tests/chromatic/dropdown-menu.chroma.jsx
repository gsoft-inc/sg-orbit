import { AddIcon, CalendarIcon, MagnifierIcon, VerticalDotsIcon } from "@react-components/icons";
import { Button } from "@react-components/button";
import { DropdownMenu } from "@react-components/dropdown-menu";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

// TODO:
// - Header
// - Divider
// - Direction
// - Fluid
// - Icon

// Item:
// - Description
// - Icon
// - Image

const ACTIONS = [
    { key: "New", text: "New", value: "New" },
    { key: "Open...", text: "Open...", value: "Open..." },
    { key: "Rename...", text: "Rename...", value: "Rename..." }
];

function createDropdownMenu({ text = "File", options = ACTIONS, ...otherProps } = {}) {
    return <DropdownMenu
        text={text}
        options={options}
        {...otherProps}
    />;
}

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Dropdown Menu"))
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

stories()
    .add("text", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "200px" }}>
                {createDropdownMenu({
                    size: "small",
                    className: "mr5"
                })}
                {createDropdownMenu({
                    size: "small",
                    defaultOpen: true
                })}
            </div>
            <div className="flex" style={{ marginBottom: "200px" }}>
                {createDropdownMenu({
                    className: "mr5"
                })}
                {createDropdownMenu({
                    defaultOpen: true
                })}
            </div>
            <div className="flex">
                {createDropdownMenu({
                    size: "large",
                    className: "mr5"
                })}
                {createDropdownMenu({
                    size: "large",
                    defaultOpen: true
                })}
            </div>
        </div>
    )
    .add("trigger", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "200px" }}>
                {createDropdownMenu({
                    trigger: <AddIcon />,
                    style: { marginRight: "100px" }
                })}
                {createDropdownMenu({
                    trigger: <AddIcon />,
                    size: "small",
                    defaultOpen: true,
                    style: { marginRight: "100px" }
                })}
                {createDropdownMenu({
                    trigger: <AddIcon />,
                    defaultOpen: true,
                    style: { marginRight: "100px" }
                })}
                {createDropdownMenu({
                    trigger: <AddIcon />,
                    size: "large",
                    defaultOpen: true
                })}
            </div>
            <div className="flex" style={{ marginBottom: "200px" }}>
                {createDropdownMenu({
                    trigger: <Button circular secondary icon={<VerticalDotsIcon />} />,
                    style: { marginRight: "100px" }
                })}
                {createDropdownMenu({
                    trigger: <Button circular secondary icon={<VerticalDotsIcon />} />,
                    size: "small",
                    defaultOpen: true,
                    style: { marginRight: "100px" }
                })}
                {createDropdownMenu({
                    trigger: <Button circular secondary icon={<VerticalDotsIcon />} />,
                    defaultOpen: true,
                    style: { marginRight: "100px" }
                })}
                {createDropdownMenu({
                    trigger: <Button circular secondary icon={<VerticalDotsIcon />} />,
                    size: "large",
                    defaultOpen: true
                })}
            </div>
            <div className="flex">
                {createDropdownMenu({
                    trigger: <Button>Open</Button>,
                    style: { marginRight: "100px" }
                })}
                {createDropdownMenu({
                    trigger: <Button>Open</Button>,
                    size: "small",
                    defaultOpen: true,
                    style: { marginRight: "100px" }
                })}
                {createDropdownMenu({
                    trigger: <Button>Open</Button>,
                    defaultOpen: true,
                    style: { marginRight: "100px" }
                })}
                {createDropdownMenu({
                    trigger: <Button>Open</Button>,
                    size: "large",
                    defaultOpen: true
                })}
            </div>
        </div>
    )
    .add("icon", () =>
        <div className="flex flex-column">
            <div>

            </div>
        </div>
    )
    .add("scrolling", () =>
        createDropdownMenu({
            scrolling: true,
            options: [
                { key: "New", text: "New", value: "New" },
                { key: "Open...", text: "Open...", value: "Open..." },
                { key: "Rename...", text: "Rename...", value: "Rename..." },
                { key: "Rename...", text: "Rename...", value: "Rename..." },
                { key: "Rename...", text: "Rename...", value: "Rename..." },
                { key: "Rename...", text: "Rename...", value: "Rename..." },
                { key: "Rename...", text: "Rename...", value: "Rename..." },
                { key: "Rename...", text: "Rename...", value: "Rename..." },
                { key: "Rename...", text: "Rename...", value: "Rename..." },
                { key: "Rename...", text: "Rename...", value: "Rename..." },
                { key: "Rename...", text: "Rename...", value: "Rename..." },
                { key: "Rename...", text: "Rename...", value: "Rename..." },
                { key: "Rename...", text: "Rename...", value: "Rename..." },
                { key: "Rename...", text: "Rename...", value: "Rename..." }
            ],
            defaultOpen: true
        })
    )
    .add("upward", () =>
        <div className="flex flex-column">
            <div style={{ marginTop: "150px" }}>
                {createDropdownMenu({
                    upward: true,
                    size: "small",
                    defaultOpen: true,
                    style: { marginRight: "100px" }
                })}
                {createDropdownMenu({
                    upward: true,
                    defaultOpen: true,
                    style: { marginRight: "100px" }
                })}
                {createDropdownMenu({
                    upward: true,
                    size: "large",
                    defaultOpen: true,
                    style: { marginRight: "100px" }
                })}
            </div>
        </div>
    );
