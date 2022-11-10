/**
 * @jest-environment node
 */
import { Spinner } from "@components/spinner";
import { renderToString } from "react-dom/server";
import { throwOnConsoleLogs } from "@jest-utils";

test("can render on the server", () => {
    throwOnConsoleLogs();

    const renderOnServer = () =>
        renderToString(
            <Spinner />
        );

    expect(renderOnServer).not.toThrow();
});
