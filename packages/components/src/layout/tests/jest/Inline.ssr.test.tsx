/**
 * @jest-environment node
 */
import { Div } from "@components/html";
import { Inline } from "@components/layout";
import { renderToString } from "react-dom/server";

test("Server-side rendering: renders on a server without crashing", () => {
    const renderOnServer = () =>
        renderToString(
            <Inline >
                <Div>Alpha</Div>
                <Div>Bravo</Div>
                <Div>Charlie</Div>
            </Inline>
        );

    expect(renderOnServer).not.toThrow();
});
