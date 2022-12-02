/**
 * @jest-environment node
 */
import { ContextualHelp } from "@experimental/contextual-help";
import { renderToString } from "react-dom/server";
import { throwOnConsoleLogs } from "@jest-utils";

test("can render on the server", () => {
    throwOnConsoleLogs();

    const renderOnServer = () =>
        renderToString(
            <ContextualHelp >
                Help message
            </ContextualHelp>
        );

    expect(renderOnServer).not.toThrow();
});
