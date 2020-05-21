import { AddIcon, EditIcon, FileIcon, VerticalDotsIcon } from "@react-components/icons";
import { Button } from "@react-components/button";
import { DropdownMenu, dropdownMenuButtonItem, dropdownMenuLinkItem } from "@react-components/dropdown-menu";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { isNil, noop } from "lodash";

const createNewItem = (props = {}) => {
    return dropdownMenuLinkItem("New", "https://www.sharegate.com", {
        target: "_blank",
        ...props
    });
};

const createOpenItem = (props = {}) => {
    return dropdownMenuLinkItem("Open...", "https://www.sharegate.com", {
        target: "_blank",
        ...props
    });
};

const createRenameItem = (props = {}) => {
    return dropdownMenuLinkItem("Rename...", "https://www.sharegate.com", {
        target: "_blank",
        ...props
    });
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
    return storiesOfBuilder(module, createChromaticSection("DropdownMenu"))
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

stories()
    .add("text", () =>
        <div className="flex">
            <div className="flex flex-column">
                <div className="flex" style={{ marginBottom: "150px" }}>
                    {createDropdownMenu({
                        size: "small",
                        wrapperClassName: "mr5"
                    })}
                    {createDropdownMenu({
                        size: "small",
                        defaultOpen: true,
                        focusFirstItemOnOpen: false
                    })}
                </div>
                <div className="flex" style={{ marginBottom: "200px" }}>
                    {createDropdownMenu({
                        wrapperClassName: "mr5"
                    })}
                    {createDropdownMenu({
                        defaultOpen: true,
                        focusFirstItemOnOpen: false
                    })}
                </div>
                <div className="flex">
                    {createDropdownMenu({
                        size: "large",
                        wrapperClassName: "mr5"
                    })}
                    {createDropdownMenu({
                        size: "large",
                        defaultOpen: true,
                        focusFirstItemOnOpen: false
                    })}
                </div>
            </div>
            <div className="flex flex-column">
                <div className="flex">
                    {createDropdownMenu({
                        focus: true
                    })}
                </div>
            </div>
        </div>
    )
    .add("trigger", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "200px" }}>
                {createDropdownMenu({
                    trigger: <AddIcon />,
                    style: { marginRight: "150px" }
                })}
                {createDropdownMenu({
                    trigger: <AddIcon />,
                    size: "small",
                    defaultOpen: true,
                    focusFirstItemOnOpen: false,
                    style: { marginRight: "200px" }
                })}
                {createDropdownMenu({
                    trigger: <AddIcon />,
                    defaultOpen: true,
                    focusFirstItemOnOpen: false,
                    style: { marginRight: "200px" }
                })}
                {createDropdownMenu({
                    trigger: <AddIcon />,
                    size: "large",
                    defaultOpen: true,
                    focusFirstItemOnOpen: false
                })}
            </div>
            <div className="flex" style={{ marginBottom: "200px" }}>
                {createDropdownMenu({
                    trigger: <Button circular secondary icon={<VerticalDotsIcon />} />,
                    style: { marginRight: "150px" }
                })}
                {createDropdownMenu({
                    trigger: <Button circular secondary icon={<VerticalDotsIcon />} />,
                    size: "small",
                    defaultOpen: true,
                    focusFirstItemOnOpen: false,
                    style: { marginRight: "200px" }
                })}
                {createDropdownMenu({
                    trigger: <Button circular secondary icon={<VerticalDotsIcon />} />,
                    defaultOpen: true,
                    focusFirstItemOnOpen: false,
                    style: { marginRight: "200px" }
                })}
                {createDropdownMenu({
                    trigger: <Button circular secondary icon={<VerticalDotsIcon />} />,
                    size: "large",
                    defaultOpen: true,
                    focusFirstItemOnOpen: false
                })}
            </div>
            <div className="flex">
                {createDropdownMenu({
                    trigger: <Button>Open</Button>,
                    style: { marginRight: "150px" }
                })}
                {createDropdownMenu({
                    trigger: <Button>Open</Button>,
                    size: "small",
                    defaultOpen: true,
                    focusFirstItemOnOpen: false,
                    style: { marginRight: "200px" }
                })}
                {createDropdownMenu({
                    trigger: <Button>Open</Button>,
                    defaultOpen: true,
                    focusFirstItemOnOpen: false,
                    style: { marginRight: "200px" }
                })}
                {createDropdownMenu({
                    trigger: <Button>Open</Button>,
                    size: "large",
                    defaultOpen: true,
                    focusFirstItemOnOpen: false
                })}
            </div>
        </div>
    )
    .add("focus first item on open", () =>
        createDropdownMenu({
            defaultOpen: true
        })
    )
    .add("icon", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createDropdownMenu({
                    icon: <FileIcon />,
                    size: "small",
                    wrapperClassName: "mr5"
                })}
                {createDropdownMenu({
                    icon: <FileIcon />,
                    size: "small",
                    defaultOpen: true,
                    focusFirstItemOnOpen: false
                })}
            </div>
            <div className="flex" style={{ marginBottom: "200px" }}>
                {createDropdownMenu({
                    icon: <FileIcon />,
                    wrapperClassName: "mr5"
                })}
                {createDropdownMenu({
                    icon: <FileIcon />,
                    defaultOpen: true,
                    focusFirstItemOnOpen: false
                })}
            </div>
            <div className="flex">
                {createDropdownMenu({
                    icon: <FileIcon />,
                    size: "large",
                    wrapperClassName: "mr5"
                })}
                {createDropdownMenu({
                    icon: <FileIcon />,
                    size: "large",
                    defaultOpen: true,
                    focusFirstItemOnOpen: false
                })}
            </div>
        </div>
    )
    .add("scrolling", () =>
        createDropdownMenu({
            scrolling: true,
            options: [
                dropdownMenuLinkItem("1", "1"),
                dropdownMenuLinkItem("2", "2"),
                dropdownMenuLinkItem("3", "3"),
                dropdownMenuLinkItem("4", "4"),
                dropdownMenuLinkItem("5", "5"),
                dropdownMenuLinkItem("6", "6"),
                dropdownMenuLinkItem("7", "7"),
                dropdownMenuLinkItem("8", "8"),
                dropdownMenuLinkItem("9", "9"),
                dropdownMenuLinkItem("10", "10"),
                dropdownMenuLinkItem("11", "11")
            ],
            defaultOpen: true,
            focusFirstItemOnOpen: false
        })
    )
    .add("direction", () =>
        <div className="flex">
            <div className="flex flex-column mr12">
                {createDropdownMenu({
                    direction: "left",
                    size: "small",
                    defaultOpen: true,
                    focusFirstItemOnOpen: false,
                    style: { marginBottom: "150px" }
                })}
                {createDropdownMenu({
                    direction: "left",
                    defaultOpen: true,
                    focusFirstItemOnOpen: false,
                    style: { marginBottom: "200px" }
                })}
                {createDropdownMenu({
                    direction: "left",
                    size: "large",
                    defaultOpen: true,
                    focusFirstItemOnOpen: false
                })}
            </div>
            <div className="flex flex-column">
                {createDropdownMenu({
                    direction: "right",
                    size: "small",
                    defaultOpen: true,
                    focusFirstItemOnOpen: false,
                    style: { marginBottom: "150px" }
                })}
                {createDropdownMenu({
                    direction: "right",
                    defaultOpen: true,
                    focusFirstItemOnOpen: false,
                    style: { marginBottom: "200px" }
                })}
                {createDropdownMenu({
                    direction: "right",
                    size: "large",
                    defaultOpen: true,
                    focusFirstItemOnOpen: false
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
                    focusFirstItemOnOpen: false,
                    style: { marginRight: "200px" }
                })}
                {createDropdownMenu({
                    upward: true,
                    defaultOpen: true,
                    focusFirstItemOnOpen: false,
                    style: { marginRight: "200px" }
                })}
                {createDropdownMenu({
                    upward: true,
                    size: "large",
                    defaultOpen: true,
                    focusFirstItemOnOpen: false
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
                    focusFirstItemOnOpen: false,
                    style: { marginBottom: "200px" }
                })}
                {createDropdownMenu({
                    fluid: true,
                    defaultOpen: true,
                    focusFirstItemOnOpen: false,
                    style: { marginBottom: "200px" }
                })}
                {createDropdownMenu({
                    size: "large",
                    fluid: true,
                    defaultOpen: true,
                    focusFirstItemOnOpen: false
                })}
            </div>
        </div>
    )
    .add("styling", () =>
        <div className="flex">
            {createDropdownMenu({
                wrapperClassName: "border-red mr5"
            })}
            {createDropdownMenu({
                wrapperClassName: "mr5",
                wrapperStyle: {
                    border: "1px solid red"
                }
            })}
            {createDropdownMenu({
                wrapperClassName: "mr5",
                className: "border-red"
            })}
            {createDropdownMenu({
                style: {
                    border: "1px solid red"
                }
            })}
        </div>
    );

