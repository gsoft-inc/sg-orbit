import { Checkbox, CheckboxGroup } from "@components/checkbox";
import { Div } from "@components/html";
import { Inline, Stack } from "@components/layout";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
    title: "Chromatic/CheckboxGroup/vertical",
    component: CheckboxGroup,
    parameters: {
        chromatic: {
            delay: 100
        }
    }
} as ComponentMeta<typeof CheckboxGroup>;

type CheckboxGroupStory = ComponentStoryObj<typeof CheckboxGroup>;


export const Default: CheckboxGroupStory = {
    storyName: "default",
    render: () => (
        <CheckboxGroup orientation="vertical">
            <Checkbox value="1">1</Checkbox>
            <Checkbox value="2">2</Checkbox>
            <Checkbox value="3">3</Checkbox>
        </CheckboxGroup>
    )
};

export const Size: CheckboxGroupStory = {
    storyName: "size",
    render: () => (
        <Inline alignY="end" gap={13}>
            <CheckboxGroup size="sm" orientation="vertical">
                <Checkbox value="1">1</Checkbox>
                <Checkbox value="2">2</Checkbox>
                <Checkbox value="3">3</Checkbox>
            </CheckboxGroup>
            <CheckboxGroup orientation="vertical">
                <Checkbox value="1">1</Checkbox>
                <Checkbox value="2">2</Checkbox>
                <Checkbox value="3">3</Checkbox>
            </CheckboxGroup>
        </Inline>
    )
};

export const Reverse: CheckboxGroupStory = {
    storyName: "reverse",
    render: () => (
        <CheckboxGroup reverse orientation="vertical">
            <Checkbox value="1">1</Checkbox>
            <Checkbox value="2">A very long option to read while you wait for the countdown to mars.</Checkbox>
            <Checkbox value="3">3</Checkbox>
        </CheckboxGroup>
    )
};

export const Zoom: CheckboxGroupStory = {
    storyName: "zoom",
    render: () => (
        <Stack>
            <Div className="zoom-in">
                <CheckboxGroup aria-label="Select your packages">
                    <Checkbox value="1">1</Checkbox>
                    <Checkbox value="2">2</Checkbox>
                    <Checkbox value="3">3</Checkbox>
                </CheckboxGroup>
            </Div>
            <Div className="zoom-out">
                <CheckboxGroup aria-label="Select your packages">
                    <Checkbox value="1">1</Checkbox>
                    <Checkbox value="2">2</Checkbox>
                    <Checkbox value="3">3</Checkbox>
                </CheckboxGroup>
            </Div>
        </Stack>
    )
};
