import { Button } from "@react-components/button";
import { Dropdown, DropdownContext } from "@react-components/dropdown";
import { EditIcon, FileIcon, IconGroup, LightbulbIcon, VerticalDotsIcon } from "@react-components/icons";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { forwardRef, useContext } from "react";
import { noop } from "lodash";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Dropdown"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%", height: "800px" })
            .chromaticDelay(100)
            .chromaticPauseAnimationAtEnd()
            .build())
        .build();
}

const CustomTrigger = forwardRef((props, ref) => {
    const { isOpen } = useContext(DropdownContext);

    return (
        <Button
            {...props}
            primary={isOpen}
            secondary={!isOpen}
            ref={ref}
        />
    );
});

function BasicDropdown({ icon, active, focus, hover, disabled, children, ...rest }) {
    return (
        <Dropdown {...rest}>
            <Dropdown.BasicTrigger
                icon={icon}
                active={active}
                focus={focus}
                hover={hover}
                disabled={disabled}
            >
                File
            </Dropdown.BasicTrigger>
            <Dropdown.Menu>
                {children || (
                    <>
                        <Dropdown.Item>New</Dropdown.Item>
                        <Dropdown.Item>Open...</Dropdown.Item>
                        <Dropdown.Item>Save as...</Dropdown.Item>
                    </>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
}

function BasicButtonDropdown({ active, focus, hover, ...rest }) {
    return (
        <Dropdown {...rest}>
            <Dropdown.Trigger
                as={Button}
                active={active}
                focus={focus}
                hover={hover}
            >
                Open
            </Dropdown.Trigger>
            <Dropdown.Menu>
                <Dropdown.Item>New</Dropdown.Item>
                <Dropdown.Item>Open...</Dropdown.Item>
                <Dropdown.Item>Save as...</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

function CircularButtonDropdown({ active, focus, hover, ...rest }) {
    return (
        <Dropdown {...rest}>
            <Dropdown.Trigger
                as={Button}
                circular
                secondary
                icon={<VerticalDotsIcon />}
                active={active}
                focus={focus}
                hover={hover}
            />
            <Dropdown.Menu>
                <Dropdown.Item>New</Dropdown.Item>
                <Dropdown.Item>Open...</Dropdown.Item>
                <Dropdown.Item>Save as...</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

function CustomTriggerDropdown(props) {
    return (
        <Dropdown {...props}>
            <Dropdown.Trigger as={CustomTrigger} circular icon={<VerticalDotsIcon />} />
            <Dropdown.Menu>
                <Dropdown.Item>New</Dropdown.Item>
                <Dropdown.Item>Open...</Dropdown.Item>
                <Dropdown.Item>Save as...</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

stories()
    .add("default", () =>
        <BasicDropdown />
    )
    .add("open", () =>
        <BasicDropdown open />
    )
    .add("default open", () =>
        <BasicDropdown defaultOpen />
    )
    .add("basic trigger", () =>
        <div className="flex">
            <div className="flex flex-column" style={{ marginRight: "300px" }}>
                <div className="flex" style={{ marginBottom: "150px" }}>
                    <BasicDropdown
                        size="small"
                        className="mr5"
                    />
                    <BasicDropdown
                        size="small"
                        open
                    />
                </div>
                <div className="flex" style={{ marginBottom: "200px" }}>
                    <BasicDropdown className="mr5" />
                    <BasicDropdown open />
                </div>
                <div className="flex">
                    <BasicDropdown
                        size="large"
                        className="mr5"
                    />
                    <BasicDropdown
                        size="large"
                        open
                    />
                </div>
            </div>
            <div className="flex flex-column">
                <div className="flex">
                    <BasicDropdown
                        active
                        className="mr5"
                    />
                    <BasicDropdown
                        focus
                        className="mr5"
                    />
                    <BasicDropdown
                        hover
                        className="mr5"
                    />
                    <BasicDropdown
                        focus
                        hover
                        className="mr5"
                    />
                    <BasicDropdown disabled />
                </div>
            </div>
        </div>
    )
    .add("basic trigger icon", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                <BasicDropdown
                    icon={<FileIcon />}
                    size="small"
                    className="mr5"
                />
                <BasicDropdown
                    icon={<FileIcon />}
                    size="small"
                    open
                />
            </div>
            <div className="flex" style={{ marginBottom: "200px" }}>
                <BasicDropdown
                    icon={<FileIcon />}
                    className="mr5"
                />
                <BasicDropdown
                    icon={<FileIcon />}
                    open
                />
            </div>
            <div className="flex">
                <BasicDropdown
                    icon={<FileIcon />}
                    size="large"
                    className="mr5"
                />
                <BasicDropdown
                    icon={<FileIcon />}
                    size="large"
                    open
                />
            </div>
        </div>
    )
    .add("button trigger", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "200px" }}>
                <CircularButtonDropdown style={{ marginRight: "150px" }} />
                <CircularButtonDropdown
                    size="small"
                    open
                    style={{ marginRight: "200px" }}
                />
                <CircularButtonDropdown
                    open
                    style={{ marginRight: "200px" }}
                />
                <CircularButtonDropdown
                    size="large"
                    open
                />
            </div>
            <div className="flex" style={{ marginBottom: "200px" }}>
                <BasicButtonDropdown style={{ marginRight: "150px" }} />
                <BasicButtonDropdown
                    size="small"
                    open
                    style={{ marginRight: "200px" }}
                />
                <BasicButtonDropdown
                    open
                    style={{ marginRight: "200px" }}
                />
                <BasicButtonDropdown
                    size="large"
                    open
                />
            </div>
            <div className="w-100" style={{ marginBottom: "50px" }}>
                <BasicButtonDropdown
                    fluid
                    className="mr5"
                />
            </div>
            <div className="flex">
                <CircularButtonDropdown
                    active
                    className="mr5"
                />
                <CircularButtonDropdown
                    focus
                    className="mr5"
                />
                <CircularButtonDropdown
                    hover
                    className="mr5"
                />
                <CircularButtonDropdown
                    focus
                    hover
                />
            </div>
        </div>
    )
    .add("advanced trigger", () =>
        <div className="flex">
            <CustomTriggerDropdown style={{ marginRight: "200px" }} />
            <CustomTriggerDropdown open />
        </div>
    )
    .add("scrolling", () =>
        <Dropdown open>
            <Dropdown.BasicTrigger>Task</Dropdown.BasicTrigger>
            <Dropdown.Menu scrolling>
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
            </Dropdown.Menu>
        </Dropdown>
    )
    .add("upward", () =>
        <div className="flex flex-column">
            <div style={{ marginTop: "150px" }}>
                <BasicDropdown
                    upward
                    size="small"
                    open
                    style={{ marginRight: "200px" }}
                />
                <BasicDropdown
                    upward
                    open
                    style={{ marginRight: "200px" }}
                />
                <BasicDropdown
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
                <BasicDropdown
                    direction="left"
                    size="small"
                    open
                    style={{ marginBottom: "150px" }}
                />
                <BasicDropdown
                    direction="left"
                    open
                    style={{ marginBottom: "200px" }}
                />
                <BasicDropdown
                    direction="left"
                    size="large"
                    open
                />
            </div>
            <div className="flex flex-column">
                <BasicDropdown
                    direction="right"
                    size="small"
                    open
                    style={{ marginBottom: "150px" }}
                />
                <BasicDropdown
                    direction="right"
                    open
                    style={{ marginBottom: "200px" }}
                />
                <BasicDropdown
                    direction="right"
                    size="large"
                    open
                />
            </div>
        </div>,
         {
             ...paramsBuilder()
                 .canvasLayout({ paddingLeft: "100px" })
                 .build()
         })
    .add("fluid", () =>
        <div className="flex">
            <div className="flex flex-column w-50 mr12">
                <BasicDropdown
                    size="small"
                    fluid
                    style={{ marginBottom: "200px" }}
                />
                <BasicDropdown
                    fluid
                    style={{ marginBottom: "200px" }}
                />
                <BasicDropdown
                    size="large"
                    fluid
                />
            </div>
            <div className="flex flex-column w-50">
                <BasicDropdown
                    size="small"
                    fluid
                    open
                    style={{ marginBottom: "200px" }}
                />
                <BasicDropdown
                    fluid
                    open
                    style={{ marginBottom: "200px" }}
                />
                <BasicDropdown
                    size="large"
                    fluid
                    open
                />
            </div>
        </div>
    )
    .add("title", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "200px" }}>
                <BasicDropdown
                    open
                    size="small"
                    style={{ marginRight: "200px" }}
                >
                    <Dropdown.Title>Quick Actions</Dropdown.Title>
                    <Dropdown.Item>New</Dropdown.Item>
                    <Dropdown.Item>Open...</Dropdown.Item>
                    <Dropdown.Item>Save as...</Dropdown.Item>
                </BasicDropdown>
                <BasicDropdown
                    open
                    size="small"
                >
                    <Dropdown.Title icon={<LightbulbIcon />}>Quick Actions</Dropdown.Title>
                    <Dropdown.Item>New</Dropdown.Item>
                    <Dropdown.Item>Open...</Dropdown.Item>
                    <Dropdown.Item>Save as...</Dropdown.Item>
                </BasicDropdown>
            </div>
            <div className="flex" style={{ marginBottom: "200px" }}>
                <BasicDropdown
                    open
                    style={{ marginRight: "200px" }}
                >
                    <Dropdown.Title>Quick Actions</Dropdown.Title>
                    <Dropdown.Item>New</Dropdown.Item>
                    <Dropdown.Item>Open...</Dropdown.Item>
                    <Dropdown.Item>Save as...</Dropdown.Item>
                </BasicDropdown>
                <BasicDropdown open>
                    <Dropdown.Title icon={<LightbulbIcon />}>Quick Actions</Dropdown.Title>
                    <Dropdown.Item>New</Dropdown.Item>
                    <Dropdown.Item>Open...</Dropdown.Item>
                    <Dropdown.Item>Save as...</Dropdown.Item>
                </BasicDropdown>
            </div>
            <div className="flex">
                <BasicDropdown
                    open
                    size="large"
                    style={{ marginRight: "200px" }}
                >
                    <Dropdown.Title>Quick Actions</Dropdown.Title>
                    <Dropdown.Item>New</Dropdown.Item>
                    <Dropdown.Item>Open...</Dropdown.Item>
                    <Dropdown.Item>Save as...</Dropdown.Item>
                </BasicDropdown>
                <BasicDropdown
                    open
                    size="large"
                >
                    <Dropdown.Title icon={<LightbulbIcon />}>Quick Actions</Dropdown.Title>
                    <Dropdown.Item>New</Dropdown.Item>
                    <Dropdown.Item>Open...</Dropdown.Item>
                    <Dropdown.Item>Save as...</Dropdown.Item>
                </BasicDropdown>
            </div>
        </div>
    )
    .add("divider", () =>
        <div className="flex">
            <BasicDropdown
                open
                size="small"
                style={{ marginRight: "200px" }}
            >
                <Dropdown.Item>New</Dropdown.Item>
                <Dropdown.Item>Open...</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>Save as...</Dropdown.Item>
                <Dropdown.Item>Rename</Dropdown.Item>
            </BasicDropdown>
            <BasicDropdown
                open
                style={{ marginRight: "200px" }}
            >
                <Dropdown.Item>New</Dropdown.Item>
                <Dropdown.Item>Open...</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>Save as...</Dropdown.Item>
                <Dropdown.Item>Rename</Dropdown.Item>
            </BasicDropdown>
            <BasicDropdown
                open
                size="large"
            >
                <Dropdown.Item>New</Dropdown.Item>
                <Dropdown.Item>Open...</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>Save as...</Dropdown.Item>
                <Dropdown.Item>Rename</Dropdown.Item>
            </BasicDropdown>
        </div>
    )
    .add("interaction states", () =>
        <div className="flex flex-column">
            <div className="flex mb5">
                <BasicDropdown active className="mr5" />
                <BasicDropdown focus />
            </div>
            <div className="flex">
                <BasicDropdown hover className="mr5" />
                <BasicDropdown focus hover />
            </div>
        </div>
    )
    .add("disabled", () =>
        <BasicDropdown disabled />
    )
    .add("styling", () =>
        <div className="flex">
            <BasicDropdown
                className="border-red mr5"
            />
            <BasicDropdown
                style={{
                    border: "1px solid red"
                }}
            />
        </div>
    )
    .add("item interaction states", () =>
        <div className="flex">
            <BasicDropdown
                open
                style={{ marginRight: "200px" }}
            >
                <Dropdown.Item active>New</Dropdown.Item>
                <Dropdown.Item focus>Open...</Dropdown.Item>
                <Dropdown.Item hover>Save as...</Dropdown.Item>
                <Dropdown.Item focus hover>Rename</Dropdown.Item>
            </BasicDropdown>
        </div>
    )
    .add("item disabled", () =>
        <BasicDropdown
            open
            style={{ marginRight: "200px" }}
        >
            <Dropdown.Item>New</Dropdown.Item>
            <Dropdown.Item>Open...</Dropdown.Item>
            <Dropdown.Item disabled>Save as...</Dropdown.Item>
        </BasicDropdown>
    )
    .add("item description", () =>
        <div className="flex">
            <BasicDropdown
                size="small"
                open
                style={{ marginRight: "200px" }}
            >
                <Dropdown.Item>New</Dropdown.Item>
                <Dropdown.Item>Open...</Dropdown.Item>
                <Dropdown.Item description="To infinite and beyond!">Save as...</Dropdown.Item>
            </BasicDropdown>
            <BasicDropdown
                open
                style={{ marginRight: "200px" }}
            >
                <Dropdown.Item>New</Dropdown.Item>
                <Dropdown.Item>Open...</Dropdown.Item>
                <Dropdown.Item description="To infinite and beyond!">Save as...</Dropdown.Item>
            </BasicDropdown>
            <BasicDropdown
                size="large"
                open
            >
                <Dropdown.Item>New</Dropdown.Item>
                <Dropdown.Item>Open...</Dropdown.Item>
                <Dropdown.Item description="To infinite and beyond!">Save as...</Dropdown.Item>
            </BasicDropdown>
        </div>
    )
    .add("item icon", () =>
        <div className="flex">
            <BasicDropdown
                size="small"
                open
                style={{ marginRight: "200px" }}
            >
                <Dropdown.Item iconLeft={<EditIcon />}>New</Dropdown.Item>
                <Dropdown.Item iconLeft={<IconGroup><EditIcon /><EditIcon /><EditIcon /></IconGroup>}>Open...</Dropdown.Item>
                <Dropdown.Item iconRight={<EditIcon />}>Save as...</Dropdown.Item>
                <Dropdown.Item iconRight={<IconGroup><EditIcon /><EditIcon /><EditIcon /></IconGroup>}>Rename</Dropdown.Item>
            </BasicDropdown>
            <BasicDropdown
                open
                style={{ marginRight: "200px" }}
            >
                <Dropdown.Item iconLeft={<EditIcon />}>New</Dropdown.Item>
                <Dropdown.Item iconLeft={<IconGroup><EditIcon /><EditIcon /><EditIcon /></IconGroup>}>Open...</Dropdown.Item>
                <Dropdown.Item iconRight={<EditIcon />}>Save as...</Dropdown.Item>
                <Dropdown.Item iconRight={<IconGroup><EditIcon /><EditIcon /><EditIcon /></IconGroup>}>Rename</Dropdown.Item>
            </BasicDropdown>
            <BasicDropdown
                size="large"
                open
                style={{ marginRight: "200px" }}
            >
                <Dropdown.Item iconLeft={<EditIcon />}>New</Dropdown.Item>
                <Dropdown.Item iconLeft={<IconGroup><EditIcon /><EditIcon /><EditIcon /></IconGroup>}>Open...</Dropdown.Item>
                <Dropdown.Item iconRight={<EditIcon />}>Save as...</Dropdown.Item>
                <Dropdown.Item iconRight={<IconGroup><EditIcon /><EditIcon /><EditIcon /></IconGroup>}>Rename</Dropdown.Item>
            </BasicDropdown>
            <BasicDropdown open>
                <Dropdown.Item iconLeft={<EditIcon />}>New</Dropdown.Item>
                <Dropdown.Item iconLeft={<IconGroup><EditIcon /><EditIcon /><EditIcon /></IconGroup>} disabled>Open...</Dropdown.Item>
                <Dropdown.Item iconRight={<EditIcon />} disabled>Save as...</Dropdown.Item>
                <Dropdown.Item iconRight={<IconGroup><EditIcon /><EditIcon /><EditIcon /></IconGroup>}>Rename</Dropdown.Item>
            </BasicDropdown>
        </div>
    )
    .add("item button", () =>
        <div className="flex">
            <BasicDropdown
                size="small"
                open
                style={{ marginRight: "200px" }}
            >
                <Dropdown.ButtonItem onClick={noop}>New</Dropdown.ButtonItem>
                <Dropdown.ButtonItem onClick={noop}>Open...</Dropdown.ButtonItem>
                <Dropdown.ButtonItem onClick={noop}>Save as...</Dropdown.ButtonItem>
            </BasicDropdown>
            <BasicDropdown
                open
                style={{ marginRight: "200px" }}
            >
                <Dropdown.ButtonItem onClick={noop}>New</Dropdown.ButtonItem>
                <Dropdown.ButtonItem onClick={noop}>Open...</Dropdown.ButtonItem>
                <Dropdown.ButtonItem onClick={noop}>Save as...</Dropdown.ButtonItem>
            </BasicDropdown>
            <BasicDropdown
                size="large"
                open
            >
                <Dropdown.ButtonItem onClick={noop}>New</Dropdown.ButtonItem>
                <Dropdown.ButtonItem onClick={noop}>Open...</Dropdown.ButtonItem>
                <Dropdown.ButtonItem onClick={noop}>Save as...</Dropdown.ButtonItem>
            </BasicDropdown>
        </div>
    )
    .add("item link", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "200px" }}>
                <BasicDropdown
                    size="small"
                    open
                    style={{ marginRight: "200px" }}
                >
                    <Dropdown.LinkItem href="/internal-link">New</Dropdown.LinkItem>
                    <Dropdown.LinkItem href="/internal-link">Open...</Dropdown.LinkItem>
                    <Dropdown.LinkItem href="/internal-link">Save as...</Dropdown.LinkItem>
                </BasicDropdown>
                <BasicDropdown
                    open
                    style={{ marginRight: "200px" }}
                >
                    <Dropdown.LinkItem href="/internal-link">New</Dropdown.LinkItem>
                    <Dropdown.LinkItem href="/internal-link">Open...</Dropdown.LinkItem>
                    <Dropdown.LinkItem href="/internal-link">Save as...</Dropdown.LinkItem>
                </BasicDropdown>
                <BasicDropdown
                    size="large"
                    open
                >
                    <Dropdown.LinkItem href="/internal-link">New</Dropdown.LinkItem>
                    <Dropdown.LinkItem href="/internal-link">Open...</Dropdown.LinkItem>
                    <Dropdown.LinkItem href="/internal-link">Save as...</Dropdown.LinkItem>
                </BasicDropdown>
            </div>
            <div className="flex">
                <BasicDropdown
                    open
                    style={{ marginRight: "200px" }}
                >
                    <Dropdown.LinkItem active href="/internal-link">New</Dropdown.LinkItem>
                    <Dropdown.LinkItem focus href="/internal-link">Open...</Dropdown.LinkItem>
                    <Dropdown.LinkItem hover href="/internal-link">Save as...</Dropdown.LinkItem>
                    <Dropdown.LinkItem focus hover href="/internal-link">Rename</Dropdown.LinkItem>
                </BasicDropdown>
                <BasicDropdown open>
                    <Dropdown.LinkItem active href="https://www.sharegate.com" target="_blank">New</Dropdown.LinkItem>
                    <Dropdown.LinkItem focus href="https://www.sharegate.com" target="_blank">Open...</Dropdown.LinkItem>
                    <Dropdown.LinkItem hover href="https://www.sharegate.com" target="_blank">Save as...</Dropdown.LinkItem>
                    <Dropdown.LinkItem focus hover href="https://www.sharegate.com" target="_blank">Rename</Dropdown.LinkItem>
                </BasicDropdown>
            </div>
        </div>
    );
