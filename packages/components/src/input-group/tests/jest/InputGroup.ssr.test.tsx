/**
 * @jest-environment node
 */
import { Field, Label } from "@components/field";
import { InputGroup } from "@components/input-group";
import { Text } from "@components/typography";
import { TextInput } from "@components/text-input";
import { renderToString } from "react-dom/server";

test("Server-side rendering: renders on a server without crashing", () => {
    const renderOnServer = () =>
        renderToString(
            <Field>
                <Label>Label</Label>
                <InputGroup>
                    <Text>Text</Text>
                    <TextInput aria-label="Label" />
                </InputGroup>
            </Field>
        );
    expect(renderOnServer).not.toThrow();
});
