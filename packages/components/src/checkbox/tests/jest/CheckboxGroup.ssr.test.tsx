/**
 * @jest-environment node
 */
import { Checkbox, CheckboxGroup } from "@components/checkbox";
import { renderToString } from "react-dom/server";

test("can render on the server", () => {
    const renderOnServer = () =>
        renderToString(
            <CheckboxGroup autoFocus>
                <Checkbox value="1">1</Checkbox>
                <Checkbox value="2">2</Checkbox>
                <Checkbox value="3">3</Checkbox>
            </CheckboxGroup>
        );

    expect(renderOnServer).not.toThrow();
});