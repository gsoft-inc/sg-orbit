/**
 * @jest-environment node
 */
import { Div } from "@components/html";
import { Flex } from "@components/layout";
import { renderToString } from "react-dom/server";
import { throwOnConsoleLogs } from "@test-utils";

test("can render on the server", () => {
    throwOnConsoleLogs();

    const renderOnServer = () =>
        renderToString(
            <Flex >
                <Div>Alpha</Div>
                <Div>Bravo</Div>
                <Div>Charlie</Div>
            </Flex>
        );

    expect(renderOnServer).not.toThrow();
});
