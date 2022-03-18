/**
 * @jest-environment node
 */
import { Div } from "@components/html";
import { Stack } from "@components/layout";
import { renderToString } from "react-dom/server";

test("Server-side rendering: renders on a server without crashing", () => {
    const renderOnServer = () =>
        renderToString(
            <Stack >
                <Div>Alpha</Div>
                <Div>Bravo</Div>
                <Div>Charlie</Div>
            </Stack>
        );

    expect(renderOnServer).not.toThrow();
});
