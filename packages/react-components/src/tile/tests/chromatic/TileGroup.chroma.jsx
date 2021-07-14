/*
- default
- disabled
- wrap multiple line (should be by default)
*/

import { CheckboxGroup } from "@react-components/checkbox";
import { Content } from "@react-components/placeholders";
import { Heading } from "@react-components/typography";
import { RadioGroup } from "@react-components/radio";
import { Stack } from "../../../layout";
import { Tile, TileGroup } from "@react-components/tile";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/TileGroup")
        .segment(segment)
        .build();
}

stories()
    .add("default", () =>
        <TileGroup>
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
    )
    .add("wrap", () =>
        <TileGroup>
            <Tile>
                <Heading>1</Heading>
                <Content>1</Content>
            </Tile>
            <Tile>
                <Heading>2</Heading>
                <Content>2</Content>
            </Tile>
            <Tile>
                <Heading>3</Heading>
                <Content>3</Content>
            </Tile>
            <Tile>
                <Heading>4</Heading>
                <Content>4</Content>
            </Tile>
            <Tile>
                <Heading>5</Heading>
                <Content>5</Content>
            </Tile>
            <Tile>
                <Heading>6</Heading>
                <Content>6</Content>
            </Tile>
            <Tile>
                <Heading>7</Heading>
                <Content>7</Content>
            </Tile>
        </TileGroup>
    );
