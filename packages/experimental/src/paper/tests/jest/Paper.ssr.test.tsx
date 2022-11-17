/**
 * @jest-environment node
 */
import { Paper } from "@experimental-components/paper";
import { renderToString } from "react-dom/server";
import { throwOnConsoleLogs } from "@jest-utils";

test("can render on the server", () => {
    throwOnConsoleLogs();

    const renderOnServer = () =>
        renderToString(
            <Paper color="alias-basic" />
        );

    expect(renderOnServer).not.toThrow();
});
