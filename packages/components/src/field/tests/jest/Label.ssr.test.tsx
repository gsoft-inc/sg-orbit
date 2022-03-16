/**
 * @jest-environment node
 */
import { Label } from "@components/field";
import { renderToString } from "react-dom/server";

test("Server-side rendering: renders on a server without crashing", () => {
    const renderOnServer = () =>
        renderToString(
            <Label>Hey!</Label>
        );
    expect(renderOnServer).not.toThrow();
});
