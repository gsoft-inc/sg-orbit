/**
 * @jest-environment node
 */
import { PasswordInput } from "@components/text-input";
import { renderToString } from "react-dom/server";

test("Server-side rendering: renders on a server without crashing", () => {
    const renderOnServer = () =>
        renderToString(
            <PasswordInput
                aria-label="Label"
            />
        );
    expect(renderOnServer).not.toThrow();
});
