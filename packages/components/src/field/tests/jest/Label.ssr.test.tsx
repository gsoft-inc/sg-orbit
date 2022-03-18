/**
 * @jest-environment node
 */
import { Label } from "@components/field";
import { renderToString } from "react-dom/server";

test("can render on the server", () => {
    const renderOnServer = () =>
        renderToString(
            <Label>Hey!</Label>
        );

    expect(renderOnServer).not.toThrow();
});
