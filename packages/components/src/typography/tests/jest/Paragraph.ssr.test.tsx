/**
 * @jest-environment node
 */
import { Paragraph } from "@components/typography";
import { renderToString } from "react-dom/server";

test("Server-side rendering: renders on a server without crashing", () => {
    const renderOnServer = () =>
        renderToString(
            <Paragraph>
            Body
            </Paragraph>
        );

    expect(renderOnServer).not.toThrow();
});
