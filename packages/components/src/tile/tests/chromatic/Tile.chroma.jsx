import { Apollo11Banner, Apollo11Poster, Nasa } from "./assets";
import { Content } from "@components/placeholders";
import { Heading } from "@components/typography";
import { Illustration } from "@components/illustration";
import { Image } from "@components/image";
import { Inline, Stack } from "@components/layout";
import { Tile } from "@components/tile";
import { createTileTestSuite } from "./createTileTestSuite";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Tile")
        .segment(segment)
        .build();
}

createTileTestSuite(<Tile orientation="horizontal" width="37.5rem" />, stories("/horizontal"));

createTileTestSuite(<Tile orientation="vertical" width="18.75rem" />, stories("/vertical"));

stories()
    .add("images", () =>
        <Inline>
            <Stack>
                <Tile width="18.75rem" orientation="vertical">
                    <Image src={Apollo11Banner} alt="Apollo 11 Banner" />
                    <Heading>Fuel</Heading>
                    <Content>Fuel configuration and level</Content>
                </Tile>
                <Tile width="31.25rem" orientation="horizontal">
                    <Image src={Apollo11Poster} alt="Apollo 11 Poster" />
                    <Heading>Fuel</Heading>
                    <Content>Fuel configuration and level</Content>
                </Tile>
            </Stack>
        </Inline>
    )
    .add("flex layout", () =>
        <Stack>
            <Inline>
                <Tile width="31.25rem" orientation="vertical">
                    <Illustration color="purple-2">
                        <Image src={Nasa} width="6.25rem" alt="Nasa Logo" />
                    </Illustration>
                    <Heading>Fuel</Heading>
                    <Content>Fuel configuration and level</Content>
                </Tile>
                <Tile width="31.25rem" orientation="vertical">
                    <Illustration color="purple-2">
                        <Image src={Nasa} width="6.25rem" alt="Nasa Logo" />
                    </Illustration>
                    <Heading>Fuel</Heading>
                    <Content>Fuel configuration and level</Content>
                </Tile>
            </Inline>
            <Inline>
                <Tile width="31.25rem" orientation="horizontal">
                    <Illustration color="purple-2">
                        <Image src={Nasa} width="6.25rem" alt="Nasa Logo" />
                    </Illustration>
                    <Heading>Fuel</Heading>
                    <Content>Fuel configuration and level</Content>
                </Tile>
                <Tile width="31.25rem" orientation="horizontal">
                    <Illustration color="purple-2">
                        <Image src={Nasa} width="6.25rem" alt="Nasa Logo" />
                    </Illustration>
                    <Heading>Fuel</Heading>
                    <Content>Fuel configuration and level</Content>
                </Tile>
            </Inline>
        </Stack>
    );
