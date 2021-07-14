import { CheckboxGroup } from "@react-components/checkbox";
import { Content } from "@react-components/placeholders";
import { Heading } from "@react-components/typography";
import { RadioGroup } from "@react-components/radio";
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
    .add("disabled", () =>
        <TileLink href="https://www.google.com" disabled>
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
    );
