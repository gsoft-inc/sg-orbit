import { Button } from "@react-components/button";
import { Dropdown, DropdownContext } from "@react-components/dropdown";
import { EditIcon, FileIcon, LightbulbIcon, VerticalDotsIcon } from "@react-components/icons";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { forwardRef, useContext } from "react";
import { isNil, noop } from "lodash";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Dropdown"))
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

function SimpleDropdown({
    title = "File",
    header,
    ...rest
}) {
    return (
        <Dropdown
            {...rest}
            title={title}
        >
            {header && header}
            <Dropdown.Item>New</Dropdown.Item>
            <Dropdown.Item>Open...</Dropdown.Item>
            <Dropdown.Item>Save as...</Dropdown.Item>
        </Dropdown>
    );
}

function TriggerLessDropdown(props) {
    return (
        <Dropdown {...props}>
            <Dropdown.Item>New</Dropdown.Item>
            <Dropdown.Item>Open...</Dropdown.Item>
            <Dropdown.Item>Save as...</Dropdown.Item>
        </Dropdown>
    );
}

function DividedDropdown({
    title = "File",
    ...rest
}) {
    return (
        <Dropdown
            {...rest}
            title={title}
        >
            <Dropdown.Item>New</Dropdown.Item>
            <Dropdown.Item>Open...</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Save as...</Dropdown.Item>
            <Dropdown.Item>Rename</Dropdown.Item>
        </Dropdown>
    );
}

function setRedBackground(element) {
    if (!isNil(element)) {
        element.classList.add("bg-red");
    }
}

const CustomTrigger = forwardRef((props, ref) => {
    const { isOpen } = useContext(DropdownContext);

    return (
        <Button
            {...props}
            circular
            primary={isOpen}
            secondary={!isOpen}
            icon={<VerticalDotsIcon />}
            ref={ref}
        />
    );
});

