import { Checkbox, CheckboxGroup } from "@components/checkbox";
import { Div } from "@components/html";
import { Inline, Stack } from "@components/layout";

export default {
    title: "Chromatic/CheckboxGroup/vertical",
    component: CheckboxGroup,
    parameters: {
        chromatic: {
            delay: 100
        }
    }
};

export const Default = () =>
    <CheckboxGroup orientation="vertical">
        <Checkbox value="1">1</Checkbox>
        <Checkbox value="2">2</Checkbox>
        <Checkbox value="3">3</Checkbox>
    </CheckboxGroup>;

export const Size = () =>
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
    </Inline>;

export const Reverse = () =>
    <CheckboxGroup reverse orientation="vertical">
        <Checkbox value="1">1</Checkbox>
        <Checkbox value="2">A very long option to read while you wait for the countdown to mars.</Checkbox>
        <Checkbox value="3">3</Checkbox>
    </CheckboxGroup>;

export const Zoom = () =>
    <Stack>
        <Div className="zoom-in">
            <CheckboxGroup label="Select your packages">
                <Checkbox value="1">1</Checkbox>
                <Checkbox value="2">2</Checkbox>
                <Checkbox value="3">3</Checkbox>
            </CheckboxGroup>
        </Div>
        <Div className="zoom-out">
            <CheckboxGroup label="Select your packages">
                <Checkbox value="1">1</Checkbox>
                <Checkbox value="2">2</Checkbox>
                <Checkbox value="3">3</Checkbox>
            </CheckboxGroup>
        </Div>
    </Stack>;

Default.storyName = "default";
Size.storyName = "size";
Reverse.storyName = "reverse";
Zoom.storyName = "zoom";
