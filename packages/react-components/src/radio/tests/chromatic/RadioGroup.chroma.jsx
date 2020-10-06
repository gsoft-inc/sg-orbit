import { Counter } from "@react-components/counter";
import { Field, HelpMessage, Label } from "@react-components/field";
import { Inline, Stack } from "@react-components/layout";
import { Radio, RadioGroup } from "@react-components/radio";
import { Tag } from "@react-components/tag";
import { Text } from "@react-components/text";
import { ToggleButton } from "@react-components/button";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { useCallback } from "react";
import { useCheckable } from "@react-components/shared";

function CustomComponent({
    value,
    children,
    ...rest
}) {
    const [{ checked: isChecked, onCheck, ...checkableProps }] = useCheckable({ value });

    const handleCheck = useCallback(event => {
        onCheck(event, value);
    }, [value, onCheck]);

    return (
        <Tag
            {...rest}
            {...checkableProps}
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
            <RadioGroup size="sm">
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
                <Radio value="3">3</Radio>
            </RadioGroup>
            <RadioGroup>
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
                <Radio value="3">3</Radio>
            </RadioGroup>
            <RadioGroup size="lg">
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
                <RadioGroup orientation="horizontal" reverse label="Select a package">
                    <Radio value="1">1</Radio>
                    <Radio value="2">2</Radio>
                    <Radio value="3">
                        <Text>3</Text>
                        <Counter variant="divider">60</Counter>
                    </Radio>
                </RadioGroup>
                <div style={{ border: "1px solid #000", width: "100%", height: "50px" }}></div>
            </Inline>
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

stories("/horizontal")
    .add("default", () =>
        <RadioGroup orientation="horizontal">
            <Radio value="1">1</Radio>
            <Radio value="2">
                <Text>2</Text>
                <Counter>60</Counter>
            </Radio>
            <Radio value="3">3</Radio>
        </RadioGroup>
    )
    .add("size", () =>
        <Stack>
            <RadioGroup size="sm" orientation="horizontal">
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
                <Radio value="3">3</Radio>
            </RadioGroup>
            <RadioGroup orientation="horizontal">
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
                <Radio value="3">3</Radio>
            </RadioGroup>
            <RadioGroup size="lg" orientation="horizontal">
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
                <Radio value="3">3</Radio>
            </RadioGroup>
        </Stack>
    )
    .add("reverse", () =>
        <RadioGroup reverse orientation="horizontal">
            <Radio value="1">1</Radio>
            <Radio value="2">A very long option to read while you wait for the countdown to mars.</Radio>
            <Radio value="3">3</Radio>
        </RadioGroup>
    );

