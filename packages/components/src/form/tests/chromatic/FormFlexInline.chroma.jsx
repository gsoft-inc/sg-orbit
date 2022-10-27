import { Button, ButtonGroup } from "@components/button";
import { Checkbox } from "@components/checkbox";
import { Div } from "@components/html";
import { ErrorMessage, Field, HelpMessage, Label } from "@components/field";
import { Form } from "@components/form";
import { Inline } from "@components/layout";
import { TextInput } from "@components/text-input";
import { TextLinkAsButton } from "@components/link";

export default {
    title: "Chromatic/Form/flex inline",
    component: Form
};

export const Default = () =>
    <Form>
        <Field>
            <Label>Gender</Label>
            <TextInput />
        </Field>
        <Inline>
            <Field>
                <Label>First name</Label>
                <TextInput />
            </Field>
            <Field>
                <Label>Last name</Label>
                <TextInput />
            </Field>
            <Field>
                <Label>Username</Label>
                <TextInput />
            </Field>
        </Inline>
        <Inline>
            <Field>
                <Label>City</Label>
                <TextInput />
            </Field>
            <Field>
                <Label>State</Label>
                <TextInput />
            </Field>
            <Field>
                <Label>Zip</Label>
                <TextInput />
            </Field>
        </Inline>
        <Field>
            <Checkbox>Agree to terms and conditions</Checkbox>
        </Field>
        <ButtonGroup>
            <TextLinkAsButton type="reset">Reset</TextLinkAsButton>
            <Button type="submit" variant="secondary">Submit</Button>
        </ButtonGroup>
    </Form>;

export const Fluid = () =>
    <Form fluid>
        <Field>
            <Label>Gender</Label>
            <TextInput />
        </Field>
        <Inline>
            <Field>
                <Label>First name</Label>
                <TextInput />
            </Field>
            <Field>
                <Label>Last name</Label>
                <TextInput />
            </Field>
            <Field>
                <Label>Username</Label>
                <TextInput />
            </Field>
        </Inline>
        <Inline>
            <Field width="50%">
                <Label>City</Label>
                <TextInput />
            </Field>
            <Field width="25%">
                <Label>State</Label>
                <TextInput />
            </Field>
            <Field width="25%">
                <Label>Zip</Label>
                <TextInput />
            </Field>
        </Inline>
        <Field>
            <Checkbox>Agree to terms and conditions</Checkbox>
        </Field>
        <ButtonGroup>
            <TextLinkAsButton type="reset">Reset</TextLinkAsButton>
            <Button type="submit" variant="secondary">Submit</Button>
        </ButtonGroup>
    </Form>;

export const FluidFixWidthContainer = () =>
    <Div width={17}>
        <Form fluid>
            <Field>
                <Label>Gender</Label>
                <TextInput />
            </Field>
            <Inline>
                <Field>
                    <Label>First name</Label>
                    <TextInput />
                </Field>
                <Field>
                    <Label>Last name</Label>
                    <TextInput />
                </Field>
                <Field>
                    <Label>Username</Label>
                    <TextInput />
                </Field>
            </Inline>
            <Inline>
                <Field width="50%">
                    <Label>City</Label>
                    <TextInput />
                </Field>
                <Field width="25%">
                    <Label>State</Label>
                    <TextInput />
                </Field>
                <Field width="25%">
                    <Label>Zip</Label>
                    <TextInput />
                </Field>
            </Inline>
            <Field>
                <Checkbox>Agree to terms and conditions</Checkbox>
            </Field>
            <ButtonGroup>
                <TextLinkAsButton type="reset">Reset</TextLinkAsButton>
                <Button type="submit" variant="secondary">Submit</Button>
            </ButtonGroup>
        </Form>
    </Div>;

export const Messages = () =>
    <Form>
        <Inline>
            <Field>
                <Label>First name</Label>
                <TextInput />
                <HelpMessage>Non helpfull message!</HelpMessage>
            </Field>
            <Field>
                <Label>Last name</Label>
                <TextInput />
            </Field>
            <Field>
                <Label>Username</Label>
                <TextInput />
            </Field>
        </Inline>
        <Inline>
            <Field>
                <Label>City</Label>
                <TextInput />
            </Field>
            <Field>
                <Label>State</Label>
                <TextInput />
            </Field>
            <Field validationState="invalid">
                <Label>Zip</Label>
                <TextInput />
                <ErrorMessage>Invalid Zip code!</ErrorMessage>
            </Field>
        </Inline>
        <Field>
            <Checkbox>Agree to terms and conditions</Checkbox>
        </Field>
        <ButtonGroup>
            <TextLinkAsButton type="reset">Reset</TextLinkAsButton>
            <Button type="submit" variant="secondary">Submit</Button>
        </ButtonGroup>
    </Form>;

Default.storyName = "default";
Fluid.storyName = "fluid";
FluidFixWidthContainer.storyName = "fluid with fix width container";
Messages.storyName = "messages";
