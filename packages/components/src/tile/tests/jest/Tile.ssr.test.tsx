/**
 * @jest-environment node
 */
import { Content } from "@components/placeholders";
import { Heading } from "@components/typography";
import { Tile } from "@components/tile";
import { renderToString } from "react-dom/server";

test("Server-side rendering: renders on a server without crashing", () => {
    const renderOnServer = () =>
        renderToString(
            <Tile autoFocus>
                <Heading>Fuel</Heading>
                <Content>Fuel configuration and level</Content>
            </Tile>
        );
    expect(renderOnServer).not.toThrow();
});
