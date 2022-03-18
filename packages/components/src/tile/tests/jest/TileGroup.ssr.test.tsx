/**
 * @jest-environment node
 */
import { Content } from "@components/placeholders";
import { Heading } from "@components/typography";
import { Tile, TileGroup } from "@components/tile";
import { renderToString } from "react-dom/server";

test("Server-side rendering: renders on a server without crashing", () => {
    const renderOnServer = () =>
        renderToString(
            <TileGroup value={["2"]} selectionMode="single">
                <Tile value="1">
                    <Heading>1</Heading>
                    <Content>1</Content>
                </Tile>
                <Tile value="2" data-testid="tile-2">
                    <Heading>2</Heading>
                    <Content>2</Content>
                </Tile>
            </TileGroup>
        );

    expect(renderOnServer).not.toThrow();
});
