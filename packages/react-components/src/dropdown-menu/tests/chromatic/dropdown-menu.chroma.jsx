import { AddIcon, EditIcon, FileIcon, VerticalDotsIcon } from "@react-components/icons";
import { Button } from "@react-components/button";
import { DropdownMenu } from "@react-components/dropdown-menu";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { isNil } from "lodash";

const createNewItem = (props = {}) => {
    return { key: "New", text: "New", value: "New", ...props };
};

const createOpenItem = (props = {}) => {
    return { key: "Open...", text: "Open...", value: "Open...", ...props };
};

const createRenameItem = (props = {}) => {
    return { key: "Rename...", text: "Rename...", value: "Rename...", ...props };
};

const ACTIONS = [createNewItem(), createOpenItem(), createRenameItem()];

function createDropdownMenu({ text = "File", trigger, options = ACTIONS, ...otherProps } = {}) {
    return <DropdownMenu
        text={isNil(trigger) ? text : undefined}
        trigger={trigger}
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
            <div className="flex" style={{ marginBottom: "200px" }}>
                {createDropdownMenu({
                    icon: <FileIcon />,
                    size: "small",
                    className: "mr5"
                })}
                {createDropdownMenu({
                    icon: <FileIcon />,
                    size: "small",
                    defaultOpen: true
                })}
            </div>
            <div className="flex" style={{ marginBottom: "200px" }}>
                {createDropdownMenu({
                    icon: <FileIcon />,
                    className: "mr5"
                })}
                {createDropdownMenu({
                    icon: <FileIcon />,
                    defaultOpen: true
                })}
            </div>
            <div className="flex">
                {createDropdownMenu({
                    icon: <FileIcon />,
                    size: "large",
                    className: "mr5"
                })}
                {createDropdownMenu({
                    icon: <FileIcon />,
                    size: "large",
                    defaultOpen: true
                })}
            </div>
        </div>
    )
    .add("scrolling", () =>
        createDropdownMenu({
            scrolling: true,
            options: [
                { key: "1", text: "1", value: "1" },
                { key: "2", text: "2", value: "2" },
                { key: "3", text: "3", value: "3" },
                { key: "4", text: "4", value: "4" },
                { key: "5", text: "5", value: "5" },
                { key: "6", text: "6", value: "6" },
                { key: "7", text: "7", value: "7" },
                { key: "8", text: "8", value: "8" },
                { key: "9", text: "9", value: "9" },
                { key: "10", text: "10", value: "10" },
                { key: "11", text: "11", value: "11" }
            ],
            defaultOpen: true
        })
    )
    .add("direction", () =>
        <div className="flex">
            <div className="flex flex-column mr12">
                {createDropdownMenu({
                    direction: "left",
                    size: "small",
                    defaultOpen: true,
                    style: { marginBottom: "200px" }
                })}
                {createDropdownMenu({
                    direction: "left",
                    defaultOpen: true,
                    style: { marginBottom: "200px" }
                })}
                {createDropdownMenu({
                    direction: "left",
                    size: "large",
                    defaultOpen: true,
                    style: { marginBottom: "200px" }
                })}
            </div>
            <div className="flex flex-column">
                {createDropdownMenu({
                    direction: "right",
                    size: "small",
                    defaultOpen: true,
                    style: { marginBottom: "200px" }
                })}
                {createDropdownMenu({
                    direction: "right",
                    defaultOpen: true,
                    style: { marginBottom: "200px" }
                })}
                {createDropdownMenu({
                    direction: "right",
                    size: "large",
                    defaultOpen: true,
                    style: { marginBottom: "200px" }
                })}
            </div>
        </div>
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
    )
    .add("fluid", () =>
        <div className="flex">
            <div className="flex flex-column w-50 mr12">
                {createDropdownMenu({
                    size: "small",
                    fluid: true,
                    style: { marginBottom: "200px" }
                })}
                {createDropdownMenu({
                    fluid: true,
                    style: { marginBottom: "200px" }
                })}
                {createDropdownMenu({
                    size: "large",
                    fluid: true
                })}
            </div>
            <div className="flex flex-column w-50">
                {createDropdownMenu({
                    size: "small",
                    fluid: true,
                    defaultOpen: true,
                    style: { marginBottom: "200px" }
                })}
                {createDropdownMenu({
                    fluid: true,
                    defaultOpen: true,
                    style: { marginBottom: "200px" }
                })}
                {createDropdownMenu({
                    size: "large",
                    fluid: true,
                    defaultOpen: true
                })}
            </div>
        </div>
    );

