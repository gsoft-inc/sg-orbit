import { Button } from "@components/button";
import { Div } from "@components/html";
import { Field, Label } from "@components/field";
import { Fieldset, Form } from "@components/form";
import { Inline, Stack } from "@components/layout";
import { TextInput } from "@components/text-input";

export default {
    title: "Chromatic/Fieldset",
    component: Fieldset
};

export const Default = () => (
    <Form>
        <Fieldset label="Shipping Address">
            <Inline>
                <Field>
                    <Label>First name</Label>
                    <TextInput />
                </Field>
                <Field>
                    <Label>Last name</Label>
                    <TextInput />
                </Field>
            </Inline>
            <Inline>
                <Field>
                    <Label>Address</Label>
                    <TextInput />
                </Field>
                <Field>
                    <Label>Appartment</Label>
                    <TextInput />
                </Field>
            </Inline>
            <Inline>
                <Field>
                    <Label>City</Label>
                    <TextInput />
                </Field>
                <Field>
                    <Label>Province</Label>
                    <TextInput />
                </Field>
                <Field>
                    <Label>Country</Label>
                    <TextInput />
                </Field>
            </Inline>
            <Field>
                <Label>Postal code</Label>
                <TextInput />
            </Field>
        </Fieldset>
        <Fieldset label="Billing Address">
            <Inline>
                <Field>
                    <Label>First name</Label>
                    <TextInput />
                </Field>
                <Field>
                    <Label>Last name</Label>
                    <TextInput />
                </Field>
            </Inline>
            <Inline>
                <Field>
                    <Label>Address</Label>
                    <TextInput />
                </Field>
                <Field>
                    <Label>Appartment</Label>
                    <TextInput />
                </Field>
            </Inline>
            <Inline>
                <Field>
                    <Label>City</Label>
                    <TextInput />
                </Field>
                <Field>
                    <Label>Province</Label>
                    <TextInput />
                </Field>
                <Field>
                    <Label>Country</Label>
                    <TextInput />
                </Field>
            </Inline>
            <Field>
                <Label>Postal code</Label>
                <TextInput />
            </Field>
        </Fieldset>
        <Button variant="secondary">Submit</Button>
    </Form>
);

Default.storyName = "default";

export const Zoom = () => (
    <Stack>
        <Div className="zoom-in">
            <Fieldset label="Shipping Address">
                <Inline>
                    <Field>
                        <Label>First name</Label>
                        <TextInput />
                    </Field>
                    <Field>
                        <Label>Last name</Label>
                        <TextInput />
                    </Field>
                </Inline>
            </Fieldset>
        </Div>
        <Div className="zoom-out">
            <Fieldset label="Shipping Address">
                <Inline>
                    <Field>
                        <Label>First name</Label>
                        <TextInput />
                    </Field>
                    <Field>
                        <Label>Last name</Label>
                        <TextInput />
                    </Field>
                </Inline>
            </Fieldset>
        </Div>
    </Stack>
);

Zoom.storyName = "zoom";

export const Styling = () => (
    <Stack>
        <Fieldset border="warning-7" label="Shipping Address">
            <Inline>
                <Field>
                    <Label>First name</Label>
                    <TextInput />
                </Field>
                <Field>
                    <Label>Last name</Label>
                    <TextInput />
                </Field>
            </Inline>
        </Fieldset>
        <Fieldset className="border-red" label="Shipping Address">
            <Inline>
                <Field>
                    <Label>First name</Label>
                    <TextInput />
                </Field>
                <Field>
                    <Label>Last name</Label>
                    <TextInput />
                </Field>
            </Inline>
        </Fieldset>
        <Fieldset style={{ border: "1px solid red" }} label="Shipping Address">
            <Inline>
                <Field>
                    <Label>First name</Label>
                    <TextInput />
                </Field>
                <Field>
                    <Label>Last name</Label>
                    <TextInput />
                </Field>
            </Inline>
        </Fieldset>
    </Stack>
);

Styling.storyName = "styling";
