/**
 * @jest-environment node
 */
import { Div } from "@components/html";
import { Flex } from "@components/layout";
import { renderToString } from "react-dom/server";

test("Server-side rendering: renders on a server without crashing", () => {
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
