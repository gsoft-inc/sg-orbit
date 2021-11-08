import { Button } from "@components/button";
import { Div } from "@components/html";
import { Field, Label } from "@components/field";
import { Fieldset, Form } from "@components/form";
import { Inline, Stack } from "@components/layout";
import { TextInput } from "@components/text-input";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Fieldset")
        .segment(segment)
        .build();
}

stories()
    .add("default", () =>
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
            <Button color="secondary">Submit</Button>
        </Form>
    )
    .add("zoom", () =>
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
    )
    .add("styling", () =>
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
