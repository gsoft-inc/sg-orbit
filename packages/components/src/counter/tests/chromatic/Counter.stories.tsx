import { Counter } from "@components/counter";
import { Div } from "@components/html";
import { Inline, Stack } from "@components/layout";
import { Text } from "@components/typography";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
    title: "Chromatic/Counter",
    component: Counter
} as ComponentMeta<typeof Counter>;

type CounterStory = ComponentStoryObj<typeof Counter>;

export const Default: CounterStory = {
    storyName: "default",
    render: () => (
        <Stack>
            <Inline alignY="center">
                <Counter size="sm">15</Counter>
                <Counter>15</Counter>
            </Inline>
            <Inline alignY="center">
                <Text size="sm">
                    <Counter size="inherit">15</Counter>
                </Text>
                <Text>
                    <Counter size="inherit">15</Counter>
                </Text>
                <Text size="lg">
                    <Counter size="inherit">15</Counter>
                </Text>
                <Text size="xl">
                    <Counter size="inherit">15</Counter>
                </Text>
            </Inline>
        </Stack>
    )
};

export const Divider: CounterStory = {
    storyName: "divider",
    render: () => (
        <Stack>
            <Inline alignY="center">
                <Counter size="sm" variant="divider">15</Counter>
                <Counter variant="divider">15</Counter>
            </Inline>
            <Inline alignY="center">
                <Text size="sm">
                    <Counter size="inherit" variant="divider">15</Counter>
                </Text>
                <Text>
                    <Counter size="inherit" variant="divider">15</Counter>
                </Text>
                <Text size="lg">
                    <Counter size="inherit" variant="divider">15</Counter>
                </Text>
                <Text size="xl">
                    <Counter size="inherit" variant="divider">15</Counter>
                </Text>
            </Inline>
        </Stack>
    )
};

export const Pushed: CounterStory = {
    storyName: "pushed",
    render: () => (
        <Stack>
            <Div>
                <Text>Planets Visited</Text>
                <Counter pushed>15</Counter>
            </Div>
            <Div>
                <Text>Planets Visited</Text>
                <Counter pushed variant="divider">15</Counter>
            </Div>
        </Stack>
    )
};

export const Reverse: CounterStory = {
    storyName: "reverse",
    render: () => (
        <Stack>
            <Div>
                <Counter reverse pushed>15</Counter>
                <Text>Planets Visited</Text>
            </Div>
            <Div>
                <Counter reverse pushed variant="divider">15</Counter>
                <Text>Planets Visited</Text>
            </Div>
        </Stack>
    )
};

export const Color: CounterStory = {
    storyName: "color",
    render: () => (
        <Inline color="warning-7" backgroundColor="warning-1" alignY="center">
            <Counter color="inherit">15</Counter>
            <Counter variant="divider" color="inherit">15</Counter>
        </Inline>
    )
};


export const Highlight: CounterStory = {
    storyName: "highlight",
    render: () => (
        <Inline alignY="center">
            <Counter highlight>15</Counter>
            <Counter variant="divider" highlight>15</Counter>
        </Inline>
    )
};

export const Disabled: CounterStory = {
    storyName: "disabled",
    render: () => (
        <Inline alignY="center">
            <Counter disabled>15</Counter>
            <Counter variant="divider" disabled>15</Counter>
        </Inline>
    )
};

export const Zoom: CounterStory = {
    storyName: "zoom",
    render: () => (
        <Stack>
            <Div className="zoom-in">
                <Inline>
                    <Counter>15</Counter>
                    <Counter variant="divider">15</Counter>
                </Inline>
            </Div>
            <Div className="zoom-out">
                <Inline>
                    <Counter>15</Counter>
                    <Counter variant="divider">15</Counter>
                </Inline>
            </Div>
        </Stack>
    )
};

export const Styling: CounterStory = {
    storyName: "styling",
    render: () => (
        <Stack>
            <Inline alignY="center">
                <Counter border="warning-7">15</Counter>
                <Counter className="bg-red">15</Counter>
                <Counter style={{ backgroundColor: "red" }}>15</Counter>
            </Inline>
            <Inline alignY="center">
                <Counter border="warning-7" variant="divider">15</Counter>
                <Counter className="bg-red" variant="divider">15</Counter>
                <Counter style={{ backgroundColor: "red" }} variant="divider">15</Counter>
            </Inline>
        </Stack>
    )
};