stories("/item")
    .add("default", () =>
        <div className="flex flex-column">
            <div style={{ marginBottom: "150px" }}>
                {createDropdownMenu({
                    size: "small",
                    open: true
                })}
            </div>
            <div style={{ marginBottom: "200px" }}>
                {createDropdownMenu({
                    open: true
                })}
            </div>
            <div>
                {createDropdownMenu({
                    size: "large",
                    open: true
                })}
            </div>
        </div>
    )
    .add("active", () =>
        <div className="flex flex-column">
            <div style={{ marginBottom: "150px" }}>
                {createDropdownMenu({
                    options: [createNewItem(), createOpenItem(), createRenameItem({ active: true })],
                    size: "small",
                    open: true
                })}
            </div>
            <div style={{ marginBottom: "200px" }}>
                {createDropdownMenu({
                    options: [createNewItem(), createOpenItem(), createRenameItem({ active: true })],
                    open: true
                })}
            </div>
            <div>
                {createDropdownMenu({
                    options: [createNewItem(), createOpenItem(), createRenameItem({ active: true })],
                    size: "large",
                    open: true
                })}
            </div>
        </div>
    )
    .add("disabled", () =>
        <div className="flex flex-column">
            <div style={{ marginBottom: "150px" }}>
                {createDropdownMenu({
                    options: [createNewItem(), createOpenItem(), createRenameItem({ disabled: true })],
                    size: "small",
                    open: true
                })}
            </div>
            <div style={{ marginBottom: "200px" }}>
                {createDropdownMenu({
                    options: [createNewItem(), createOpenItem(), createRenameItem({ disabled: true })],
                    open: true
                })}
            </div>
            <div>
                {createDropdownMenu({
                    options: [createNewItem(), createOpenItem(), createRenameItem({ disabled: true })],
                    size: "large",
                    open: true
                })}
            </div>
        </div>
    )
    .add("description", () =>
        <div className="flex flex-column">
            <div style={{ marginBottom: "150px" }}>
                {createDropdownMenu({
                    options: [createNewItem(), createOpenItem(), createRenameItem({ description: "To infinite and beyond!" })],
                    size: "small",
                    open: true
                })}
            </div>
            <div style={{ marginBottom: "200px" }}>
                {createDropdownMenu({
                    options: [createNewItem(), createOpenItem(), createRenameItem({ description: "To infinite and beyond!" })],
                    open: true
                })}
            </div>
            <div>
                {createDropdownMenu({
                    options: [createNewItem(), createOpenItem(), createRenameItem({ description: "To infinite and beyond!" })],
                    size: "large",
                    open: true
                })}
            </div>
        </div>
    )
    .add("icon", () =>
        <div className="flex flex-column">
            <div style={{ marginBottom: "150px" }}>
                {createDropdownMenu({
                    options: [createNewItem(), createOpenItem(), createRenameItem({ icon: <EditIcon /> })],
                    size: "small",
                    open: true
                })}
            </div>
            <div style={{ marginBottom: "200px" }}>
                {createDropdownMenu({
                    options: [createNewItem(), createOpenItem(), createRenameItem({ icon: <EditIcon /> })],
                    open: true
                })}
            </div>
            <div style={{ marginBottom: "200px" }}>
                {createDropdownMenu({
                    options: [createNewItem(), createOpenItem(), createRenameItem({ icon: <EditIcon /> })],
                    size: "large",
                    open: true
                })}
            </div>
            <div>
                {createDropdownMenu({
                    options: [createNewItem(), createOpenItem(), createRenameItem({ icon: <EditIcon />, disabled: true })],
                    defaultOpen: true
                })}
            </div>
        </div>
    )
    .add("link", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createDropdownMenu({
                    options: [createNewItem(), createOpenItem(), createRenameItem({ as: "a", href: "https://www.google.com", target: "_blank" })],
                    size: "small",
                    open: true,
                    style: { marginRight: "100px" }
                })}
                {createDropdownMenu({
                    options: [createNewItem(), createOpenItem(), createRenameItem({ as: "a", href: "https://www.google.com", target: "_blank", icon: <EditIcon /> })],
                    size: "small",
                    open: true,
                    style: { marginRight: "125px" }
                })}
                {createDropdownMenu({
                    options: [createNewItem(), createOpenItem(), createRenameItem({ as: "a", href: "https://www.google.com", target: "_blank", disabled: true })],
                    size: "small",
                    open: true
                })}
            </div>
            <div className="flex" style={{ marginBottom: "200px" }}>
                {createDropdownMenu({
                    options: [createNewItem(), createOpenItem(), createRenameItem({ as: "a", href: "https://www.google.com", target: "_blank" })],
                    open: true,
                    style: { marginRight: "100px" }
                })}
                {createDropdownMenu({
                    options: [createNewItem(), createOpenItem(), createRenameItem({ as: "a", href: "https://www.google.com", target: "_blank", icon: <EditIcon /> })],
                    open: true,
                    style: { marginRight: "125px" }
                })}
                {createDropdownMenu({
                    options: [createNewItem(), createOpenItem(), createRenameItem({ as: "a", href: "https://www.google.com", target: "_blank", disabled: true })],
                    open: true
                })}
            </div>
            <div className="flex">
                {createDropdownMenu({
                    options: [createNewItem(), createOpenItem(), createRenameItem({ as: "a", href: "https://www.google.com", target: "_blank" })],
                    size: "large",
                    open: true,
                    style: { marginRight: "100px" }
                })}
                {createDropdownMenu({
                    options: [createNewItem(), createOpenItem(), createRenameItem({ as: "a", href: "https://www.google.com", target: "_blank", icon: <EditIcon /> })],
                    size: "large",
                    open: true,
                    style: { marginRight: "125px" }
                })}
                {createDropdownMenu({
                    options: [createNewItem(), createOpenItem(), createRenameItem({ as: "a", href: "https://www.google.com", target: "_blank", disabled: true })],
                    size: "large",
                    open: true
                })}
            </div>
        </div>
    );
