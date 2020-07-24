import { Button, IconButton } from "@react-components/button";
import { Dropdown, DropdownContext } from "@react-components/dropdown";
import { EditIcon, FileIcon, IconGroup, LightbulbIcon, VerticalDotsIcon } from "@react-components/icons";
import { Inline, Stack } from "@react-components/layout";
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

const CustomTrigger = forwardRef(({ children, ...rest }, ref) => {
    const { isOpen } = useContext(DropdownContext);

    return (
        <Button
            {...rest}
            primary={isOpen}
            secondary={!isOpen}
            ref={ref}
        >
            {children}
        </Button>
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
                as={IconButton}
                circular
                secondary
                active={active}
                focus={focus}
                hover={hover}
            >
                <VerticalDotsIcon />
            </Dropdown.Trigger>
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
            <Dropdown.Trigger as={CustomTrigger} circular>
                <VerticalDotsIcon />
            </Dropdown.Trigger>
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
        <Inline gap="150px">
            <BasicDropdown open />
            <BasicDropdown defaultOpen />
        </Inline>

    )
    .add("basic trigger", () =>
        <Inline gap="300px">
            <Stack gap="200px">
                <Inline>
                    <BasicDropdown size="small" />
                    <BasicDropdown
                        size="small"
                        open
                    />
                </Inline>
                <Inline>
                    <BasicDropdown />
                    <BasicDropdown open />
                </Inline>
                <Inline>
                    <BasicDropdown size="large" />
                    <BasicDropdown
                        size="large"
                        open
                    />
                </Inline>
            </Stack>
            <Stack>
                <Inline>
                    <BasicDropdown active />
                    <BasicDropdown focus />
                    <BasicDropdown hover />
                    <BasicDropdown
                        focus
                        hover
                    />
                    <BasicDropdown disabled />
                </Inline>
            </Stack>
        </Inline>
    )
    .add("basic trigger icon", () =>
        <Stack gap="200px">
            <Inline>
                <BasicDropdown
                    icon={<FileIcon />}
                    size="small"
                />
                <BasicDropdown
                    icon={<FileIcon />}
                    size="small"
                    open
                />
            </Inline>
            <Inline>
                <BasicDropdown
                    icon={<FileIcon />}
                />
                <BasicDropdown
                    icon={<FileIcon />}
                    open
                />
            </Inline>
            <Inline>
                <BasicDropdown
                    icon={<FileIcon />}
                    size="large"
                />
                <BasicDropdown
                    icon={<FileIcon />}
                    size="large"
                    open
                />
            </Inline>
        </Stack>
    )
    .add("button trigger", () =>
        <Stack gap="200px">
            <Inline gap="200px">
                <CircularButtonDropdown />
                <CircularButtonDropdown
                    size="small"
                    open
                />
                <CircularButtonDropdown
                    open
                />
                <CircularButtonDropdown
                    size="large"
                    open
                />
            </Inline>
            <Inline gap="200px">
                <BasicButtonDropdown />
                <BasicButtonDropdown
                    size="small"
                    open
                />
                <BasicButtonDropdown
                    open
                />
                <BasicButtonDropdown
                    size="large"
                    open
                />
            </Inline>
            <div className="w-100">
                <BasicButtonDropdown fluid />
            </div>
            <Inline>
                <CircularButtonDropdown active />
                <CircularButtonDropdown focus />
                <CircularButtonDropdown hover />
                <CircularButtonDropdown
                    focus
                    hover
                />
            </Inline>
        </Stack>
    )
    .add("advanced trigger", () =>
        <Inline gap="200px">
            <CustomTriggerDropdown>Task</CustomTriggerDropdown>
            <CustomTriggerDropdown open>Task</CustomTriggerDropdown>
        </Inline>
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
        <Inline gap="200px" style={{ marginTop: "150px" }}>
            <BasicDropdown
                upward
                size="small"
                open
            />
            <BasicDropdown
                upward
                open
            />
            <BasicDropdown
                upward
                size="large"
                open
            />
        </Inline>
    )
    .add("direction", () =>
        <Inline gap={12}>
            <Stack gap="200px">
                <BasicDropdown
                    direction="left"
                    size="small"
                    open
                />
                <BasicDropdown
                    direction="left"
                    open
                />
                <BasicDropdown
                    direction="left"
                    size="large"
                    open
                />
            </Stack>
            <Stack gap="200px">
                <BasicDropdown
                    direction="right"
                    size="small"
                    open
                />
                <BasicDropdown
                    direction="right"
                    open
                />
                <BasicDropdown
                    direction="right"
                    size="large"
                    open
                />
            </Stack>
        </Inline>,
         {
             ...paramsBuilder()
                 .canvasLayout({ paddingLeft: "100px" })
                 .build()
         })
    .add("fluid", () =>
        <Inline gap={12}>
            <Stack gap="200px" className="w-50">
                <BasicDropdown
                    size="small"
                    fluid
                />
                <BasicDropdown
                    fluid
                />
                <BasicDropdown
                    size="large"
                    fluid
                />
            </Stack>
            <Stack gap="200px" className="w-50">
                <BasicDropdown
                    size="small"
                    fluid
                    open
                />
                <BasicDropdown
                    fluid
                    open
                />
                <BasicDropdown
                    size="large"
                    fluid
                    open
                />
            </Stack>
        </Inline>
    )
    .add("title", () =>
        <Stack gap="200px">
            <Inline gap="200px">
                <BasicDropdown
                    open
                    size="small"
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
            </Inline>
            <Inline gap="200px">
                <BasicDropdown
                    open
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
            </Inline>
            <Inline gap="200px">
                <BasicDropdown
                    open
                    size="large"
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
            </Inline>
        </Stack>
    )
    .add("divider", () =>
        <Inline gap="200px">
            <BasicDropdown
                open
                size="small"
            >
                <Dropdown.Item>New</Dropdown.Item>
                <Dropdown.Item>Open...</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>Save as...</Dropdown.Item>
                <Dropdown.Item>Rename</Dropdown.Item>
            </BasicDropdown>
            <BasicDropdown
                open
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
        </Inline>
    )
    .add("interaction states", () =>
        <Inline>
            <BasicDropdown active />
            <BasicDropdown focus />
            <BasicDropdown hover />
            <BasicDropdown focus hover />
        </Inline>
    )
    .add("disabled", () =>
        <BasicDropdown disabled />
    )
    .add("styling", () =>
        <Inline>
            <BasicDropdown className="border-red" />
            <BasicDropdown
                style={{
                    border: "1px solid red"
                }}
            />
        </Inline>
    )
    .add("item interaction states", () =>
        <Inline>
            <BasicDropdown open>
                <Dropdown.Item active>New</Dropdown.Item>
                <Dropdown.Item focus>Open...</Dropdown.Item>
                <Dropdown.Item hover>Save as...</Dropdown.Item>
                <Dropdown.Item focus hover>Rename</Dropdown.Item>
            </BasicDropdown>
        </Inline>
    )
    .add("item disabled", () =>
        <BasicDropdown open>
            <Dropdown.Item>New</Dropdown.Item>
            <Dropdown.Item>Open...</Dropdown.Item>
            <Dropdown.Item disabled>Save as...</Dropdown.Item>
        </BasicDropdown>
    )
    .add("item description", () =>
        <Inline gap="200px">
            <BasicDropdown
                size="small"
                open
            >
                <Dropdown.Item>New</Dropdown.Item>
                <Dropdown.Item>Open...</Dropdown.Item>
                <Dropdown.Item description="To infinite and beyond!">Save as...</Dropdown.Item>
            </BasicDropdown>
            <BasicDropdown
                open
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
        </Inline>
    )
    .add("item icon", () =>
        <Inline gap="200px">
            <BasicDropdown
                size="small"
                open
            >
                <Dropdown.Item iconLeft={<EditIcon />}>New</Dropdown.Item>
                <Dropdown.Item iconLeft={<IconGroup><EditIcon /><EditIcon /><EditIcon /></IconGroup>}>Open...</Dropdown.Item>
                <Dropdown.Item iconRight={<EditIcon />}>Save as...</Dropdown.Item>
                <Dropdown.Item iconRight={<IconGroup><EditIcon /><EditIcon /><EditIcon /></IconGroup>}>Rename</Dropdown.Item>
            </BasicDropdown>
            <BasicDropdown open>
                <Dropdown.Item iconLeft={<EditIcon />}>New</Dropdown.Item>
                <Dropdown.Item iconLeft={<IconGroup><EditIcon /><EditIcon /><EditIcon /></IconGroup>}>Open...</Dropdown.Item>
                <Dropdown.Item iconRight={<EditIcon />}>Save as...</Dropdown.Item>
                <Dropdown.Item iconRight={<IconGroup><EditIcon /><EditIcon /><EditIcon /></IconGroup>}>Rename</Dropdown.Item>
            </BasicDropdown>
            <BasicDropdown
                size="large"
                open
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
        </Inline>
    )
    .add("item button", () =>
        <Inline gap="200px">
            <BasicDropdown
                size="small"
                open
            >
                <Dropdown.ButtonItem onClick={noop}>New</Dropdown.ButtonItem>
                <Dropdown.ButtonItem onClick={noop}>Open...</Dropdown.ButtonItem>
                <Dropdown.ButtonItem onClick={noop}>Save as...</Dropdown.ButtonItem>
            </BasicDropdown>
            <BasicDropdown open>
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
        </Inline>
    )
    .add("item link", () =>
        <Stack gap="200px">
            <Inline gap="200px">
                <BasicDropdown
                    size="small"
                    open
                >
                    <Dropdown.LinkItem href="/internal-link">New</Dropdown.LinkItem>
                    <Dropdown.LinkItem href="/internal-link">Open...</Dropdown.LinkItem>
                    <Dropdown.LinkItem href="/internal-link">Save as...</Dropdown.LinkItem>
                </BasicDropdown>
                <BasicDropdown open>
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
            </Inline>
            <Inline gap="200px">
                <BasicDropdown open>
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
            </Inline>
        </Stack>
    );
