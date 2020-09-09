import { Checkbox, CheckboxGroup } from "@react-components/checkbox";
import { GroupField, HelpMessage, Label } from "@react-components/field";
import { Inline } from "@react-components/layout";
import { Radio, RadioGroup } from "@react-components/radio";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

// TODO:
// - FieldMessage.chroma.jsx
// - Label.chroma.jsx
// - Radio
// - RadioGroup
// - Switch
// - Clean up InputMessage, InputLabel etc...
// - Jest Tests (dont valider que input et label share le même id)
// - Write Field docs (have an example with Formik)
// - Form component with as="fieldset" ? With a doc example?

function stories() {
    return storiesOfBuilder(module, createChromaticSection("GroupField"))
        .segment()
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

stories()
    .add("orientation", () =>
        <Inline gap={13} align="end">
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
        <Inline>
            <GroupField>
                <Label>Select your packages</Label>
                <CheckboxGroup>
                    <Checkbox value="1">1</Checkbox>
                    <Checkbox value="2">2</Checkbox>
                    <Checkbox value="3">3</Checkbox>
                </CheckboxGroup>
                <HelpMessage>You can find a detailed description of our flight packages on our website.</HelpMessage>
            </GroupField>
        </Inline>
    )
    .add("radio group", () =>
        <Inline>
            <GroupField>
                <Label>Select your packages</Label>
                <RadioGroup>
                    <Radio value="1">1</Radio>
                    <Radio value="2">2</Radio>
                    <Radio value="3">3</Radio>
                </RadioGroup>
                <HelpMessage>You can find a detailed description of our flight packages on our website.</HelpMessage>
            </GroupField>
        </Inline>
    );
