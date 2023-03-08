/**
 * @jest-environment node
 */
import { Heading } from "@components/typography";
import { renderToString } from "react-dom/server";
import { throwOnConsoleLogs } from "@test-utils";

test("can render on the server", () => {
    throwOnConsoleLogs();

    const renderOnServer = () =>
        renderToString(
            <Heading>Header</Heading>
        );

    expect(renderOnServer).not.toThrow();
});
