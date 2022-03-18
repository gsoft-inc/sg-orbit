/**
 * @jest-environment node
 */
import { Box } from "@components/box";
import { renderToString } from "react-dom/server";

test("Server-side rendering: renders on a server without crashing", () => {
    const renderOnServer = () =>
        renderToString(
            <Box>Box</Box>
        );

    expect(renderOnServer).not.toThrow();
});
