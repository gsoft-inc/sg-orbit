/**
 * @jest-environment node
 */
import { Spinner } from "@components/spinner";
import { renderToString } from "react-dom/server";
import { throwOnConsoleLogs } from "@test-utils";

test("can render on the server", () => {
    throwOnConsoleLogs();

    const renderOnServer = () =>
        renderToString(
            <Spinner aria-label="Loading" />
        );

    expect(renderOnServer).not.toThrow();
});
