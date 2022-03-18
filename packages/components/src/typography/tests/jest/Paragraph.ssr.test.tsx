/**
 * @jest-environment node
 */
import { Paragraph } from "@components/typography";
import { renderToString } from "react-dom/server";

test("can render on the server", () => {
    const renderOnServer = () =>
        renderToString(
            <Paragraph>
            Body
            </Paragraph>
        );

    expect(renderOnServer).not.toThrow();
});