stories("/item")
    .add("default", () =>
        <div className="flex flex-column">
            <div style={{ marginBottom: "150px" }}>
                {createDropdownMenu({
                    size: "small",
                    defaultOpen: true,
                    focusFirstItemOnOpen: false
                })}
            </div>
            <div style={{ marginBottom: "200px" }}>
                {createDropdownMenu({
                    defaultOpen: true,
                    focusFirstItemOnOpen: false
                })}
            </div>
            <div>
                {createDropdownMenu({
                    size: "large",
                    defaultOpen: true,
                    focusFirstItemOnOpen: false
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
                    defaultOpen: true,
                    focusFirstItemOnOpen: false
                })}
            </div>
            <div style={{ marginBottom: "200px" }}>
                {createDropdownMenu({
                    options: [createNewItem(), createOpenItem(), createRenameItem({ active: true })],
                    defaultOpen: true,
                    focusFirstItemOnOpen: false
                })}
            </div>
            <div>
                {createDropdownMenu({
                    options: [createNewItem(), createOpenItem(), createRenameItem({ active: true })],
                    size: "large",
                    defaultOpen: true,
                    focusFirstItemOnOpen: false
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
                    defaultOpen: true,
                    focusFirstItemOnOpen: false
                })}
            </div>
            <div style={{ marginBottom: "200px" }}>
                {createDropdownMenu({
                    options: [createNewItem(), createOpenItem(), createRenameItem({ disabled: true })],
                    defaultOpen: true,
                    focusFirstItemOnOpen: false
                })}
            </div>
            <div>
                {createDropdownMenu({
                    options: [createNewItem(), createOpenItem(), createRenameItem({ disabled: true })],
                    size: "large",
                    defaultOpen: true,
                    focusFirstItemOnOpen: false
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
                    defaultOpen: true,
                    focusFirstItemOnOpen: false
                })}
            </div>
            <div style={{ marginBottom: "200px" }}>
                {createDropdownMenu({
                    options: [createNewItem(), createOpenItem(), createRenameItem({ description: "To infinite and beyond!" })],
                    defaultOpen: true,
                    focusFirstItemOnOpen: false
                })}
            </div>
            <div>
                {createDropdownMenu({
                    options: [createNewItem(), createOpenItem(), createRenameItem({ description: "To infinite and beyond!" })],
                    size: "large",
                    defaultOpen: true,
                    focusFirstItemOnOpen: false
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
                    defaultOpen: true,
                    focusFirstItemOnOpen: false
                })}
            </div>
            <div style={{ marginBottom: "200px" }}>
                {createDropdownMenu({
                    options: [createNewItem(), createOpenItem(), createRenameItem({ icon: <EditIcon /> })],
                    defaultOpen: true,
                    focusFirstItemOnOpen: false
                })}
            </div>
            <div style={{ marginBottom: "200px" }}>
                {createDropdownMenu({
                    options: [createNewItem(), createOpenItem(), createRenameItem({ icon: <EditIcon /> })],
                    size: "large",
                    defaultOpen: true,
                    focusFirstItemOnOpen: false
                })}
            </div>
            <div>
                {createDropdownMenu({
                    options: [createNewItem(), createOpenItem(), createRenameItem({ icon: <EditIcon />, disabled: true })],
                    defaultOpen: true,
                    focusFirstItemOnOpen: false
                })}
            </div>
        </div>
    )
    .add("button", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                {createDropdownMenu({
                    options: [dropdownMenuButtonItem("New", () => { console.log("Clicked"); }), dropdownMenuButtonItem("Open...", noop), dropdownMenuButtonItem("Rename...", noop)],
                    size: "small",
                    defaultOpen: true,
                    focusFirstItemOnOpen: false,
                    style: { marginRight: "200px" }
                })}
                {createDropdownMenu({
                    options: [dropdownMenuButtonItem("New", noop), dropdownMenuButtonItem("Open...", noop), dropdownMenuButtonItem("Rename...", noop, { icon: <EditIcon /> })],
                    size: "small",
                    defaultOpen: true,
                    focusFirstItemOnOpen: false,
                    style: { marginRight: "200px" }
                })}
                {createDropdownMenu({
                    options: [dropdownMenuButtonItem("New", noop), dropdownMenuButtonItem("Open...", noop), dropdownMenuButtonItem("Rename...", noop, { disabled: true })],
                    size: "small",
                    defaultOpen: true,
                    focusFirstItemOnOpen: false
                })}
            </div>
            <div className="flex" style={{ marginBottom: "200px" }}>
                {createDropdownMenu({
                    options: [dropdownMenuButtonItem("New", noop), dropdownMenuButtonItem("Open...", noop), dropdownMenuButtonItem("Rename...", noop)],
                    defaultOpen: true,
                    focusFirstItemOnOpen: false,
                    style: { marginRight: "200px" }
                })}
                {createDropdownMenu({
                    options: [dropdownMenuButtonItem("New", noop), dropdownMenuButtonItem("Open...", noop), dropdownMenuButtonItem("Rename...", noop, { icon: <EditIcon /> })],
                    defaultOpen: true,
                    focusFirstItemOnOpen: false,
                    style: { marginRight: "200px" }
                })}
                {createDropdownMenu({
                    options: [dropdownMenuButtonItem("New", noop), dropdownMenuButtonItem("Open...", noop), dropdownMenuButtonItem("Rename...", noop, { disabled: true })],
                    defaultOpen: true,
                    focusFirstItemOnOpen: false
                })}
            </div>
            <div className="flex">
                {createDropdownMenu({
                    options: [dropdownMenuButtonItem("New", noop), dropdownMenuButtonItem("Open...", noop), dropdownMenuButtonItem("Rename...", noop)],
                    size: "large",
                    defaultOpen: true,
                    focusFirstItemOnOpen: false,
                    style: { marginRight: "200px" }
                })}
                {createDropdownMenu({
                    options: [dropdownMenuButtonItem("New", noop), dropdownMenuButtonItem("Open...", noop), dropdownMenuButtonItem("Rename...", noop, { icon: <EditIcon /> })],
                    size: "large",
                    defaultOpen: true,
                    focusFirstItemOnOpen: false,
                    style: { marginRight: "200px" }
                })}
                {createDropdownMenu({
                    options: [dropdownMenuButtonItem("New", noop), dropdownMenuButtonItem("Open...", noop), dropdownMenuButtonItem("Rename...", noop, { disabled: true })],
                    size: "large",
                    defaultOpen: true,
                    focusFirstItemOnOpen: false
                })}
            </div>
        </div>
    );
