import { Box } from "@components/box";
import { Div } from "@components/html";
import { Illustration } from "@components/illustration";
import { Image } from "@components/image";
import { Inline, Stack } from "@components/layout";
import { Nasa } from "./assets";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Illustration")
        .segment(segment)
        .build();
}

stories()
    .add("default", () =>
        <Illustration>
            <Image src={Nasa} alt="Nasa" width="150px" />
        </Illustration>
    )
    .add("horizontal", () =>
        <Stack>
            <Illustration orientation="horizontal" width="700px" height="200px" backgroundColor="primary-2">
                <Image src={Nasa} alt="Nasa" />
            </Illustration>
            <Box width="700px" height="200px">
                <Illustration orientation="horizontal" backgroundColor="primary-2">
                    <Image src={Nasa} alt="Nasa" />
                </Illustration>
            </Box>
        </Stack>
    )
    .add("vertical", () =>
        <Inline>
            <Illustration orientation="vertical" width="200px" height="500px" backgroundColor="primary-2">
                <Image src={Nasa} alt="Nasa" />
            </Illustration>
            <Box width="200px" height="500px">
                <Illustration orientation="vertical" backgroundColor="primary-2">
                    <Image src={Nasa} alt="Nasa" />
                </Illustration>
            </Box>
        </Inline>
    )
    .add("straight", () =>
        <Illustration shape="straight" width="700px" height="200px" backgroundColor="primary-2">
            <Image src={Nasa} alt="Nasa" />
        </Illustration>
    )
    .add("rounded", () =>
        <Illustration shape="rounded" width="700px" height="200px" backgroundColor="primary-2">
            <Image src={Nasa} alt="Nasa" />
        </Illustration>
    )
    .add("color", () =>
        <Stack>
            <Inline>
                <Illustration backgroundColor="primary-2" width="700px" height="200px">
                    <Image src={Nasa} alt="Nasa" />
                </Illustration>
                <Illustration backgroundColor="rgb(151, 231, 222)" width="700px" height="200px">
                    <Image src={Nasa} alt="Nasa" />
                </Illustration>
            </Inline>
            <Inline>
                <Illustration backgroundColor="hsla(173, 63%, 75%, 1)" width="700px" height="200px">
                    <Image src={Nasa} alt="Nasa" />
                </Illustration>
                <Illustration backgroundColor="#97e7de" width="700px" height="200px">
                    <Image src={Nasa} alt="Nasa" />
                </Illustration>
            </Inline>
        </Stack>
    )
    .add("zoom", () =>
        <Stack>
            <Div className="zoom-in">
                <Illustration border="warning-7" width="700px" height="200px">
                    <Image src={Nasa} alt="Nasa" />
                </Illustration>
            </Div>
            <Div className="zoom-out">
                <Illustration border="warning-7" width="700px" height="200px">
                    <Image src={Nasa} alt="Nasa" />
                </Illustration>
            </Div>
        </Stack>

    )
    .add("styling", () =>
        <Stack>
            <Illustration border="warning-7" width="700px" height="200px">
                <Image src={Nasa} alt="Nasa" />
            </Illustration>
            <Illustration className="border-red" width="700px" height="200px">
                <Image src={Nasa} alt="Nasa" />
            </Illustration>
            <Illustration style={{ border: "1px solid red" }} width="700px" height="200px">
                <Image src={Nasa} alt="Nasa" />
            </Illustration>
        </Stack>
    );
