import { Button } from "@react-components/button";
import { Checkbox } from "@react-components/checkbox";
import { ErrorMessage, Field, GroupField, HelpMessage, Label } from "@react-components/field";
import { Form, Row } from "@react-components/form";
import { Inline } from "@react-components/layout";
import { Radio, RadioGroup } from "@react-components/radio";
import { TextArea, TextInput } from "@react-components/input";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

/*
TODO:
- I don't think grid is good since as soon as there is an element between the form and the fields it doesn't work.
- Bottom margins are also a problem since it doesn't work when embedded (like InlineFields).
*/

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Form"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

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
                <Button>Submit</Button>
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
                <Button>Submit</Button>
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
                <Button>Submit</Button>
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
            <Button>Submit</Button>
        </Form>
    )
    .add("disabled", () =>
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
            <Button>Submit</Button>
        </Form>
    )
    .add("with fieldset", () =>
        <Form>
            <Field>
                <Label>FullName</Label>
                <TextInput />
            </Field>
            <fieldset>
                <legend>Trip</legend>
                <Field>
                    <Label>Departure date</Label>
                    <TextInput placeholder="AAAA/MM/DD" />
                </Field>
                <Field>
                    <Label>Where to?</Label>
                    <TextArea />
                    <HelpMessage>Trips to Andromeda galaxy are available every 2 months.</HelpMessage>
                </Field>
            </fieldset>
            <Button>Submit</Button>
        </Form>
    )
    .add("with nested div", () =>
        <Form>
            <Field>
                <Label>FullName</Label>
                <TextInput />
            </Field>
            <div>
                <Field>
                    <Label>Departure date</Label>
                    <TextInput placeholder="AAAA/MM/DD" />
                </Field>
                <div>
                    <Field>
                        <Label>Where to?</Label>
                        <TextArea />
                        <HelpMessage>Trips to Andromeda galaxy are available every 2 months.</HelpMessage>
                    </Field>
                </div>
            </div>
            <Button>Submit</Button>
        </Form>
    )
    .add("with group field", () =>
        <Form>
            <Field>
                <Label>FullName</Label>
                <TextInput />
            </Field>
            <GroupField>
                <Label>Where to?</Label>
                <RadioGroup>
                    <Radio>Mars</Radio>
                    <Radio>Jupiter</Radio>
                    <Radio>Pluto</Radio>
                </RadioGroup>
                <HelpMessage>Trips to Andromeda galaxy are available every 2 months.</HelpMessage>
            </GroupField>
            <GroupField>
                <Label>Which package?</Label>
                <RadioGroup orientation="horizontal">
                    <Radio>1</Radio>
                    <Radio>2</Radio>
                    <Radio>3</Radio>
                </RadioGroup>
            </GroupField>
            <Button>Submit</Button>
        </Form>
    );

stories("/inline")
    .add("default", () =>
        <Form>
            <Row>
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
            </Row>
            <Row>
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
            </Row>
            <Field>
                <Checkbox>Agree to terms and conditions</Checkbox>
            </Field>
            <Row>
                <Button variant="link" type="reset">Reset</Button>
                <Button type="submit">Submit</Button>
            </Row>
        </Form>
    )
    .add("fluid", () =>
        <Form fluid>
            <Row>
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
            </Row>
            <Row>
                <Field className="w-50">
                    <Label>City</Label>
                    <TextInput />
                </Field>
                <Field className="w-25">
                    <Label>State</Label>
                    <TextInput />
                </Field>
                <Field className="w-25">
                    <Label>Zip</Label>
                    <TextInput />
                </Field>
            </Row>
            <Field>
                <Checkbox>Agree to terms and conditions</Checkbox>
            </Field>
            <Row>
                <Button variant="link" type="reset">Reset</Button>
                <Button type="submit">Submit</Button>
            </Row>
        </Form>
    )
    .add("fluid with fix width container", () =>
        <div style={{ width: "700px" }}>
            <Form fluid>
                <Row>
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
                </Row>
                <Row>
                    <Field className="w-50">
                        <Label>City</Label>
                        <TextInput />
                    </Field>
                    <Field className="w-25">
                        <Label>State</Label>
                        <TextInput />
                    </Field>
                    <Field className="w-25">
                        <Label>Zip</Label>
                        <TextInput />
                    </Field>
                </Row>
                <Field>
                    <Checkbox>Agree to terms and conditions</Checkbox>
                </Field>
                <Row>
                    <Button variant="link" type="reset">Reset</Button>
                    <Button type="submit">Submit</Button>
                </Row>
            </Form>
        </div>
    )
    .add("messages", () =>
        <Form>
            <Row>
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
            </Row>
            <Row>
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
            </Row>
            <Field>
                <Checkbox>Agree to terms and conditions</Checkbox>
            </Field>
            <Row>
                <Button variant="link" type="reset">Reset</Button>
                <Button type="submit">Submit</Button>
            </Row>
        </Form>
    );
