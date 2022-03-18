/**
 * @jest-environment node
 */
import { Div } from "@components/html";
import { Flex } from "@components/layout";
import { renderToString } from "react-dom/server";

test("can render on the server", () => {
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
