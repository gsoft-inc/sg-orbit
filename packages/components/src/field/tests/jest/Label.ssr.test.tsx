/**
 * @jest-environment node
 */
import { Label } from "@components/field";
import { renderToString } from "react-dom/server";
import { throwOnConsoleLogs } from "@test-utils";

test("can render on the server", () => {
    throwOnConsoleLogs();

    const renderOnServer = () =>
        renderToString(
            <Label>Hey!</Label>
        );

    expect(renderOnServer).not.toThrow();
});
