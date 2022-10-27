import { Button, ButtonGroup } from "@components/button";
import { Checkbox } from "@components/checkbox";
import { ErrorMessage, Field, HelpMessage, Label } from "@components/field";
import { Form } from "@components/form";
import { Grid, repeat } from "@components/layout";
import { TextInput } from "@components/text-input";
import { TextLinkAsButton } from "@components/link";

export default {
    title: "Chromatic/Form/grid inline",
    component: Form
};

export const Default = () =>
    <Form>
        <Field>
            <Label>Gender</Label>
            <TextInput />
        </Field>
        <Grid templateColumns={repeat(3, "1fr")}>
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
        </Grid>
        <Grid templateColumns={repeat(3, "1fr")}>
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
        </Grid>
        <Field>
            <Checkbox>Agree to terms and conditions</Checkbox>
        </Field>
        <ButtonGroup>
            <TextLinkAsButton type="reset">Reset</TextLinkAsButton>
            <Button type="submit" variant="secondary">Submit</Button>
        </ButtonGroup>
    </Form>;

export const Fluid = () =>
    <Form>
        <Field>
            <Label>Gender</Label>
            <TextInput />
        </Field>
        <Grid templateColumns={repeat(3, "1fr")}>
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
        </Grid>
        <Grid templateColumns={repeat(3, "1fr")}>
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
        </Grid>
        <Field>
            <Checkbox>Agree to terms and conditions</Checkbox>
        </Field>
        <ButtonGroup>
            <TextLinkAsButton type="reset">Reset</TextLinkAsButton>
            <Button type="submit" variant="secondary">Submit</Button>
        </ButtonGroup>
    </Form>;

export const Messages = () =>
    <Form>
        <Grid templateColumns={repeat(3, "1fr")}>
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
        </Grid>
        <Grid templateColumns={repeat(3, "1fr")}>
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
        </Grid>
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
Messages.storyName = "messages";
