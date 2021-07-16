import { Apollo11Banner, Apollo11Poster } from "./assets";
import { Content } from "@react-components/placeholders";
import { Heading } from "@react-components/typography";
import { Image } from "@react-components/image";
import { Inline, Stack } from "@react-components/layout";
import { Tile } from "@react-components/tile";
import { createTestSuite } from "./createTestSuite";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Tile")
        .segment(segment)
        .build();
}

createTestSuite(<Tile orientation="horizontal" style={{ "width": "600px" }} />, stories("/horizontal"));

createTestSuite(<Tile orientation="vertical" style={{ "width": "300px" }} />, stories("/vertical"));

stories()
    .add("images", () =>
        <Inline>
            <Stack>
                <Tile style={{ "width": "300px" }} orientation="vertical">
                    <Image src={Apollo11Banner} alt="Apollo 11 Banner" />
                    <Heading>Fuel</Heading>
                    <Content>Fuel configuration and level</Content>
                </Tile>
                <Tile style={{ "width": "500px" }} orientation="horizontal">
                    <Image src={Apollo11Poster} alt="Apollo 11 Poster" />
                    <Heading>Fuel</Heading>
                    <Content>Fuel configuration and level</Content>
                </Tile>
            </Stack>
        </Inline>
    );
