import { Inline, Stack } from "@react-components/layout";
import { Radio, RadioGroup } from "@react-components/radio";
import { Tag } from "@react-components/tag";
import { ToggleButton } from "@react-components/button";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { useCallback } from "react";
import { useCheckableContext } from "@react-components/shared";

function CustomComponent({
    value,
    children,
    ...rest
}) {
    const { isChecked, onCheck } = useCheckableContext(value);

    const handleCheck = useCallback(event => {
        onCheck(event, value);
    }, [value, onCheck]);

    return (
        <Tag
            {...rest}
            as="button"
            value={value}
            onClick={handleCheck}
            className={isChecked ? "white bg-primary-500" : "bg-secondary-500"}
        >
            {children}
        </Tag>
    );
}

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("RadioGroup"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .chromaticDelay(100)
            .build())
        .build();
}

stories()
    .add("default", () =>
        <Inline align="end" gap={13}>
            <RadioGroup size="small">
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
                <Radio value="3">3</Radio>
            </RadioGroup>
            <RadioGroup>
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
                <Radio value="3">3</Radio>
            </RadioGroup>
            <RadioGroup size="large">
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
                <Radio value="3">3</Radio>
            </RadioGroup>
        </Inline>
    )
    .add("selection", () =>
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
    .add("number", () =>
        <RadioGroup defaultValue={2}>
            <Radio value={1}>1</Radio>
            <Radio value={2}>2</Radio>
            <Radio value={3}>3</Radio>
        </RadioGroup>
    )
    .add("disabled", () =>
        <RadioGroup disabled>
            <Radio value="1">1</Radio>
            <Radio value="2">2</Radio>
            <Radio value="3">3</Radio>
        </RadioGroup>
    )
    .add("disabled radio", () =>
        <RadioGroup>
            <Radio disabled value="1">1</Radio>
            <Radio value="2">2</Radio>
            <Radio value="3">3</Radio>
        </RadioGroup>
    )
    .add("horizontal", () =>
        <Stack>
            <RadioGroup size="small" orientation="horizontal">
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
                <Radio value="3">3</Radio>
            </RadioGroup>
            <RadioGroup orientation="horizontal">
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
                <Radio value="3">3</Radio>
            </RadioGroup>
            <RadioGroup size="large" orientation="horizontal">
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
                <Radio value="3">3</Radio>
            </RadioGroup>
        </Stack>
    )
    .add("gap", () =>
        <RadioGroup gap={13}>
            <Radio value="1">1</Radio>
            <Radio value="2">2</Radio>
            <Radio value="3">3</Radio>
        </RadioGroup>
    )
    .add("wrapped", () =>
        <div style={{ width: "130px" }}>
            <RadioGroup wrap orientation="horizontal">
                {
                    ["1", "2", "3", "4", "5", "6", "7", "8"].map(x =>
                        <Radio style={{ width: "35px" }} value={x} key={x}>{x}</Radio>
                    )
                }
            </RadioGroup>
        </div>
    )
    .add("toggle buttons", () =>
        <RadioGroup gap={2} orientation="horizontal" defaultValue="2">
            <ToggleButton variant="outline" shape="circular" value="1">1</ToggleButton>
            <ToggleButton variant="outline" shape="circular" value="2">2</ToggleButton>
            <ToggleButton variant="outline" shape="circular" value="3">3</ToggleButton>
        </RadioGroup>
    )
    .add("custom components", () =>
        <RadioGroup gap={2} orientation="horizontal" defaultValue="2">
            <CustomComponent value="1">1</CustomComponent>
            <CustomComponent value="2">2</CustomComponent>
            <CustomComponent value="3">3</CustomComponent>
        </RadioGroup>
    )
    .add("render props", () =>
        <RadioGroup defaultValue="2">
            {
                ({ checkedValue }) =>
                    ["1", "2", "3"].map(x =>
                        <Radio
                            className={checkedValue === x ? "bg-primary-500" : undefined}
                            value={x}
                            key={x}
                        >
                            {x}
                        </Radio>
                    )
            }
        </RadioGroup>
    )
    .add("validation", () =>
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
    .add("styling", () =>
        <Inline>
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
    .add("reverse", () =>
        <Stack inline>
            <RadioGroup reverse label="Select a package">
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
                <Radio value="3">3</Radio>
            </RadioGroup>
            <RadioGroup reverse label="Select a package" description="You can find a detailed description of our flight packages on our website.">
                <Radio value="1">1</Radio>
                <Radio value="2">A very long option to read while you wait for the countdown to mars.</Radio>
                <Radio value="3">3</Radio>
            </RadioGroup>
        </Stack>
    )
    .add("autofocus", () =>
        <RadioGroup autoFocus defaultValue="2">
            <Radio value="1">1</Radio>
            <Radio value="2">2</Radio>
            <Radio value="3">3</Radio>
        </RadioGroup>
    )
    .add("when disabled do not autofocus", () =>
        <RadioGroup autoFocus disabled defaultValue="2">
            <Radio value="1">1</Radio>
            <Radio value="2">2</Radio>
            <Radio value="3">3</Radio>
        </RadioGroup>
    )
    .add("autofocus with delay", () =>
        <RadioGroup autoFocus autoFocusDelay={50} defaultValue="2">
            <Radio value="1">1</Radio>
            <Radio value="2">2</Radio>
            <Radio value="3">3</Radio>
        </RadioGroup>
    );

