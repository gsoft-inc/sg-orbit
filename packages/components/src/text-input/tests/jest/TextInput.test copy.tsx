/**
 * @jest-environment node
 */
import { TextInput } from "@components/text-input";
import { renderToString } from "react-dom/server";

test("Server-side rendering: renders on a server without crashing", () => {
    const renderOnServer = () =>
        renderToString(
            <TextInput autoFocus aria-label="Label" />
        );
    expect(renderOnServer).not.toThrow();
});
