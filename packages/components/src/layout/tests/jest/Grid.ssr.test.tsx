/**
 * @jest-environment node
 */
import { Div } from "@components/html";
import { Grid } from "@components/layout";
import { renderToString } from "react-dom/server";

test("can render on the server", () => {
    const renderOnServer = () =>
        renderToString(
            <Grid >
                <Div>Alpha</Div>
                <Div>Bravo</Div>
                <Div>Charlie</Div>
            </Grid>
        );

    expect(renderOnServer).not.toThrow();
});
