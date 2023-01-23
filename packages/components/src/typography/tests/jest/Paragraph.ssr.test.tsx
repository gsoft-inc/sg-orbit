/**
 * @jest-environment node
 */
import { Paragraph } from "@components/typography";
import { renderToString } from "react-dom/server";
import { throwOnConsoleLogs } from "@test-utils";

test("can render on the server", () => {
    throwOnConsoleLogs();

    const renderOnServer = () =>
        renderToString(
            <Paragraph>
            Body
            </Paragraph>
        );

    expect(renderOnServer).not.toThrow();
});
