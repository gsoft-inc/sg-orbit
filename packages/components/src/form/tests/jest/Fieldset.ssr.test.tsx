/**
 * @jest-environment node
 */
import { Field, Label } from "@components/field";
import { Fieldset } from "@components/form";
import { TextInput } from "@components/text-input";
import { renderToString } from "react-dom/server";

test("can render on the server", () => {
    const renderOnServer = () =>
        renderToString(
            <Fieldset
                label="Full Name"
            >
                <Field>
                    <Label>First name</Label>
                    <TextInput />
                </Field>
                <Field>
                    <Label>Last name</Label>
                    <TextInput />
                </Field>
            </Fieldset>
        );

    expect(renderOnServer).not.toThrow();
});
