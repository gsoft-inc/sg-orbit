import { Checkbox, CheckboxGroup } from "@components/checkbox";
import { Div } from "@components/html";
import { Inline, Stack } from "@components/layout";
import { Tag, TagProps } from "@components/tag";
import { ToggleButton } from "@components/button";
import { useCallback } from "react";
import { useCheckableProps } from "@components/shared";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
    title: "Chromatic/CheckboxGroup",
    component: CheckboxGroup,
    parameters: {
        chromatic: {
            delay: 100
        }
    }
} as ComponentMeta<typeof CheckboxGroup>;

type CheckboxGroupStory = ComponentStoryObj<typeof CheckboxGroup>;

function CustomComponent({
    value,
    children,
    ...rest
}: TagProps & { value: string }) {
    const [{ checked: isChecked, onCheck, ...checkableProps }] = useCheckableProps({ value });

    const handleCheck = useCallback(event => {
        onCheck(event, value);
    }, [value, onCheck]);

    return (
        <Tag
            {...rest}
            {...checkableProps}
            as="button"
            onClick={handleCheck}
            color={isChecked ? "white" : undefined}
            backgroundColor={isChecked ? "accent-6" : "neutral-6"}
            aria-checked={isChecked}
        >
            {children}
        </Tag>
    );
}

export const Default: CheckboxGroupStory = {
    storyName: "default",
    render: () => (
        <Stack>
            <CheckboxGroup size="sm">
                <Checkbox value="1">1</Checkbox>
                <Checkbox value="2">2</Checkbox>
                <Checkbox value="3">3</Checkbox>
            </CheckboxGroup>
            <CheckboxGroup>
                <Checkbox value="1">1</Checkbox>
                <Checkbox value="2">2</Checkbox>
                <Checkbox value="3">3</Checkbox>
            </CheckboxGroup>
        </Stack>
    )
};

export const Selection: CheckboxGroupStory = {
    storyName: "selection",
    render: () => (
        <Stack>
            <CheckboxGroup value={[]}>
                <Checkbox value="1">1</Checkbox>
                <Checkbox value="2">2</Checkbox>
                <Checkbox value="3">3</Checkbox>
            </CheckboxGroup>
            <CheckboxGroup value={["1", "2", "3"]}>
                <Checkbox value="1">1</Checkbox>
                <Checkbox value="2">2</Checkbox>
                <Checkbox value="3">3</Checkbox>
            </CheckboxGroup>
            <CheckboxGroup defaultValue={["2"]}>
                <Checkbox value="1">1</Checkbox>
                <Checkbox value="2">2</Checkbox>
                <Checkbox value="3">3</Checkbox>
            </CheckboxGroup>
        </Stack>
    )
};

export const Number: CheckboxGroupStory = {
    storyName: "number",
    render: () => (
        <CheckboxGroup defaultValue={["2"]}>
            <Checkbox value="1">1</Checkbox>
            <Checkbox value="2">2</Checkbox>
            <Checkbox value="3">3</Checkbox>
        </CheckboxGroup>
    )
};


export const Disabled: CheckboxGroupStory = {
    storyName: "disabled",
    render: () => (
        <CheckboxGroup disabled>
            <Checkbox value="1">1</Checkbox>
            <Checkbox value="2">2</Checkbox>
            <Checkbox value="3">3</Checkbox>
        </CheckboxGroup>
    )
};

export const Gap: CheckboxGroupStory = {
    storyName: "gap",
    render: () => (
        <CheckboxGroup gap={13}>
            <Checkbox value="1">1</Checkbox>
            <Checkbox value="2">2</Checkbox>
            <Checkbox value="3">3</Checkbox>
        </CheckboxGroup>
    )
};

export const Wrap: CheckboxGroupStory = {
    storyName: "wrap",
    render: () => (
        <Div width={11}>
            <CheckboxGroup wrap>
                {
                    ["1", "2", "3", "4", "5", "6", "7", "8"].map(x =>
                        <Checkbox width={6} value={x} key={x}>{x}</Checkbox>
                    )
                }
            </CheckboxGroup>
        </Div>
    )
};

export const NoWrap: CheckboxGroupStory = {
    storyName: "no wrap",
    render: () => (
        <Div width={11}>
            <CheckboxGroup wrap={false}>
                {
                    ["1", "2", "3", "4", "5", "6", "7", "8"].map(x =>
                        <Checkbox width={6} value={x} key={x}>{x}</Checkbox>
                    )
                }
            </CheckboxGroup>
        </Div>
    )
};


export const WrapOverflow: CheckboxGroupStory = {
    storyName: "wrap overflow",
    render: () => (
        <Div width={12}>
            <CheckboxGroup wrap>
                {
                    ["1", "2", "3", "Neptune", "5", "6", "7", "8"].map(x =>
                        <Checkbox value={x} key={x}>{x}</Checkbox>
                    )
                }
            </CheckboxGroup>
        </Div>
    )
};

export const ToggleButtons: CheckboxGroupStory = {
    storyName: "toggle buttons",
    render: () => (
        <CheckboxGroup gap={2} defaultValue={["2"]}>
            <ToggleButton variant="secondary" value="1">1</ToggleButton>
            <ToggleButton variant="secondary" value="2">2</ToggleButton>
            <ToggleButton variant="secondary" value="3">3</ToggleButton>
        </CheckboxGroup>
    )
};

export const CustomComponents: CheckboxGroupStory = {
    storyName: "custom components",
    render: () => (
        <CheckboxGroup gap={2} defaultValue={["2"]}>
            <CustomComponent value="1">1</CustomComponent>
            <CustomComponent value="2">2</CustomComponent>
            <CustomComponent value="3">3</CustomComponent>
        </CheckboxGroup>
    )
};

export const Validation: CheckboxGroupStory = {
    storyName: "validation",
    render: () => (
        <Inline gap={13}>
            <CheckboxGroup validationState="invalid">
                <Checkbox value="1">1</Checkbox>
                <Checkbox value="2">2</Checkbox>
                <Checkbox value="3">3</Checkbox>
            </CheckboxGroup>
            <CheckboxGroup validationState="valid">
                <Checkbox value="1">1</Checkbox>
                <Checkbox value="2">2</Checkbox>
                <Checkbox value="3">3</Checkbox>
            </CheckboxGroup>
        </Inline>
    )
};

export const Styling: CheckboxGroupStory = {
    storyName: "styling",
    render: () => (
        <Inline>
            <CheckboxGroup border="warning-7">
                <Checkbox value="1">1</Checkbox>
                <Checkbox value="2">2</Checkbox>
                <Checkbox value="3">3</Checkbox>
            </CheckboxGroup>
            <CheckboxGroup className="bg-red">
                <Checkbox value="1">1</Checkbox>
                <Checkbox value="2">2</Checkbox>
                <Checkbox value="3">3</Checkbox>
            </CheckboxGroup>
            <CheckboxGroup style={{ backgroundColor: "red" }}>
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
        <Stack inline>
            <CheckboxGroup reverse aria-label="Select your packages">
                <Checkbox value="1">1</Checkbox>
                <Checkbox value="2">2</Checkbox>
                <Checkbox value="3">3</Checkbox>
            </CheckboxGroup>
            <CheckboxGroup reverse aria-label="Select your packages">
                <Checkbox value="1">1</Checkbox>
                <Checkbox value="2">A very long option to read while you wait for the countdown to mars.</Checkbox>
                <Checkbox value="3">3</Checkbox>
            </CheckboxGroup>
        </Stack>
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
