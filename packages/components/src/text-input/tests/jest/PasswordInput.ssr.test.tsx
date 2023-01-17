/**
 * @jest-environment node
 */
import { PasswordInput } from "@components/text-input";
import { renderToString } from "react-dom/server";
import { throwOnConsoleLogs } from "@jest-utils";

test("can render on the server", () => {
    throwOnConsoleLogs();

    const renderOnServer = () =>
        renderToString(
            <PasswordInput
                aria-label="Label"
            />
        );

    expect(renderOnServer).not.toThrow();
});
