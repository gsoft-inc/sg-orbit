import { ErrorMessage, Field, HelpMessage, Label, ValidMessage } from "@react-components/field";
import { Form } from "@react-components/form";
import { Inline, Stack } from "@react-components/layout";
import { Switch } from "@react-components/switch";
import { TextArea, TextInput } from "@react-components/input";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories() {
    return storiesOfBuilder(module, createChromaticSection("Form"))
        .segment()
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

// With submit button? add a button slot?
// Inline fields?

stories()
    .add("default", () =>
        <Inline align="end" gap={13}>
            <Form size="small">
                <Field>
                    <Label>FullName</Label>
                    <TextInput />
                </Field>
                <Field>
                    <Label>Where to?</Label>
                    <TextArea />
                    <HelpMessage>Trips to Andromeda galaxy are available every 2 months.</HelpMessage>
                </Field>
            </Form>
            <Form>
                <Field>
                    <Label>FullName</Label>
                    <TextInput />
                </Field>
                <Field>
                    <Label>Where to?</Label>
                    <TextArea />
                    <HelpMessage>Trips to Andromeda galaxy are available every 2 months.</HelpMessage>
                </Field>
            </Form>
            <Form size="large">
                <Field>
                    <Label>FullName</Label>
                    <TextInput />
                </Field>
                <Field>
                    <Label>Where to?</Label>
                    <TextArea />
                    <HelpMessage>Trips to Andromeda galaxy are available every 2 months.</HelpMessage>
                </Field>
            </Form>
        </Inline>
    )
    .add("fluid", () =>
        <Form fluid>
            <Field>
                <Label>FullName</Label>
                <TextInput />
            </Field>
            <Field>
                <Label>Where to?</Label>
                <TextArea />
                <HelpMessage>Trips to Andromeda galaxy are available every 2 months.</HelpMessage>
            </Field>
        </Form>
    )
    .add("with fieldset", () =>
        <Form>
            <fieldset>
                <legend>Registration</legend>
                <Field>
                    <Label>FullName</Label>
                    <TextInput />
                </Field>
                <Field>
                    <Label>Where to?</Label>
                    <TextArea />
                    <HelpMessage>Trips to Andromeda galaxy are available every 2 months.</HelpMessage>
                </Field>
            </fieldset>
        </Form>
    );
