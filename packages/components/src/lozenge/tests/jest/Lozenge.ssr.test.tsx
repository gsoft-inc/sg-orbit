/**
 * @jest-environment node
 */
import { Lozenge } from "@components/lozenge";
import { renderToString } from "react-dom/server";

test("Server-side rendering: renders on a server without crashing", () => {
    const renderOnServer = () =>
        renderToString(
            <Lozenge>New</Lozenge>
        );

    expect(renderOnServer).not.toThrow();
});
