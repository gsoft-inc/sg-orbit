import { Content } from "@components/placeholders";
import { Div } from "@components/html";
import { Heading } from "@components/typography";
import { Stack } from "@components/layout";
import { Tile, TileGroup, TileLink } from "@components/tile";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
    title: "Chromatic/TileGroup",
    component: TileGroup
} as ComponentMeta<typeof TileGroup>;

type TileGroupStory = ComponentStoryObj<typeof TileGroup>;

export const Selection: TileGroupStory = {
    storyName: "selection",
    render: () => (
        <Stack>
            <TileGroup defaultValue={["fuel"]} selectionMode="single" rowSize={3}>
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
            <TileGroup defaultValue={["fuel", "setting"]} selectionMode="multiple" rowSize={3}>
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
    )
};

export const OnePerRow: TileGroupStory = {
    storyName: "1 per row",
    render: () => (
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
};

export const TwoPerRow: TileGroupStory = {
    storyName: "2 per row",
    render: () => (
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
};

export const ThreePerRow: TileGroupStory = {
    storyName: "3 per row",
    render: () => (
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
};

export const Wrap: TileGroupStory = {
    storyName: "wrap",
    render: () => (
        <TileGroup rowSize={6}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(x => (
                <TileLink href="https://www.google.com" key={x}>
                    <Heading>{x}</Heading>
                    <Content>{x}</Content>
                </TileLink>
            ))}
        </TileGroup>
    )
};

export const Disabled: TileGroupStory = {
    storyName: "disabled",
    render: () => (
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
            <TileGroup selectionMode="multiple" disabled rowSize={3}>
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
    )
};

export const Zoom: TileGroupStory = {
    storyName: "zoom",
    render: () => (
        <Stack>
            <Div className="zoom-in">
                <TileGroup rowSize={3}>
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
            </Div>
            <Div className="zoom-out">
                <TileGroup rowSize={3}>
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
            </Div>
        </Stack>
    )
};

export const Styling: TileGroupStory = {
    storyName: "styling",
    render: () => (
        <Stack>
            <TileGroup border="warning-7" rowSize={3}>
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
            <TileGroup className="border-red" rowSize={3}>
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
            <TileGroup style={{ border: "0.0625rem solid red" }} rowSize={3}>
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
        </Stack>
    )
};
