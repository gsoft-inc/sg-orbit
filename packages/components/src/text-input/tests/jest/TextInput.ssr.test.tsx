/**
 * @jest-environment node
 */
import { TextInput } from "@components/text-input";
import { renderToString } from "react-dom/server";

test("can render on the server", () => {
    const renderOnServer = () =>
        renderToString(
            <TextInput autoFocus aria-label="Label" />
        );

    expect(renderOnServer).not.toThrow();
});
