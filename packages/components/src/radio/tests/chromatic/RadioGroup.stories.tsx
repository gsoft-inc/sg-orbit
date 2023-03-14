import { Field, HelpMessage, Label } from "@components/field";
import { Inline, Stack } from "@components/layout";
import { Radio, RadioGroup } from "@components/radio";

import { Counter } from "@components/counter";
import { Div } from "@components/html";
import { Tag } from "@components/tag";
import { Text } from "@components/typography";
import { ToggleButton } from "@components/button";
import { ComponentProps, useCallback } from "react";
import { as, useCheckableProps } from "@components/shared";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
    title: "Chromatic/RadioGroup",
    component: RadioGroup,
    parameters: {
        chromatic: {
            delay: 100
        }
    }
} as ComponentMeta<typeof RadioGroup>;

type RadioGroupStory = ComponentStoryObj<typeof RadioGroup>;

const TagAsButton = as(Tag, "button");
type TagAsButtonProps = ComponentProps<typeof TagAsButton>;

function CustomComponent({
    value,
    children,
    ...rest
}: TagAsButtonProps & { value: string }) {
    const [{ checked: isChecked, onCheck, ...checkableProps }] = useCheckableProps({ value });

    const handleCheck = useCallback(event => {
        onCheck(event, value);
    }, [value, onCheck]);

    return (
        <TagAsButton
            {...rest}
            {...checkableProps}
            value={value}
            onClick={handleCheck}
            color={isChecked ? "white" : undefined}
            backgroundColor={isChecked ? "accent-6" : "neutral-6"}
        >
            {children}
        </TagAsButton>
    );
}

export const Default: RadioGroupStory = {
    storyName: "default",
    render: () => (
        <RadioGroup>
            <Radio value="1">1</Radio>
            <Radio value="2">2</Radio>
            <Radio value="3">3</Radio>
        </RadioGroup>
    )
};

export const Selection: RadioGroupStory = {
    storyName: "selection",
    render: () => (
        <Inline>
            <RadioGroup value="2">
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
                <Radio value="3">3</Radio>
            </RadioGroup>
            <RadioGroup defaultValue="2">
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
                <Radio value="3">3</Radio>
            </RadioGroup>
        </Inline>
    )
};

export const Number: RadioGroupStory = {
    storyName: "number",
    render: () => (
        <RadioGroup defaultValue="2">
            <Radio value="1">1</Radio>
            <Radio value="2">2</Radio>
            <Radio value="3">3</Radio>
        </RadioGroup>
    )
};

export const Disabled: RadioGroupStory = {
    storyName: "disabled",
    render: () => (
        <RadioGroup disabled>
            <Radio value="1">1</Radio>
            <Radio value="2">2</Radio>
            <Radio value="3">3</Radio>
        </RadioGroup>
    )
};

export const DisabledRadio: RadioGroupStory = {
    storyName: "disabled radio",
    render: () => (
        <RadioGroup>
            <Radio disabled value="1">1</Radio>
            <Radio value="2">2</Radio>
            <Radio value="3">3</Radio>
        </RadioGroup>
    )
};

export const Gap: RadioGroupStory = {
    storyName: "gap",
    render: () => (
        <RadioGroup gap={13}>
            <Radio value="1">1</Radio>
            <Radio value="2">2</Radio>
            <Radio value="3">3</Radio>
        </RadioGroup>
    )
};

export const Wrap: RadioGroupStory = {
    storyName: "wrap",
    render: () => (
        <Div width={11}>
            <RadioGroup wrap orientation="horizontal">
                {["1", "2", "3", "4", "5", "6", "7", "8"].map(x =>
                    <Radio width={6} value={x} key={x}>{x}</Radio>
                )}
            </RadioGroup>
        </Div>
    )
};

export const NoWrap: RadioGroupStory = {
    storyName: "no wrap",
    render: () => (
        <Div width={11}>
            <RadioGroup wrap={false} orientation="horizontal">
                {["1", "2", "3", "4", "5", "6", "7", "8"].map(x =>
                    <Radio width={6} value={x} key={x}>{x}</Radio>
                )}
            </RadioGroup>
        </Div>
    )
};

export const OverflowWrapped: RadioGroupStory = {
    storyName: "overflow wrapped",
    render: () => (
        <Div width={11}>
            <RadioGroup wrap orientation="horizontal">
                {["1", "2", "3", "Neptune", "5", "6", "7", "8"].map(x =>
                    <Radio value={x} key={x}>{x}</Radio>
                )}
            </RadioGroup>
        </Div>
    )
};

export const ToggleButtons: RadioGroupStory = {
    storyName: "toggle buttons",
    render: () => (
        <RadioGroup gap={2} orientation="horizontal" defaultValue="2">
            <ToggleButton variant="secondary" value="1">1</ToggleButton>
            <ToggleButton variant="secondary" value="2">2</ToggleButton>
            <ToggleButton variant="secondary" value="3">3</ToggleButton>
        </RadioGroup>
    )
};

export const CustomComponents: RadioGroupStory = {
    storyName: "custom components",
    render: () => (
        <RadioGroup gap={2} orientation="horizontal" defaultValue="2">
            <CustomComponent value="1">1</CustomComponent>
            <CustomComponent value="2">2</CustomComponent>
            <CustomComponent value="3">3</CustomComponent>
        </RadioGroup>
    )
};

export const Validation: RadioGroupStory = {
    storyName: "validation",
    render: () => (
        <Inline gap={13}>
            <RadioGroup validationState="invalid">
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
                <Radio value="3">3</Radio>
            </RadioGroup>
            <RadioGroup validationState="valid">
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
                <Radio value="3">3</Radio>
            </RadioGroup>
        </Inline>
    )
};

export const Styling: RadioGroupStory = {
    storyName: "styling",
    render: () => (
        <Inline>
            <RadioGroup border="warning-7">
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
                <Radio value="3">3</Radio>
            </RadioGroup>
            <RadioGroup className="bg-red">
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
                <Radio value="3">3</Radio>
            </RadioGroup>
            <RadioGroup style={{ backgroundColor: "red" }}>
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
                <Radio value="3">3</Radio>
            </RadioGroup>
        </Inline>
    )
};

export const Reverse: RadioGroupStory = {
    storyName: "reverse",
    render: () => (
        <Stack inline>
            <Field>
                <Label>Select a package</Label>
                <RadioGroup reverse>
                    <Radio value="1">1</Radio>
                    <Radio value="2">2</Radio>
                    <Radio value="3">3</Radio>
                </RadioGroup>
            </Field>
            <Field>
                <Label>Select a package</Label>
                <RadioGroup reverse>
                    <Radio value="1">1</Radio>
                    <Radio value="2">A very long option to read while you wait for the countdown to mars.</Radio>
                    <Radio value="3">3</Radio>
                </RadioGroup>
                <HelpMessage>You can find a detailed description of our flight packages on our website.</HelpMessage>
            </Field>
            <Inline>
                <RadioGroup orientation="horizontal" reverse>
                    <Radio value="1">1</Radio>
                    <Radio value="2">2</Radio>
                    <Radio value="3">
                        <Text>3</Text>
                        <Counter>60</Counter>
                    </Radio>
                </RadioGroup>
                <Div border="0.0625rem solid #000" width="100%" height={7}></Div>
            </Inline>
        </Stack>
    )
};
