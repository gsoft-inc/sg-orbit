import { Checkbox, CheckboxGroup } from "@react-components/checkbox";
import { GroupField, HelpMessage, Label } from "@react-components/field";
import { Inline } from "@react-components/layout";
import { Radio, RadioGroup } from "@react-components/radio";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("GroupField"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

stories()
    .add("orientation", () =>
        <Inline gap={13} verticalAlign="end">
            <GroupField>
                <Label>Select your packages</Label>
                <CheckboxGroup>
                    <Checkbox value="1">1</Checkbox>
                    <Checkbox value="2">2</Checkbox>
                    <Checkbox value="3">3</Checkbox>
                </CheckboxGroup>
                <HelpMessage>You can find a detailed description of our flight packages on our website.</HelpMessage>
            </GroupField>
            <GroupField>
                <Label>Select your packages</Label>
                <CheckboxGroup orientation="vertical">
                    <Checkbox value="1">1</Checkbox>
                    <Checkbox value="2">2</Checkbox>
                    <Checkbox value="3">3</Checkbox>
                </CheckboxGroup>
                <HelpMessage>You can find a detailed description of our flight packages on our website.</HelpMessage>
            </GroupField>
        </Inline>
    )
    .add("checkbox group", () =>
        <Inline gap={13} verticalAlign="end">
            <GroupField>
                <Label>Select your packages</Label>
                <CheckboxGroup>
                    <Checkbox value="1">1</Checkbox>
                    <Checkbox value="2">2</Checkbox>
                    <Checkbox value="3">3</Checkbox>
                </CheckboxGroup>
                <HelpMessage>You can find a detailed description of our flight packages on our website.</HelpMessage>
            </GroupField>
            <GroupField>
                <Label>Select your packages</Label>
                <CheckboxGroup orientation="vertical">
                    <Checkbox value="1">1</Checkbox>
                    <Checkbox value="2">2</Checkbox>
                    <Checkbox value="3">3</Checkbox>
                </CheckboxGroup>
                <HelpMessage>You can find a detailed description of our flight packages on our website.</HelpMessage>
            </GroupField>
        </Inline>
    )
    .add("radio group", () =>
        <Inline gap={13} verticalAlign="end">
            <GroupField>
                <Label>Select your packages</Label>
                <RadioGroup>
                    <Radio value="1">1</Radio>
                    <Radio value="2">2</Radio>
                    <Radio value="3">3</Radio>
                </RadioGroup>
                <HelpMessage>You can find a detailed description of our flight packages on our website.</HelpMessage>
            </GroupField>
            <GroupField>
                <Label>Select your packages</Label>
                <RadioGroup orientation="horizontal">
                    <Radio value="1">1</Radio>
                    <Radio value="2">2</Radio>
                    <Radio value="3">3</Radio>
                </RadioGroup>
                <HelpMessage>You can find a detailed description of our flight packages on our website.</HelpMessage>
            </GroupField>
        </Inline>
    )
    .add("styling", () =>
        <Inline>
            <GroupField className="border-red">
                <RadioGroup>
                    <Radio value="1">1</Radio>
                    <Radio value="2">2</Radio>
                    <Radio value="3">3</Radio>
                </RadioGroup>
            </GroupField>
            <GroupField style={{ border: "1px solid red" }}>
                <RadioGroup>
                    <Radio value="1">1</Radio>
                    <Radio value="2">2</Radio>
                    <Radio value="3">3</Radio>
                </RadioGroup>
            </GroupField>
        </Inline>
    );
