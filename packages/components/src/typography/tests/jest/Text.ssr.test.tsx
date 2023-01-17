/**
 * @jest-environment node
 */
import { Text } from "@components/typography";
import { renderToString } from "react-dom/server";
import { throwOnConsoleLogs } from "@jest-utils";

test("can render on the server", () => {
    throwOnConsoleLogs();

    const renderOnServer = () =>
        renderToString(
            <Text>Text</Text>
        );

    expect(renderOnServer).not.toThrow();
});
