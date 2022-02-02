import { Box } from "@components/box";
import { Div } from "@components/html";
import { IllustratedMessage } from "@components/illustrated-message";
import { Image } from "@components/image";
import { Inline, Stack } from "@components/layout";
import { Nasa } from "./assets";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/IllustratedMessage")
        .segment(segment)
        .build();
}

stories()
    .add("default", () =>
        <IllustratedMessage>
            <Image src={Nasa} alt="Nasa" width="150px" />
        </IllustratedMessage>
    )
    .add("horizontal", () =>
        <Stack>
            <IllustratedMessage orientation="horizontal" width="700px" height="200px" backgroundColor="accent-2">
                <Image src={Nasa} alt="Nasa" />
            </IllustratedMessage>
            <Box width="700px" height="200px">
                <IllustratedMessage orientation="horizontal" backgroundColor="accent-2">
                    <Image src={Nasa} alt="Nasa" />
                </IllustratedMessage>
            </Box>
        </Stack>
    )
    .add("vertical", () =>
        <Inline>
            <IllustratedMessage orientation="vertical" width="200px" height="500px" backgroundColor="accent-2">
                <Image src={Nasa} alt="Nasa" />
            </IllustratedMessage>
            <Box width="200px" height="500px">
                <IllustratedMessage orientation="vertical" backgroundColor="accent-2">
                    <Image src={Nasa} alt="Nasa" />
                </IllustratedMessage>
            </Box>
        </Inline>
    )
    .add("straight", () =>
        <IllustratedMessage shape="straight" width="700px" height="200px" backgroundColor="accent-2">
            <Image src={Nasa} alt="Nasa" />
        </IllustratedMessage>
    )
    .add("rounded", () =>
        <IllustratedMessage shape="rounded" width="700px" height="200px" backgroundColor="accent-2">
            <Image src={Nasa} alt="Nasa" />
        </IllustratedMessage>
    )
    .add("color", () =>
        <Stack>
            <Inline>
                <IllustratedMessage backgroundColor="accent-2" width="700px" height="200px">
                    <Image src={Nasa} alt="Nasa" />
                </IllustratedMessage>
                <IllustratedMessage backgroundColor="rgb(151, 231, 222)" width="700px" height="200px">
                    <Image src={Nasa} alt="Nasa" />
                </IllustratedMessage>
            </Inline>
            <Inline>
                <IllustratedMessage backgroundColor="hsla(173, 63%, 75%, 1)" width="700px" height="200px">
                    <Image src={Nasa} alt="Nasa" />
                </IllustratedMessage>
                <IllustratedMessage backgroundColor="#97e7de" width="700px" height="200px">
                    <Image src={Nasa} alt="Nasa" />
                </IllustratedMessage>
            </Inline>
        </Stack>
    )
    .add("zoom", () =>
        <Stack>
            <Div className="zoom-in">
                <IllustratedMessage border="warning-7" width="700px" height="200px">
                    <Image src={Nasa} alt="Nasa" />
                </IllustratedMessage>
            </Div>
            <Div className="zoom-out">
                <IllustratedMessage border="warning-7" width="700px" height="200px">
                    <Image src={Nasa} alt="Nasa" />
                </IllustratedMessage>
            </Div>
        </Stack>

    )
    .add("styling", () =>
        <Stack>
            <IllustratedMessage border="warning-7" width="700px" height="200px">
                <Image src={Nasa} alt="Nasa" />
            </IllustratedMessage>
            <IllustratedMessage className="border-red" width="700px" height="200px">
                <Image src={Nasa} alt="Nasa" />
            </IllustratedMessage>
            <IllustratedMessage style={{ border: "1px solid red" }} width="700px" height="200px">
                <Image src={Nasa} alt="Nasa" />
            </IllustratedMessage>
        </Stack>
    );
