/**
 * @jest-environment node
 */
import { Div } from "@components/html";
import { Stack } from "@components/layout";
import { renderToString } from "react-dom/server";

test("can render on the server", () => {
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
