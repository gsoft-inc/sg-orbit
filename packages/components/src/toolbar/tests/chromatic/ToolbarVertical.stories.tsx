import { Inline } from "@components/layout";
import { RadioGroup } from "@components/radio";
import { ToggleButton } from "@components/button";
import { CheckboxGroup } from "@components/checkbox";
import { TextInput } from "@components/text-input";
import { Toolbar } from "@components/toolbar";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
    title: "Chromatic/Toolbar/vertical",
    component: Toolbar,
    parameters: {
        chromatic: {
            delay: 100
        }
    }
} as ComponentMeta<typeof Toolbar>;

type ToolbarStory = ComponentStoryObj<typeof Toolbar>;


export const Default: ToolbarStory = {
    storyName: "default",
    render: () => (
        <Toolbar orientation="vertical">
            <CheckboxGroup>
                <ToggleButton value="1">1</ToggleButton>
                <ToggleButton value="2">2</ToggleButton>
                <ToggleButton value="3">3</ToggleButton>
            </CheckboxGroup>
            <TextInput aria-label="Label" />
            <ToggleButton>Activate</ToggleButton>
            <RadioGroup>
                <ToggleButton value="1">1</ToggleButton>
                <ToggleButton value="2">2</ToggleButton>
                <ToggleButton value="3">3</ToggleButton>
            </RadioGroup>
        </Toolbar>
    )
};

export const Align: ToolbarStory = {
    storyName: "align",
    render: () => (
        <Inline gap={13}>
            <Toolbar alignX="start" orientation="vertical">
                <CheckboxGroup>
                    <ToggleButton value="1">1</ToggleButton>
                    <ToggleButton value="2">2</ToggleButton>
                    <ToggleButton value="3">3</ToggleButton>
                </CheckboxGroup>
                <TextInput aria-label="Label" />
                <ToggleButton>Activate</ToggleButton>
                <RadioGroup>
                    <ToggleButton value="1">1</ToggleButton>
                    <ToggleButton value="2">2</ToggleButton>
                    <ToggleButton value="3">3</ToggleButton>
                </RadioGroup>
            </Toolbar>
            <Toolbar alignX="end" orientation="vertical">
                <CheckboxGroup>
                    <ToggleButton value="1">1</ToggleButton>
                    <ToggleButton value="2">2</ToggleButton>
                    <ToggleButton value="3">3</ToggleButton>
                </CheckboxGroup>
                <TextInput aria-label="Label" />
                <ToggleButton>Activate</ToggleButton>
                <RadioGroup>
                    <ToggleButton value="1">1</ToggleButton>
                    <ToggleButton value="2">2</ToggleButton>
                    <ToggleButton value="3">3</ToggleButton>
                </RadioGroup>
            </Toolbar>
            <Toolbar alignX="center" orientation="vertical">
                <CheckboxGroup>
                    <ToggleButton value="1">1</ToggleButton>
                    <ToggleButton value="2">2</ToggleButton>
                    <ToggleButton value="3">3</ToggleButton>
                </CheckboxGroup>
                <TextInput aria-label="Label" />
                <ToggleButton>Activate</ToggleButton>
                <RadioGroup>
                    <ToggleButton value="1">1</ToggleButton>
                    <ToggleButton value="2">2</ToggleButton>
                    <ToggleButton value="3">3</ToggleButton>
                </RadioGroup>
            </Toolbar>
        </Inline>
    )
};

export const VerticalAlign: ToolbarStory = {
    storyName: "vertical align",
    render: () => (
        <Inline gap={13}>
            <Toolbar alignY="start" orientation="vertical" height={16}>
                <CheckboxGroup>
                    <ToggleButton value="1">1</ToggleButton>
                    <ToggleButton value="2">2</ToggleButton>
                    <ToggleButton value="3">3</ToggleButton>
                </CheckboxGroup>
                <TextInput aria-label="Label" />
                <ToggleButton>Activate</ToggleButton>
            </Toolbar>
            <Toolbar alignY="end" orientation="vertical" height={16}>
                <CheckboxGroup>
                    <ToggleButton value="1">1</ToggleButton>
                    <ToggleButton value="2">2</ToggleButton>
                    <ToggleButton value="3">3</ToggleButton>
                </CheckboxGroup>
                <TextInput aria-label="Label" />
                <ToggleButton>Activate</ToggleButton>
            </Toolbar>
            <Toolbar alignY="center" orientation="vertical" height={16}>
                <CheckboxGroup>
                    <ToggleButton value="1">1</ToggleButton>
                    <ToggleButton value="2">2</ToggleButton>
                    <ToggleButton value="3">3</ToggleButton>
                </CheckboxGroup>
                <TextInput aria-label="Label" />
                <ToggleButton>Activate</ToggleButton>
            </Toolbar>
        </Inline>
    )
};
