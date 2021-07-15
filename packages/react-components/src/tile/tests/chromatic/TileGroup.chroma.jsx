import { Content } from "@react-components/placeholders";
import { Heading } from "@react-components/typography";
import { Tile, TileGroup } from "@react-components/tile";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/TileGroup")
        .segment(segment)
        .build();
}

stories()
    .add("1 per row", () =>
        <TileGroup rowSize={1}>
            <Tile>
                <Heading>Map</Heading>
                <Content>View space map</Content>
            </Tile>
            <Tile>
                <Heading>Fuel</Heading>
                <Content>Fuel configuration and level</Content>
            </Tile>
            <Tile>
                <Heading>Setting</Heading>
                <Content>Cockpit settings</Content>
            </Tile>
        </TileGroup>
    )
    .add("2 per row", () =>
        <TileGroup rowSize={2}>
            <Tile>
                <Heading>Map</Heading>
                <Content>View space map</Content>
            </Tile>
            <Tile>
                <Heading>Fuel</Heading>
                <Content>Fuel configuration and level</Content>
            </Tile>
            <Tile>
                <Heading>Setting</Heading>
                <Content>Cockpit settings</Content>
            </Tile>
        </TileGroup>
    )
    .add("3 per row", () =>
        <TileGroup rowSize={3}>
            <Tile>
                <Heading>Map</Heading>
                <Content>View space map</Content>
            </Tile>
            <Tile>
                <Heading>Fuel</Heading>
                <Content>Fuel configuration and level</Content>
            </Tile>
            <Tile>
                <Heading>Setting</Heading>
                <Content>Cockpit settings</Content>
            </Tile>
        </TileGroup>
    )
    .add("wrap", () =>
        <TileGroup rowSize={6}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(x => (
                <Tile value={x} key={x}>
                    <Heading>{x}</Heading>
                    <Content>{x}</Content>
                </Tile>
            ))}
        </TileGroup>
    )
    .add("single", () =>
        <TileGroup selectionMode="single">
            <Tile value="map">
                <Heading>Map</Heading>
                <Content>View space map</Content>
            </Tile>
            <Tile value="fuel">
                <Heading>Fuel</Heading>
                <Content>Fuel configuration and level</Content>
            </Tile>
            <Tile value="setting">
                <Heading>Setting</Heading>
                <Content>Cockpit settings</Content>
            </Tile>
        </TileGroup>
    )
    .add("multiple", () =>
        <TileGroup selectionMode="multiple">
            <Tile value="map">
                <Heading>Map</Heading>
                <Content>View space map</Content>
            </Tile>
            <Tile value="field">
                <Heading>Fuel</Heading>
                <Content>Fuel configuration and level</Content>
            </Tile>
            <Tile value="setting">
                <Heading>Setting</Heading>
                <Content>Cockpit settings</Content>
            </Tile>
        </TileGroup>
    )
    .add("disabled", () =>
        <TileGroup disabled>
            <Tile>
                <Heading>Map</Heading>
                <Content>View space map</Content>
            </Tile>
            <Tile>
                <Heading>Fuel</Heading>
                <Content>Fuel configuration and level</Content>
            </Tile>
            <Tile>
                <Heading>Setting</Heading>
                <Content>Cockpit settings</Content>
            </Tile>
        </TileGroup>
    );
