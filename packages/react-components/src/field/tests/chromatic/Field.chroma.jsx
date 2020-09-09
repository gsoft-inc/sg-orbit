import { ErrorMessage, Field, HelpMessage, Label, ValidMessage } from "@react-components/field";
import { Inline, Stack } from "@react-components/layout";
import { NumberInput, TextArea, TextInput } from "@react-components/input";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

// TODO:
// - FieldMessage.chroma.jsx
// - Label.chroma.jsx
// - Checkbox
// - CheckboxGroup
// - Radio
// - RadioGroup
// - Switch
// - Clean up InputMessage, InputLabel etc...
// - Jest Tests
// - Write Field docs (have an example with Formik)
// - Form component with as="fieldset" ? With a doc example?

function stories() {
    return storiesOfBuilder(module, createChromaticSection("Field"))
        .segment()
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

stories()
    .add("default", () =>
        <Inline align="end">
            <Field size="small">
                <TextInput placeholder="Where to?" />
            </Field>
            <Field>
                <TextInput placeholder="Where to?" />
            </Field>
            <Field size="large">
                <TextInput placeholder="Where to?" />
            </Field>
        </Inline>
    )
    .add("label", () =>
        <Inline align="end">
            <Field size="small">
                <Label>Where to?</Label>
                <TextInput />
            </Field>
            <Field>
                <Label>Where to?</Label>
                <TextInput />
            </Field>
            <Field size="large">
                <Label>Where to?</Label>
                <TextInput />
            </Field>
        </Inline>
    )
    .add("message", () =>
        <Stack gap={10}>
            <Inline align="end">
                <Field size="small">
                    <TextInput placeholder="Where to?" />
                    <HelpMessage>Must be a planet in earth solar system.</HelpMessage>
                </Field>
                <Field>
                    <TextInput placeholder="Where to?" />
                    <HelpMessage>Must be a planet in earth solar system.</HelpMessage>
                </Field>
                <Field size="large">
                    <TextInput placeholder="Where to?" />
                    <HelpMessage>Must be a planet in earth solar system.</HelpMessage>
                </Field>
            </Inline>
            <div>
                <Field>
                    <TextInput />
                    <HelpMessage>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.</HelpMessage>
                </Field>
            </div>
        </Stack>
    )
    .add("validation", () =>
        <Inline>
            <Field>
                <Label>Where to?</Label>
                <TextInput />
                <HelpMessage>Must be a planet in earth solar system.</HelpMessage>
                <ValidMessage>Thank you!</ValidMessage>
                <ErrorMessage>This is not a valid destination.</ErrorMessage>
            </Field>
            <Field validationState="valid">
                <Label>Where to?</Label>
                <TextInput />
                <HelpMessage>Must be a planet in earth solar system.</HelpMessage>
                <ValidMessage>Thank you!</ValidMessage>
                <ErrorMessage>This is not a valid destination.</ErrorMessage>
            </Field>
            <Field validationState="invalid">
                <Label>Where to?</Label>
                <TextInput />
                <HelpMessage>Must be a planet in earth solar system.</HelpMessage>
                <ValidMessage>Thank you!</ValidMessage>
                <ErrorMessage>This is not a valid destination.</ErrorMessage>
            </Field>
        </Inline>
    )
    .add("fluid", () =>
        <Field fluid>
            <Label>Where to?</Label>
            <TextInput />
            <HelpMessage>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.</HelpMessage>
        </Field>
    )
    .add("required", () =>
        <Field required>
            <Label>Where to?</Label>
            <TextInput />
            <HelpMessage>Must be a planet in earth solar system.</HelpMessage>
        </Field>
    )
    .add("states", () =>
        <Inline>
            <Field disabled>
                <Label>Where to?</Label>
                <TextInput />
                <HelpMessage>Must be a planet in earth solar system.</HelpMessage>
            </Field>
            <Field readOnly>
                <Label>Where to?</Label>
                <TextInput />
                <HelpMessage>Must be a planet in earth solar system.</HelpMessage>
            </Field>
        </Inline>
    )
    .add("text-input", () =>
        <Inline align="end">
            <Field size="small">
                <Label>Where to?</Label>
                <TextInput placeholder="Ex. Mars" />
                <HelpMessage>Must be a planet in earth solar system.</HelpMessage>
            </Field>
            <Field>
                <Label>Where to?</Label>
                <TextInput placeholder="Ex. Mars" />
                <HelpMessage>Must be a planet in earth solar system.</HelpMessage>
            </Field>
            <Field size="large">
                <Label>Where to?</Label>
                <TextInput placeholder="Ex. Mars" />
                <HelpMessage>Must be a planet in earth solar system.</HelpMessage>
            </Field>
        </Inline>
    )
    .add("number-input", () =>
        <Inline align="end">
            <Field size="small">
                <Label>Age</Label>
                <NumberInput placeholder="Ex. 89" />
                <HelpMessage>How long ago are you born?</HelpMessage>
            </Field>
            <Field>
                <Label>Age</Label>
                <NumberInput placeholder="Ex. 89" />
                <HelpMessage>How long ago are you born?</HelpMessage>
            </Field>
            <Field size="large">
                <Label>Age</Label>
                <NumberInput placeholder="Ex. 89" />
                <HelpMessage>How long ago are you born?</HelpMessage>
            </Field>
        </Inline>
    )
    .add("text-area", () =>
        <Inline align="end">
            <Field size="small">
                <Label>Where to?</Label>
                <TextArea placeholder="Ex. Mars" />
                <HelpMessage>Must be a planet in earth solar system.</HelpMessage>
            </Field>
            <Field>
                <Label>Where to?</Label>
                <TextArea placeholder="Ex. Mars" />
                <HelpMessage>Must be a planet in earth solar system.</HelpMessage>
            </Field>
            <Field size="large">
                <Label>Where to?</Label>
                <TextArea placeholder="Ex. Mars" />
                <HelpMessage>Must be a planet in earth solar system.</HelpMessage>
            </Field>
        </Inline>
    );
