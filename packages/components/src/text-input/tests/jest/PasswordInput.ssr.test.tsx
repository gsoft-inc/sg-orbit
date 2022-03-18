/**
 * @jest-environment node
 */
import { PasswordInput } from "@components/text-input";
import { renderToString } from "react-dom/server";

test("can render on the server", () => {
    const renderOnServer = () =>
        renderToString(
            <PasswordInput
                aria-label="Label"
            />
        );

    expect(renderOnServer).not.toThrow();
});
