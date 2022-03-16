/**
 * @jest-environment node
 */
import { Dot } from "@components/dot";
import { renderToString } from "react-dom/server";

test("Server-side rendering: renders on a server without crashing", () => {
    const renderOnServer = () =>
        renderToString(
            <Dot color="alias-basic" />
        );
    expect(renderOnServer).not.toThrow();
});
