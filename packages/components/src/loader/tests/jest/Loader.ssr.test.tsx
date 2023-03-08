/**
 * @jest-environment node
 */
import { Loader } from "@components/loader";
import { renderToString } from "react-dom/server";
import { throwOnConsoleLogs } from "@test-utils";

test("can render on the server", () => {
    throwOnConsoleLogs();

    const renderOnServer = () =>
        renderToString(
            <Loader aria-label="Loading..." />
        );

    expect(renderOnServer).not.toThrow();
});
