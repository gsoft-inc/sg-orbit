/**
 * @jest-environment node
 */
import { TextInput } from "@components/text-input";
import { renderToString } from "react-dom/server";
import { throwOnConsoleLogs } from "@test-utils";

test("can render on the server", () => {
    throwOnConsoleLogs();

    const renderOnServer = () =>
        renderToString(
            <TextInput autoFocus aria-label="Label" />
        );

    expect(renderOnServer).not.toThrow();
});
