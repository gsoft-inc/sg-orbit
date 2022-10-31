import { Checkbox, CheckboxGroup } from "@components/checkbox";
import { Div } from "@components/html";
import { Inline, Stack } from "@components/layout";
import { Tag } from "@components/tag";
import { ToggleButton } from "@components/button";
import { useCallback } from "react";
import { useCheckableProps } from "@components/shared";

export default {
    title: "Chromatic/CheckboxGroup",
    component: CheckboxGroup,
    parameters: {
        chromatic: {
            delay: 100
        }
    }
};

function CustomComponent({
    value,
    children,
    ...rest
}) {
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

export const Default = () =>
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
    </Stack>;

export const Selection = () =>
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
    </Stack>;

export const Number = () =>
    <CheckboxGroup defaultValue={[2]}>
        <Checkbox value={1}>1</Checkbox>
        <Checkbox value={2}>2</Checkbox>
        <Checkbox value={3}>3</Checkbox>
    </CheckboxGroup>;

export const Disabled = () =>
    <CheckboxGroup disabled>
        <Checkbox value="1">1</Checkbox>
        <Checkbox value="2">2</Checkbox>
        <Checkbox value="3">3</Checkbox>
    </CheckboxGroup>;

export const Gap = () =>
    <CheckboxGroup gap={13}>
        <Checkbox value="1">1</Checkbox>
        <Checkbox value="2">2</Checkbox>
        <Checkbox value="3">3</Checkbox>
    </CheckboxGroup>;

export const Wrap = () =>
    <Div width={11}>
        <CheckboxGroup wrap>
            {
                ["1", "2", "3", "4", "5", "6", "7", "8"].map(x =>
                    <Checkbox width={6} value={x} key={x}>{x}</Checkbox>
                )
            }
        </CheckboxGroup>
    </Div>;

export const NoWrap = () =>
    <Div width={11}>
        <CheckboxGroup wrap={false}>
            {
                ["1", "2", "3", "4", "5", "6", "7", "8"].map(x =>
                    <Checkbox width={6} value={x} key={x}>{x}</Checkbox>
                )
            }
        </CheckboxGroup>
    </Div>;

export const WrapOverflow = () =>
    <Div width={12}>
        <CheckboxGroup wrap>
            {
                ["1", "2", "3", "Neptune", "5", "6", "7", "8"].map(x =>
                    <Checkbox value={x} key={x}>{x}</Checkbox>
                )
            }
        </CheckboxGroup>
    </Div>;

export const ToggleButtons = () =>
    <CheckboxGroup gap={2} defaultValue={["2"]}>
        <ToggleButton variant="secondary" value="1">1</ToggleButton>
        <ToggleButton variant="secondary" value="2">2</ToggleButton>
        <ToggleButton variant="secondary" value="3">3</ToggleButton>
    </CheckboxGroup>;

export const CustomComponents = () =>
    <CheckboxGroup gap={2} defaultValue={["2"]}>
        <CustomComponent value="1">1</CustomComponent>
        <CustomComponent value="2">2</CustomComponent>
        <CustomComponent value="3">3</CustomComponent>
    </CheckboxGroup>;

export const Validation = () =>
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
    </Inline>;

export const Styling = () =>
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
    </Inline>;

export const Reverse = () =>
    <Stack inline>
        <CheckboxGroup reverse label="Select your packages">
            <Checkbox value="1">1</Checkbox>
            <Checkbox value="2">2</Checkbox>
            <Checkbox value="3">3</Checkbox>
        </CheckboxGroup>
        <CheckboxGroup reverse label="Select your packages" description="You can find a detailed description of our flight packages on our website.">
            <Checkbox value="1">1</Checkbox>
            <Checkbox value="2">A very long option to read while you wait for the countdown to mars.</Checkbox>
            <Checkbox value="3">3</Checkbox>
        </CheckboxGroup>
    </Stack>;

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
Selection.storyName = "selection";
Number.storyName = "number";
Disabled.storyName = "disabled";
Gap.storyName = "gap";
Wrap.storyName = "wrap";
NoWrap.storyName = "no wrap";
WrapOverflow.storyName = "wrap overflow";
ToggleButtons.storyName = "toggle buttons";
CustomComponents.storyName = "custom components";
Validation.storyName = "validation";
Styling.storyName = "styling";
Reverse.storyName = "reverse";
Zoom.storyName = "zoom";
