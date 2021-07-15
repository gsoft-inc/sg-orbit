import { Content } from "@react-components/placeholders";
import { Heading } from "@react-components/typography";
import { Stack } from "@react-components/layout";
import { Tile, TileGroup, TileLink } from "@react-components/tile";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/TileGroup")
        .segment(segment)
        .build();
}

stories()
    .add("no selection", () =>
        <TileGroup selectionMode="none">
            <TileLink href="https://www.google.com">
                <Heading>Map</Heading>
                <Content>View space map</Content>
            </TileLink>
            <TileLink href="https://www.google.com">
                <Heading>Fuel</Heading>
                <Content>Fuel configuration and level</Content>
            </TileLink>
            <TileLink href="https://www.google.com">
                <Heading>Setting</Heading>
                <Content>Cockpit settings</Content>
            </TileLink>
        </TileGroup>
    )
    .add("single selection", () =>
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
    .add("multiple selection", () =>
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
    .add("1 per row", () =>
        <TileGroup rowSize={1}>
            <TileLink href="https://www.google.com">
                <Heading>Map</Heading>
                <Content>View space map</Content>
            </TileLink>
            <TileLink href="https://www.google.com">
                <Heading>Fuel</Heading>
                <Content>Fuel configuration and level</Content>
            </TileLink>
            <TileLink href="https://www.google.com">
                <Heading>Setting</Heading>
                <Content>Cockpit settings</Content>
            </TileLink>
        </TileGroup>
    )
    .add("2 per row", () =>
        <TileGroup rowSize={2}>
            <TileLink href="https://www.google.com">
                <Heading>Map</Heading>
                <Content>View space map</Content>
            </TileLink>
            <TileLink href="https://www.google.com">
                <Heading>Fuel</Heading>
                <Content>Fuel configuration and level</Content>
            </TileLink>
            <TileLink href="https://www.google.com">
                <Heading>Setting</Heading>
                <Content>Cockpit settings</Content>
            </TileLink>
        </TileGroup>
    )
    .add("3 per row", () =>
        <TileGroup rowSize={3}>
            <TileLink href="https://www.google.com">
                <Heading>Map</Heading>
                <Content>View space map</Content>
            </TileLink>
            <TileLink href="https://www.google.com">
                <Heading>Fuel</Heading>
                <Content>Fuel configuration and level</Content>
            </TileLink>
            <TileLink href="https://www.google.com">
                <Heading>Setting</Heading>
                <Content>Cockpit settings</Content>
            </TileLink>
        </TileGroup>
    )
    .add("wrap", () =>
        <TileGroup rowSize={6}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(x => (
                <Tile href="https://www.google.com" key={x}>
                    <Heading>{x}</Heading>
                    <Content>{x}</Content>
                </Tile>
            ))}
        </TileGroup>
    )
    .add("disabled", () =>
        <Stack>
            <TileGroup selectionMode="none" disabled rowSize={3}>
                <TileLink href="https://www.google.com">
                    <Heading>Map</Heading>
                    <Content>View space map</Content>
                </TileLink>
                <TileLink href="https://www.google.com">
                    <Heading>Fuel</Heading>
                    <Content>Fuel configuration and level</Content>
                </TileLink>
                <TileLink href="https://www.google.com">
                    <Heading>Setting</Heading>
                    <Content>Cockpit settings</Content>
                </TileLink>
            </TileGroup>
            <TileGroup selectionMode="single" disabled rowSize={3}>
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
        </Stack>
    );
