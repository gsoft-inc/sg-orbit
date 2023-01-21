/**
 * @jest-environment node
 */
import { TextArea } from "@components/text-area";
import { renderToString } from "react-dom/server";
import { throwOnConsoleLogs } from "@test-utils";

test("can render on the server", () => {
    throwOnConsoleLogs();

    const renderOnServer = () =>
        renderToString(
            <TextArea autoFocus aria-label="Label" />
        );

    expect(renderOnServer).not.toThrow();
});
