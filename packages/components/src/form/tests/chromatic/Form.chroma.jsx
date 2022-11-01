import { Button, ButtonGroup } from "@components/button";
import { DateInput } from "@components/date-input";
import { Div } from "@components/html";
import { Field, GroupField, HelpMessage, Label } from "@components/field";
import { Form } from "@components/form";
import { Inline } from "@components/layout";
import { Radio, RadioGroup } from "@components/radio";
import { TextArea } from "@components/text-area";
import { TextInput } from "@components/text-input";
import { TextLinkAsButton } from "@components/link";

export default {
    title: "Chromatic/Form",
    component: Form
};

export const Default = () => (
    <Inline alignY="end" gap={13}>
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
            <Button variant="secondary">Submit</Button>
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
            <TextLinkAsButton>Submit</TextLinkAsButton>
        </Form>
    </Inline>
);

Default.storyName = "default";

export const Fluid = () => (
    <Inline gap={13}>
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
            <Button variant="secondary">Submit</Button>
        </Form>
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
            <TextLinkAsButton>Submit</TextLinkAsButton>
        </Form>
    </Inline>
);

Fluid.storyName = "fluid";

export const Disabled = () => (
    <Inline alignY="end" gap={13}>
        <Form disabled>
            <Field>
                <Label>FullName</Label>
                <TextInput />
            </Field>
            <Field>
                <Label>Where to?</Label>
                <TextArea />
                <HelpMessage>Trips to Andromeda galaxy are available every 2 months.</HelpMessage>
            </Field>
            <Button variant="secondary">Submit</Button>
        </Form>
        <Form disabled>
            <Field>
                <Label>FullName</Label>
                <TextInput />
            </Field>
            <Field>
                <Label>Where to?</Label>
                <TextArea />
                <HelpMessage>Trips to Andromeda galaxy are available every 2 months.</HelpMessage>
            </Field>
            <TextLinkAsButton>Submit</TextLinkAsButton>
        </Form>
    </Inline>
);

Disabled.storyName = "disabled";

export const NestedDiv = () => (
    <Form>
        <Field>
            <Label>FullName</Label>
            <TextInput />
        </Field>
        <Div>
            <Field>
                <Label>Departure date</Label>
                <DateInput placeholder="dd/mm/yyyy" />
            </Field>
            <Div>
                <Field>
                    <Label>Where to?</Label>
                    <TextArea />
                    <HelpMessage>Trips to Andromeda galaxy are available every 2 months.</HelpMessage>
                </Field>
            </Div>
        </Div>
        <Button variant="secondary">Submit</Button>
    </Form>
);

NestedDiv.storyName = "nested div";

export const FormGroupField = () => (
    <Form>
        <Field>
            <Label>FullName</Label>
            <TextInput />
        </Field>
        <GroupField>
            <Label>Where to?</Label>
            <RadioGroup>
                <Radio value="mars">Mars</Radio>
                <Radio value="jupiter">Jupiter</Radio>
                <Radio value="pluto">Pluto</Radio>
            </RadioGroup>
            <HelpMessage>Trips to Andromeda galaxy are available every 2 months.</HelpMessage>
        </GroupField>
        <GroupField>
            <Label>Which package?</Label>
            <RadioGroup orientation="horizontal">
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
                <Radio value="3">3</Radio>
            </RadioGroup>
        </GroupField>
        <Button variant="secondary">Submit</Button>
    </Form>
);

FormGroupField.storyName = "group field";

export const ButtonAlignment = () => (
    <Inline>
        <Form>
            <Field>
                <Label>FullName</Label>
                <TextInput />
            </Field>
            <ButtonGroup align="start">
                <Button variant="secondary">Reset</Button>
                <Button>Submit</Button>
            </ButtonGroup>
        </Form>
        <Form>
            <Field>
                <Label>FullName</Label>
                <TextInput />
            </Field>
            <ButtonGroup align="center">
                <Button variant="secondary">Reset</Button>
                <Button>Submit</Button>
            </ButtonGroup>
        </Form>
        <Form>
            <Field>
                <Label>FullName</Label>
                <TextInput />
            </Field>
            <ButtonGroup align="end">
                <Button variant="secondary">Reset</Button>
                <Button>Submit</Button>
            </ButtonGroup>
        </Form>
    </Inline>
);

ButtonAlignment.storyName = "button alignment";

export const Styling = () => (
    <Inline>
        <Form border="warning-7">
            <Field>
                <TextInput placeholder="Where to?" />
            </Field>
        </Form>
        <Form className="border-red">
            <Field>
                <TextInput placeholder="Where to?" />
            </Field>
        </Form>
        <Form style={{ border: "1px solid red" }}>
            <Field>
                <TextInput placeholder="Where to?" />
            </Field>
        </Form>
    </Inline>
);

Styling.storyName = "styling";
