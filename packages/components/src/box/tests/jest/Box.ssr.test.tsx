/**
 * @jest-environment node
 */
import { Box } from "@components/box";
import { renderToString } from "react-dom/server";
import { throwOnConsoleLogs } from "@jest-utils";

test("can render on the server", () => {
    throwOnConsoleLogs();

    const renderOnServer = () =>
        renderToString(
            <Box>Box</Box>
        );

    expect(renderOnServer).not.toThrow();
});
