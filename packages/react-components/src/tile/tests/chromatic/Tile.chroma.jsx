import { Apollo11Banner, Nasa } from "./assets";
import { Content } from "@react-components/placeholders";
import { Heading, Paragraph } from "@react-components/typography";
import { Illustration } from "@react-components/illustration";
import { Image } from "@react-components/image";
import { Stack } from "@react-components/layout";
import { Tile } from "@react-components/tile";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Tile")
        .segment(segment)
        .build();
}

stories()
    .add("default", () =>
        <Tile>
            <Heading>Fuel</Heading>
            <Content>Fuel configuration and level</Content>
        </Tile>
    )
    .add("image", () =>
        <Tile style={{ "width": "300px" }}>
            <Image src={Apollo11Banner} alt="Apollo 11 Banner" />
            <Heading>Fuel</Heading>
            <Content>Fuel configuration and level</Content>
        </Tile>
    )
    .add("illustration", () =>
        <Tile>
            <Illustration color="marine-100">
                <Image src={Nasa} width="100px" alt="Nasa Logo" />
            </Illustration>
            <Heading>Fuel</Heading>
            <Content>Fuel configuration and level</Content>
        </Tile>
    )
    .add("all sections", () =>
        <Tile>
            <Illustration color="marine-100">
                <Image src={Nasa} width="100px" alt="Nasa Logo" />
            </Illustration>
            <Heading>Fuel</Heading>
            <Content>Fuel configuration and level</Content>
        </Tile>
    )
    .add("heading overflow", () =>
        <Tile>
            <Heading>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas finibus a purus sit amet volutpat. Ut ac mauris sit amet elit rhoncus dictum. Morbi vehicula, tortor eget congue porta, mi ipsum interdum lectus, non lobortis dui nulla sed nisi.</Heading>
            <Content>Fuel configuration and level</Content>
        </Tile>
    )
    .add("content overflow", () =>
        <Tile>
            <Heading>Fuel</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
        </Tile>
    )
    .add("everything overflow", () =>
        <Tile>
            <Heading>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas finibus a purus sit amet volutpat. Ut ac mauris sit amet elit rhoncus dictum. Morbi vehicula, tortor eget congue porta, mi ipsum interdum lectus, non lobortis dui nulla sed nisi.</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye."</Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
        </Tile>
    )
    .add("default checked", () =>
        <Tile defaultChecked>
            <Heading>Fuel</Heading>
            <Content>Fuel configuration and level</Content>
        </Tile>
    )
    .add("states", () =>
        <Stack>
            <Tile active>
                <Heading>Fuel</Heading>
                <Content>Fuel configuration and level</Content>
            </Tile>
            <Tile focus>
                <Heading>Fuel</Heading>
                <Content>Fuel configuration and level</Content>
            </Tile>
            <Tile hover>
                <Heading>Fuel</Heading>
                <Content>Fuel configuration and level</Content>
            </Tile>
            <Tile focus hover>
                <Heading>Fuel</Heading>
                <Content>Fuel configuration and level</Content>
            </Tile>
            <Tile disabled>
                <Heading>Fuel</Heading>
                <Content>Fuel configuration and level</Content>
            </Tile>
        </Stack>
    )
    .add("styling", () =>
        <Stack>
            <Tile className="border-red">
                <Heading>Map</Heading>
                <Content>View space map</Content>
            </Tile>
            <Tile style={{ border: "1px solid red" }}>
                <Heading>Map</Heading>
                <Content>View space map</Content>
            </Tile>
        </Stack>
    );

