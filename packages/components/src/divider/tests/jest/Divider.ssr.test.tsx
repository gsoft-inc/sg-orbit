/**
 * @jest-environment node
 */
import { Divider } from "@components/divider";
import { renderToString } from "react-dom/server";
import { throwOnConsoleLogs } from "@test-utils";

test("can render on the server", () => {
    throwOnConsoleLogs();

    const renderOnServer = () =>
        renderToString(
            <Divider />
        );

    expect(renderOnServer).not.toThrow();
});
