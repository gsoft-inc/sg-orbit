import { Apollo11Banner, Apollo11Poster, Nasa } from "./assets";
import { Content } from "@react-components/placeholders";
import { Div } from "@react-components/html";
import { Heading } from "@react-components/typography";
import { Illustration } from "@react-components/illustration";
import { Image } from "@react-components/image";
import { Inline, Stack } from "@react-components/layout";
import { Tile } from "@react-components/tile";
import { createTileTestSuite } from "./createTileTestSuite";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Tile")
        .segment(segment)
        .parameters({
            chromatic: { viewports: [900, 1280] }
        })
        .build();
}

createTileTestSuite(<Tile orientation="horizontal" width="600px" />, stories("/horizontal"));

createTileTestSuite(<Tile orientation="vertical" width="300px" />, stories("/vertical"));

stories()
    .add("images", () =>
        <Inline>
            <Stack>
                <Tile width="300px" orientation="vertical">
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
    )
    .add("zoom", () =>
        <Inline>
            <Stack>
                <Div className="zoom-in">
                    <Tile orientation="vertical">
                        <Image src={Apollo11Banner} alt="Apollo 11 Banner" />
                        <Heading>Fuel</Heading>
                        <Content>Fuel configuration and level</Content>
                    </Tile>
                </Div>
                <Div className="zoom-out">
                    <Tile orientation="vertical">
                        <Image src={Apollo11Banner} alt="Apollo 11 Banner" />
                        <Heading>Fuel</Heading>
                        <Content>Fuel configuration and level</Content>
                    </Tile>
                </Div>
            </Stack>
        </Inline>
    )
    .add("flex layout", () =>
        <Stack>
            <Inline>
                <Tile width="500px" orientation="vertical">
                    <Illustration color="marine-2">
                        <Image src={Nasa} width="100px" alt="Nasa Logo" />
                    </Illustration>
                    <Heading>Fuel</Heading>
                    <Content>Fuel configuration and level</Content>
                </Tile>
                <Tile width="500px" orientation="vertical">
                    <Illustration color="marine-2">
                        <Image src={Nasa} width="100px" alt="Nasa Logo" />
                    </Illustration>
                    <Heading>Fuel</Heading>
                    <Content>Fuel configuration and level</Content>
                </Tile>
            </Inline>
            <Inline>
                <Tile width="500px" orientation="horizontal">
                    <Illustration color="marine-2">
                        <Image src={Nasa} width="100px" alt="Nasa Logo" />
                    </Illustration>
                    <Heading>Fuel</Heading>
                    <Content>Fuel configuration and level</Content>
                </Tile>
                <Tile width="500px" orientation="horizontal">
                    <Illustration color="marine-2">
                        <Image src={Nasa} width="100px" alt="Nasa Logo" />
                    </Illustration>
                    <Heading>Fuel</Heading>
                    <Content>Fuel configuration and level</Content>
                </Tile>
            </Inline>
        </Stack>
    );
