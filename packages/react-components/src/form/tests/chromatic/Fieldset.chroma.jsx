import { Button } from "@react-components/button";
import { Field, Label } from "@react-components/field";
import { Fieldset, Form, Row } from "@react-components/form";
import { TextInput } from "@react-components/text-input";
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
                <Row>
                    <Field>
                        <Label>First name</Label>
                        <TextInput />
                    </Field>
                    <Field>
                        <Label>Last name</Label>
                        <TextInput />
                    </Field>
                </Row>
                <Row>
                    <Field>
                        <Label>Address</Label>
                        <TextInput />
                    </Field>
                    <Field>
                        <Label>Appartment</Label>
                        <TextInput />
                    </Field>
                </Row>
                <Row>
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
                </Row>
                <Field>
                    <Label>Postal code</Label>
                    <TextInput />
                </Field>
            </Fieldset>
            <Fieldset label="Billing Address">
                <Row>
                    <Field>
                        <Label>First name</Label>
                        <TextInput />
                    </Field>
                    <Field>
                        <Label>Last name</Label>
                        <TextInput />
                    </Field>
                </Row>
                <Row>
                    <Field>
                        <Label>Address</Label>
                        <TextInput />
                    </Field>
                    <Field>
                        <Label>Appartment</Label>
                        <TextInput />
                    </Field>
                </Row>
                <Row>
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
                </Row>
                <Field>
                    <Label>Postal code</Label>
                    <TextInput />
                </Field>
            </Fieldset>
            <Button>Submit</Button>
        </Form>
    );
