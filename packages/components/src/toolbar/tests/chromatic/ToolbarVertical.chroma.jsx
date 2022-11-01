import { Inline } from "@components/layout";
import { RadioGroup } from "@components/radio";
import { ToggleButton } from "@components/button";

import { CheckboxGroup } from "@components/checkbox";
import { TextInput } from "@components/text-input";
import { Toolbar } from "@components/toolbar";

export default {
    title: "Chromatic/Toolbar/vertical",
    component: Toolbar,
    parameters: {
        chromatic: {
            delay: 100
        }
    }
};

export const Default = () => (
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
);

Default.storyName = "default";

export const Align = () => (
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
);

Align.storyName = "align";

export const VerticalAlign = () => (
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
);

VerticalAlign.storyName = "vertical align";
