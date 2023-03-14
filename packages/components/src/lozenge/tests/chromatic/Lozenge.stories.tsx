import { PlaceholderMajorIcon, IconList } from "@components/icons";
import { Div } from "@components/html";
import { Inline, Stack } from "@components/layout";
import { Lozenge } from "@components/lozenge";
import { Text } from "@components/typography";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
    title: "Chromatic/Lozenge",
    component: Lozenge
} as ComponentMeta<typeof Lozenge>;

type LozengeStory = ComponentStoryObj<typeof Lozenge>;

export const Default: LozengeStory = {
    storyName: "default",
    render: () => (
        <Inline alignY="end">
            <Lozenge size="sm">New</Lozenge>
            <Lozenge>New</Lozenge>
        </Inline>
    )
};

export const Variants: LozengeStory = {
    storyName: "variants",
    render: () => (
        <Inline alignY="end">
            <Lozenge size="sm">New</Lozenge>
            <Lozenge >New</Lozenge>
            <Lozenge variant="warning" size="sm">New</Lozenge>
            <Lozenge variant="warning">New</Lozenge>
            <Lozenge variant="positive" size="sm">New</Lozenge>
            <Lozenge variant="positive">New</Lozenge>
            <Lozenge variant="negative" size="sm">New</Lozenge>
            <Lozenge variant="negative">New</Lozenge>
            <Lozenge variant="informative" size="sm">New</Lozenge>
            <Lozenge variant="informative">New</Lozenge>

            <Inline alignY="end">
                <Lozenge size="sm">
                    <PlaceholderMajorIcon />
                    <Text>New</Text>
                </Lozenge>
                <Lozenge>
                    <PlaceholderMajorIcon />
                    <Text>New</Text>
                </Lozenge>
                <Lozenge variant="warning" size="sm">
                    <PlaceholderMajorIcon />
                    <Text>New</Text>
                </Lozenge>
                <Lozenge variant="warning">
                    <PlaceholderMajorIcon />
                    <Text>New</Text>
                </Lozenge>
                <Lozenge variant="positive" size="sm">
                    <PlaceholderMajorIcon />
                    <Text>New</Text>
                </Lozenge>
                <Lozenge variant="positive">
                    <PlaceholderMajorIcon />
                    <Text>New</Text>
                </Lozenge>
                <Lozenge variant="negative" size="sm">
                    <PlaceholderMajorIcon />
                    <Text>New</Text>
                </Lozenge>
                <Lozenge variant="negative">
                    <PlaceholderMajorIcon />
                    <Text>New</Text>
                </Lozenge>
                <Lozenge variant="informative" size="sm">
                    <PlaceholderMajorIcon />
                    <Text>New</Text>
                </Lozenge>
                <Lozenge variant="informative">
                    <PlaceholderMajorIcon />
                    <Text>New</Text>
                </Lozenge>
            </Inline>
        </Inline>
    )
};

export const Icon: LozengeStory = {
    storyName: "icon",
    render: () => (
        <Stack>
            <Inline alignY="end">
                <Lozenge size="sm">
                    <PlaceholderMajorIcon />
                    <Text>New</Text>
                </Lozenge>
                <Lozenge>
                    <PlaceholderMajorIcon />
                    <Text>New</Text>
                </Lozenge>
            </Inline>
            <Div>
                <Lozenge>
                    <IconList>
                        <PlaceholderMajorIcon /><PlaceholderMajorIcon />
                    </IconList>
                    <Text>New</Text>
                </Lozenge>
            </Div>
        </Stack>
    )
};

export const HighlightAndVariant: LozengeStory = {
    storyName: "highlight and variant",
    render: () => (
        <Stack>
            <Inline alignY="end">
                <Lozenge highlight size="sm">New</Lozenge>
                <Lozenge highlight>New</Lozenge>
                <Lozenge variant="warning" highlight size="sm">New</Lozenge>
                <Lozenge variant="warning" highlight>New</Lozenge>
                <Lozenge variant="positive" highlight size="sm">New</Lozenge>
                <Lozenge variant="positive" highlight>New</Lozenge>
                <Lozenge variant="negative" highlight size="sm">New</Lozenge>
                <Lozenge variant="negative" highlight>New</Lozenge>
                <Lozenge highlight variant="informative" size="sm">New</Lozenge>
                <Lozenge highlight variant="informative">New</Lozenge>
            </Inline>
            <Inline alignY="end">
                <Lozenge highlight size="sm">
                    <PlaceholderMajorIcon />
                    <Text>New</Text>
                </Lozenge>
                <Lozenge highlight>
                    <PlaceholderMajorIcon />
                    <Text>New</Text>
                </Lozenge>
                <Lozenge variant="warning" highlight size="sm">
                    <PlaceholderMajorIcon />
                    <Text>New</Text>
                </Lozenge>
                <Lozenge variant="warning" highlight>
                    <PlaceholderMajorIcon />
                    <Text>New</Text>
                </Lozenge>
                <Lozenge variant="positive" highlight size="sm">
                    <PlaceholderMajorIcon />
                    <Text>New</Text>
                </Lozenge>
                <Lozenge variant="positive" highlight>
                    <PlaceholderMajorIcon />
                    <Text>New</Text>
                </Lozenge>
                <Lozenge variant="negative" highlight size="sm">
                    <PlaceholderMajorIcon />
                    <Text>New</Text>
                </Lozenge>
                <Lozenge variant="negative" highlight>
                    <PlaceholderMajorIcon />
                    <Text>New</Text>
                </Lozenge>
                <Lozenge variant="informative" highlight size="sm">
                    <PlaceholderMajorIcon />
                    <Text>New</Text>
                </Lozenge>
                <Lozenge variant="informative" highlight>
                    <PlaceholderMajorIcon />
                    <Text>New</Text>
                </Lozenge>
            </Inline>
        </Stack>
    )
};

export const InheritParentProperties: LozengeStory = {
    storyName: "inherit parent properties",
    render: () => (
        <Inline alignY="end">
            <Lozenge textTransform="uppercase">New</Lozenge>
            <Lozenge color="red" highlight>
                <PlaceholderMajorIcon />
                <Text>New</Text>
            </Lozenge>
        </Inline>
    )
};

export const Fluid: LozengeStory = {
    storyName: "fluid",
    render: () => (
        <Div width="31.25rem">
            <Inline>
                <Lozenge fluid>New</Lozenge>
                <Lozenge fluid>
                    <PlaceholderMajorIcon />
                    <Text>New</Text>
                </Lozenge>
            </Inline>
        </Div>
    )
};


export const Zoom: LozengeStory = {
    storyName: "zoom",
    render: () => (
        <Inline>
            <Div className="zoom-in">
                <Lozenge>New</Lozenge>
            </Div>
            <Div className="zoom-out">
                <Lozenge>New</Lozenge>
            </Div>
        </Inline>
    )
};

export const Styling: LozengeStory = {
    storyName: "styling",
    render: () => (
        <Inline>
            <Lozenge border="warning-7">New</Lozenge>
            <Lozenge className="border-red">New</Lozenge>
            <Lozenge
                style={{
                    border: "0.0625rem solid red"
                }}
            >New</Lozenge>
        </Inline>
    )
};
