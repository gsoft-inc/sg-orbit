import { Checkbox, CheckboxGroup } from "@react-components/checkbox";
import { Inline, Stack } from "@react-components/layout";
import { Tag } from "@react-components/tag";
import { ToggleButton } from "@react-components/button";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@stories/utils";
import { useCallback } from "react";
import { useCheckableProps } from "@react-components/shared";

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
            className={isChecked ? "white bg-primary-500" : "bg-secondary-500"}
            aria-checked={isChecked}
        >
            {children}
        </Tag>
    );
}

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("CheckboxGroup"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

stories()
    .add("default", () =>
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
    .add("selection", () =>
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
    .add("number", () =>
        <CheckboxGroup defaultValue={[2]}>
            <Checkbox value={1}>1</Checkbox>
            <Checkbox value={2}>2</Checkbox>
            <Checkbox value={3}>3</Checkbox>
        </CheckboxGroup>
    )
    .add("disabled", () =>
        <CheckboxGroup disabled>
            <Checkbox value="1">1</Checkbox>
            <Checkbox value="2">2</Checkbox>
            <Checkbox value="3">3</Checkbox>
        </CheckboxGroup>
    )
    .add("gap", () =>
        <CheckboxGroup gap={13}>
            <Checkbox value="1">1</Checkbox>
            <Checkbox value="2">2</Checkbox>
            <Checkbox value="3">3</Checkbox>
        </CheckboxGroup>
    )
    .add("wrapped", () =>
        <div style={{ width: "130px" }}>
            <CheckboxGroup wrap>
                {
                    ["1", "2", "3", "4", "5", "6", "7", "8"].map(x =>
                        <Checkbox style={{ width: "35px" }} value={x} key={x}>{x}</Checkbox>
                    )
                }
            </CheckboxGroup>
        </div>
    )
    .add("toggle buttons", () =>
        <CheckboxGroup gap={2} defaultValue={["2"]}>
            <ToggleButton variant="outline" shape="circular" value="1">1</ToggleButton>
            <ToggleButton variant="outline" shape="circular" value="2">2</ToggleButton>
            <ToggleButton variant="outline" shape="circular" value="3">3</ToggleButton>
        </CheckboxGroup>
    )
    .add("custom components", () =>
        <CheckboxGroup gap={2} defaultValue={["2"]}>
            <CustomComponent value="1">1</CustomComponent>
            <CustomComponent value="2">2</CustomComponent>
            <CustomComponent value="3">3</CustomComponent>
        </CheckboxGroup>
    )
    .add("render props", () =>
        <CheckboxGroup defaultValue={["2"]}>
            {
                ({ checkedValue }) =>
                    ["1", "2", "3"].map(x =>
                        <Checkbox
                            className={checkedValue && checkedValue.includes(x) ? "bg-primary-500" : undefined}
                            value={x}
                            key={x}
                        >
                            {x}
                        </Checkbox>
                    )
            }
        </CheckboxGroup>
    )
    .add("validation", () =>
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
    .add("styling", () =>
        <Inline>
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
    .add("reverse", () =>
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
        </Stack>
    );

stories("/vertical")
    .add("default", () =>
        <CheckboxGroup orientation="vertical">
            <Checkbox value="1">1</Checkbox>
            <Checkbox value="2">2</Checkbox>
            <Checkbox value="3">3</Checkbox>
        </CheckboxGroup>
    )
    .add("size", () =>
        <Inline verticalAlign="end" gap={13}>
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
    .add("reverse", () =>
        <CheckboxGroup reverse orientation="vertical">
            <Checkbox value="1">1</Checkbox>
            <Checkbox value="2">A very long option to read while you wait for the countdown to mars.</Checkbox>
            <Checkbox value="3">3</Checkbox>
        </CheckboxGroup>
    );

