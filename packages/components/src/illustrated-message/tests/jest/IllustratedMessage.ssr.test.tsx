/**
 * @jest-environment node
 */
import { Div } from "@components/html";
import { IllustratedMessage } from "@components/illustrated-message";
import { renderToString } from "react-dom/server";

test("Server-side rendering: renders on a server without crashing", () => {
    const renderOnServer = () =>
        renderToString(
            <IllustratedMessage>
                <Div slot="image">Image</Div>
            </IllustratedMessage>
        );

    expect(renderOnServer).not.toThrow();
});
