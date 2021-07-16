import { Content } from "@react-components/placeholders";
import { Heading } from "@react-components/typography";
import { Inline, Stack } from "@react-components/layout";
import { TileGroup, TileLink } from "@react-components/tile";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/TileLink")
        .segment(segment)
        .build();
}

stories()
    .add("default", () =>
        <TileLink href="https://www.google.com">
            <Heading>Fuel</Heading>
            <Content>Fuel configuration and level</Content>
        </TileLink>
    )
    .add("external", () =>
        <TileLink href="https://www.google.com" external>
            <Heading>Fuel</Heading>
            <Content>Fuel configuration and level</Content>
        </TileLink>
    )
    .add("tile group", () =>
        <TileGroup>
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
    .add("states", () =>
        <Stack>
            <Inline>
                <TileLink active href="https://www.google.com">
                    <Heading>Map</Heading>
                    <Content>View space map</Content>
                </TileLink>
                <TileLink focus href="https://www.google.com">
                    <Heading>Map</Heading>
                    <Content>View space map</Content>
                </TileLink>
                <TileLink hover href="https://www.google.com">
                    <Heading>Map</Heading>
                    <Content>View space map</Content>
                </TileLink>
                <TileLink focus hover href="https://www.google.com">
                    <Heading>Map</Heading>
                    <Content>View space map</Content>
                </TileLink>
            </Inline>
            <Inline>
                <TileLink disabled href="https://www.google.com">
                    <Heading>Map</Heading>
                    <Content>View space map</Content>
                </TileLink>
                <TileLink disabled active href="https://www.google.com">
                    <Heading>Map</Heading>
                    <Content>View space map</Content>
                </TileLink>
                <TileLink disabled hover href="https://www.google.com">
                    <Heading>Map</Heading>
                    <Content>View space map</Content>
                </TileLink>
                <TileLink disabled focus href="https://www.google.com">
                    <Heading>Map</Heading>
                    <Content>View space map</Content>
                </TileLink>
            </Inline>
        </Stack>
    )
    .add("styling", () =>
        <Stack>
            <TileLink className="border-red" href="https://www.google.com">
                <Heading>Fuel</Heading>
                <Content>Fuel configuration and level</Content>
            </TileLink>
            <TileLink style={{ border: "1px solid red" }} href="https://www.google.com">
                <Heading>Fuel</Heading>
                <Content>Fuel configuration and level</Content>
            </TileLink>
        </Stack>
    );
