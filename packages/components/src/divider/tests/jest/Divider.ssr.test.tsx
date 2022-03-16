/**
 * @jest-environment node
 */
import { Divider } from "@components/divider";
import { renderToString } from "react-dom/server";

test("Server-side rendering: renders on a server without crashing", () => {
    const renderOnServer = () =>
        renderToString(
            <Divider />
        );
    expect(renderOnServer).not.toThrow();
});