stories()
    .add("default", () =>
        <SimpleDropdown />
    )
    .add("open", () =>
        <SimpleDropdown open />
    )
    .add("default open", () =>
        <SimpleDropdown defaultOpen />
    )
    .add("title trigger", () =>
        <div className="flex">
            <div className="flex flex-column" style={{ marginRight: "300px" }}>
                <div className="flex" style={{ marginBottom: "150px" }}>
                    <SimpleDropdown
                        size="small"
                        className="mr5"
                    />
                    <SimpleDropdown
                        size="small"
                        open
                    />
                </div>
                <div className="flex" style={{ marginBottom: "200px" }}>
                    <SimpleDropdown className="mr5" />
                    <SimpleDropdown open />
                </div>
                <div className="flex">
                    <SimpleDropdown
                        size="large"
                        className="mr5"
                    />
                    <SimpleDropdown
                        size="large"
                        open
                    />
                </div>
            </div>
            <div className="flex flex-column">
                <div className="flex">
                    <SimpleDropdown
                        active
                        className="mr5"
                    />
                    <SimpleDropdown
                        focus
                        className="mr5"
                    />
                    <SimpleDropdown
                        hover
                        className="mr5"
                    />
                    <SimpleDropdown
                        focus
                        hover
                    />
                </div>
            </div>
        </div>
    )
    .add("title trigger icon", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                <SimpleDropdown
                    icon={<FileIcon />}
                    size="small"
                    className="mr5"
                />
                <SimpleDropdown
                    icon={<FileIcon />}
                    size="small"
                    open
                />
            </div>
            <div className="flex" style={{ marginBottom: "200px" }}>
                <SimpleDropdown
                    icon={<FileIcon />}
                    className="mr5"
                />
                <SimpleDropdown
                    icon={<FileIcon />}
                    open
                />
            </div>
            <div className="flex">
                <SimpleDropdown
                    icon={<FileIcon />}
                    size="large"
                    className="mr5"
                />
                <SimpleDropdown
                    icon={<FileIcon />}
                    size="large"
                    open
                />
            </div>
        </div>
    )
    .add("basic trigger", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "200px" }}>
                <TriggerLessDropdown
                    trigger={<Button circular secondary icon={<VerticalDotsIcon />} />}
                    style={{ marginRight: "150px" }}
                />
                <TriggerLessDropdown
                    trigger={<Button circular secondary icon={<VerticalDotsIcon />} />}
                    size="small"
                    open
                    style={{ marginRight: "200px" }}
                />
                <TriggerLessDropdown
                    trigger={<Button circular secondary icon={<VerticalDotsIcon />} />}
                    open
                    style={{ marginRight: "200px" }}
                />
                <TriggerLessDropdown
                    trigger={<Button circular secondary icon={<VerticalDotsIcon />} />}
                    size="large"
                    open
                />
            </div>
            <div className="flex" style={{ marginBottom: "200px" }}>
                <TriggerLessDropdown
                    trigger={<Button>Open</Button>}
                    style={{ marginRight: "150px" }}
                />
                <TriggerLessDropdown
                    trigger={<Button>Open</Button>}
                    size="small"
                    open
                    style={{ marginRight: "200px" }}
                />
                <TriggerLessDropdown
                    trigger={<Button>Open</Button>}
                    open
                    style={{ marginRight: "200px" }}
                />
                <TriggerLessDropdown
                    trigger={<Button>Open</Button>}
                    size="large"
                    open
                />
            </div>
            <div className="w-100" style={{ marginBottom: "50px" }}>
                <TriggerLessDropdown
                    trigger={<Button>Open</Button>}
                    fluid
                    className="mr5"
                />
            </div>
            <div className="flex">
                <TriggerLessDropdown
                    trigger={<Button circular secondary icon={<VerticalDotsIcon />} />}
                    active
                    className="mr5"
                />
                <TriggerLessDropdown
                    trigger={<Button circular secondary icon={<VerticalDotsIcon />} />}
                    focus
                    className="mr5"
                />
                <TriggerLessDropdown
                    trigger={<Button circular secondary icon={<VerticalDotsIcon />} />}
                    hover
                    className="mr5"
                />
                <TriggerLessDropdown
                    trigger={<Button circular secondary icon={<VerticalDotsIcon />} />}
                    focus
                    hover
                />
            </div>
        </div>
    )
    .add("advanced trigger", () =>
        <div className="flex">
            <TriggerLessDropdown
                trigger={<CustomTrigger />}
                style={{ marginRight: "200px" }}
            />
            <TriggerLessDropdown
                trigger={<CustomTrigger />}
                open
            />
        </div>
    )
    .add("scrolling", () =>
        <Dropdown
            title="Task"
            scrolling
            open
        >
            <Dropdown.Item>1</Dropdown.Item>
            <Dropdown.Item>2</Dropdown.Item>
            <Dropdown.Item>3</Dropdown.Item>
            <Dropdown.Item>4</Dropdown.Item>
            <Dropdown.Item>5</Dropdown.Item>
            <Dropdown.Item>6</Dropdown.Item>
            <Dropdown.Item>7</Dropdown.Item>
            <Dropdown.Item>8</Dropdown.Item>
            <Dropdown.Item>9</Dropdown.Item>
            <Dropdown.Item>10</Dropdown.Item>
            <Dropdown.Item>11</Dropdown.Item>
        </Dropdown>
    )
    .add("upward", () =>
        <div className="flex flex-column">
            <div style={{ marginTop: "150px" }}>
                <SimpleDropdown
                    upward
                    size="small"
                    open
                    style={{ marginRight: "200px" }}
                />
                <SimpleDropdown
                    upward
                    open
                    style={{ marginRight: "200px" }}
                />
                <SimpleDropdown
                    upward
                    size="large"
                    open
                />
            </div>
        </div>
    )
    .add("direction", () =>
        <div className="flex">
            <div className="flex flex-column mr12">
                <SimpleDropdown
                    direction="left"
                    size="small"
                    open
                    style={{ marginBottom: "150px" }}
                />
                <SimpleDropdown
                    direction="left"
                    open
                    style={{ marginBottom: "200px" }}
                />
                <SimpleDropdown
                    direction="left"
                    size="large"
                    open
                />
            </div>
            <div className="flex flex-column">
                <SimpleDropdown
                    direction="right"
                    size="small"
                    open
                    style={{ marginBottom: "150px" }}
                />
                <SimpleDropdown
                    direction="right"
                    open
                    style={{ marginBottom: "200px" }}
                />
                <SimpleDropdown
                    direction="right"
                    size="large"
                    open
                />
            </div>
        </div>
    )
    .add("fluid", () =>
        <div className="flex">
            <div className="flex flex-column w-50 mr12">
                <SimpleDropdown
                    size="small"
                    fluid
                    style={{ marginBottom: "200px" }}
                />
                <SimpleDropdown
                    fluid
                    style={{ marginBottom: "200px" }}
                />
                <SimpleDropdown
                    size="large"
                    fluid
                />
            </div>
            <div className="flex flex-column w-50">
                <SimpleDropdown
                    size="small"
                    fluid
                    open
                    style={{ marginBottom: "200px" }}
                />
                <SimpleDropdown
                    fluid
                    open
                    style={{ marginBottom: "200px" }}
                />
                <SimpleDropdown
                    size="large"
                    fluid
                    open
                />
            </div>
        </div>
    )
    .add("header", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "200px" }}>
                <SimpleDropdown
                    header={<Dropdown.Header>Quick Actions</Dropdown.Header>}
                    open
                    size="small"
                    style={{ marginRight: "200px" }}
                />
                <SimpleDropdown
                    header={<Dropdown.Header icon={<LightbulbIcon />}>Quick Actions</Dropdown.Header>}
                    open
                    size="small"
                />
            </div>
            <div className="flex" style={{ marginBottom: "200px" }}>
                <SimpleDropdown
                    header={<Dropdown.Header>Quick Actions</Dropdown.Header>}
                    open
                    style={{ marginRight: "200px" }}
                />
                <SimpleDropdown
                    header={<Dropdown.Header icon={<LightbulbIcon />}>Quick Actions</Dropdown.Header>}
                    open
                />
            </div>
            <div className="flex">
                <SimpleDropdown
                    header={<Dropdown.Header>Quick Actions</Dropdown.Header>}
                    open
                    size="large"
                    style={{ marginRight: "200px" }}
                />
                <SimpleDropdown
                    header={<Dropdown.Header icon={<LightbulbIcon />}>Quick Actions</Dropdown.Header>}
                    open
                    size="large"
                />
            </div>
        </div>
    )
    .add("divider", () =>
        <div className="flex">
            <DividedDropdown
                size="small"
                open
                style={{ marginRight: "200px" }}
            />
            <DividedDropdown
                open
                style={{ marginRight: "200px" }}
            />
            <DividedDropdown
                size="large"
                open
                style={{ marginRight: "200px" }}
            />
        </div>
    )
    .add("interaction states", () =>
        <div className="flex flex-column">
            <div className="flex mb5">
                <SimpleDropdown active className="mr5" />
                <SimpleDropdown focus />
            </div>
            <div className="flex">
                <SimpleDropdown hover className="mr5" />
                <SimpleDropdown focus hover />
            </div>
        </div>
    )
    .add("disabled", () =>
        <SimpleDropdown disabled />
    )
    .add("styling", () =>
        <div className="flex">
            <SimpleDropdown
                className="border-red mr5"
            />
            <SimpleDropdown
                style={{
                    border: "1px solid red"
                }}
            />
        </div>
    )
    .add("custom menu component", () =>
        <div className="flex">
            <SimpleDropdown
                menu={<Dropdown.Menu className="border-red" />}
                open
                style={{ marginRight: "200px" }}
            />
            <SimpleDropdown
                menu={<Dropdown.Menu ref={setRedBackground} />}
                open
                style={{ marginRight: "200px" }}
            />
            <SimpleDropdown
                menu={{ className: "border-red" }}
                open
                style={{ marginRight: "200px" }}
            />
            <SimpleDropdown
                menu={{ className: "border-red", ref: setRedBackground }}
                open
            />
        </div>
    )
    .add("item interaction states", () =>
        <div className="flex">
            <Dropdown
                title="Task"
                open
                style={{ marginRight: "200px" }}
            >
                <Dropdown.Item active>New</Dropdown.Item>
                <Dropdown.Item focus>Open...</Dropdown.Item>
                <Dropdown.Item hover>Save as...</Dropdown.Item>
                <Dropdown.Item focus hover>Rename</Dropdown.Item>
            </Dropdown>
        </div>
    )
    .add("item disabled", () =>
        <Dropdown
            title="Task"
            open
            style={{ marginRight: "200px" }}
        >
            <Dropdown.Item>New</Dropdown.Item>
            <Dropdown.Item>Open...</Dropdown.Item>
            <Dropdown.Item disabled>Save as...</Dropdown.Item>
        </Dropdown>
    )
    .add("item description", () =>
        <div className="flex">
            <Dropdown
                title="Task"
                size="small"
                open
                style={{ marginRight: "200px" }}
            >
                <Dropdown.Item>New</Dropdown.Item>
                <Dropdown.Item>Open...</Dropdown.Item>
                <Dropdown.Item description="To infinite and beyond!">Save as...</Dropdown.Item>
            </Dropdown>
            <Dropdown
                title="Task"
                open
                style={{ marginRight: "200px" }}
            >
                <Dropdown.Item>New</Dropdown.Item>
                <Dropdown.Item>Open...</Dropdown.Item>
                <Dropdown.Item description="To infinite and beyond!">Save as...</Dropdown.Item>
            </Dropdown>
            <Dropdown
                title="Task"
                size="large"
                open
            >
                <Dropdown.Item>New</Dropdown.Item>
                <Dropdown.Item>Open...</Dropdown.Item>
                <Dropdown.Item description="To infinite and beyond!">Save as...</Dropdown.Item>
            </Dropdown>
        </div>
    )
    .add("item icon", () =>
        <div className="flex">
            <Dropdown
                title="Task"
                size="small"
                open
                style={{ marginRight: "200px" }}
            >
                <Dropdown.Item>New</Dropdown.Item>
                <Dropdown.Item icon={<EditIcon />}>Open...</Dropdown.Item>
                <Dropdown.Item>Save as...</Dropdown.Item>
            </Dropdown>
            <Dropdown
                title="Task"
                open
                style={{ marginRight: "200px" }}
            >
                <Dropdown.Item>New</Dropdown.Item>
                <Dropdown.Item icon={<EditIcon />}>Open...</Dropdown.Item>
                <Dropdown.Item>Save as...</Dropdown.Item>
            </Dropdown>
            <Dropdown
                title="Task"
                size="large"
                open
                style={{ marginRight: "200px" }}
            >
                <Dropdown.Item>New</Dropdown.Item>
                <Dropdown.Item icon={<EditIcon />}>Open...</Dropdown.Item>
                <Dropdown.Item>Save as...</Dropdown.Item>
            </Dropdown>
            <Dropdown
                title="Task"
                open
            >
                <Dropdown.Item>New</Dropdown.Item>
                <Dropdown.Item icon={<EditIcon />} disabled>Open...</Dropdown.Item>
                <Dropdown.Item>Save as...</Dropdown.Item>
            </Dropdown>
        </div>
    )
    .add("item button", () =>
        <div className="flex">
            <Dropdown
                title="Task"
                size="small"
                open
                style={{ marginRight: "200px" }}
            >
                <Dropdown.ButtonItem onClick={noop}>New</Dropdown.ButtonItem>
                <Dropdown.ButtonItem onClick={noop}>Open...</Dropdown.ButtonItem>
                <Dropdown.ButtonItem onClick={noop}>Save as...</Dropdown.ButtonItem>
            </Dropdown>
            <Dropdown
                title="Task"
                open
                style={{ marginRight: "200px" }}
            >
                <Dropdown.ButtonItem onClick={noop}>New</Dropdown.ButtonItem>
                <Dropdown.ButtonItem onClick={noop}>Open...</Dropdown.ButtonItem>
                <Dropdown.ButtonItem onClick={noop}>Save as...</Dropdown.ButtonItem>
            </Dropdown>
            <Dropdown
                title="Task"
                size="large"
                open
            >
                <Dropdown.ButtonItem onClick={noop}>New</Dropdown.ButtonItem>
                <Dropdown.ButtonItem onClick={noop}>Open...</Dropdown.ButtonItem>
                <Dropdown.ButtonItem onClick={noop}>Save as...</Dropdown.ButtonItem>
            </Dropdown>
        </div>
    )
    .add("item link", () =>
        <div className="flex">
            <Dropdown
                title="Task"
                size="small"
                open
                style={{ marginRight: "200px" }}
            >
                <Dropdown.LinkItem href="https://www.sharegate.com" target="_blank">New</Dropdown.LinkItem>
                <Dropdown.LinkItem href="https://www.sharegate.com" target="_blank">Open...</Dropdown.LinkItem>
                <Dropdown.LinkItem href="https://www.sharegate.com" target="_blank">Save as...</Dropdown.LinkItem>
            </Dropdown>
            <Dropdown
                title="Task"
                open
                style={{ marginRight: "200px" }}
            >
                <Dropdown.LinkItem href="https://www.sharegate.com" target="_blank">New</Dropdown.LinkItem>
                <Dropdown.LinkItem href="https://www.sharegate.com" target="_blank">Open...</Dropdown.LinkItem>
                <Dropdown.LinkItem href="https://www.sharegate.com" target="_blank">Save as...</Dropdown.LinkItem>
            </Dropdown>
            <Dropdown
                title="Task"
                size="large"
                open
            >
                <Dropdown.LinkItem href="https://www.sharegate.com" target="_blank">New</Dropdown.LinkItem>
                <Dropdown.LinkItem href="https://www.sharegate.com" target="_blank">Open...</Dropdown.LinkItem>
                <Dropdown.LinkItem href="https://www.sharegate.com" target="_blank">Save as...</Dropdown.LinkItem>
            </Dropdown>
        </div>
    );
