import { Box } from "../../../box";
import { Illustration } from "@react-components/illustration";
import { Image } from "@react-components/image";
import { Inline, Stack } from "@react-components/layout";
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
            <Illustration orientation="horizontal" width="700px" height="200px" color="primary-200">
                <Image src={Nasa} alt="Nasa" />
            </Illustration>
            <Box width="700px" height="200px">
                <Illustration orientation="horizontal" color="primary-200">
                    <Image src={Nasa} alt="Nasa" />
                </Illustration>
            </Box>
        </Stack>
    )
    .add("vertical", () =>
        <Inline>
            <Illustration orientation="vertical" width="200px" height="500px" color="primary-200">
                <Image src={Nasa} alt="Nasa" />
            </Illustration>
            <Box width="200px" height="500px">
                <Illustration orientation="vertical" color="primary-200">
                    <Image src={Nasa} alt="Nasa" />
                </Illustration>
            </Box>
        </Inline>
    )
    .add("straight", () =>
        <Illustration shape="straight" width="700px" height="200px" color="primary-200">
            <Image src={Nasa} alt="Nasa" />
        </Illustration>
    )
    .add("rounded", () =>
        <Illustration shape="rounded" width="700px" height="200px" color="primary-200">
            <Image src={Nasa} alt="Nasa" />
        </Illustration>
    )
    .add("color", () =>
        <Stack>
            <Inline>
                <Illustration color="primary-200" width="700px" height="200px">
                    <Image src={Nasa} alt="Nasa" />
                </Illustration>
                <Illustration color="rgb(151, 231, 222)" width="700px" height="200px">
                    <Image src={Nasa} alt="Nasa" />
                </Illustration>
            </Inline>
            <Inline>
                <Illustration color="hsla(173, 63%, 75%, 1)" width="700px" height="200px">
                    <Image src={Nasa} alt="Nasa" />
                </Illustration>
                <Illustration color="#97e7de" width="700px" height="200px">
                    <Image src={Nasa} alt="Nasa" />
                </Illustration>
            </Inline>
        </Stack>
    )
    .add("styling", () =>
        <Stack>
            <Illustration className="border-red" width="700px" height="200px">
                <Image src={Nasa} alt="Nasa" />
            </Illustration>
            <Illustration style={{ border: "1px solid red" }} width="700px" height="200px">
                <Image src={Nasa} alt="Nasa" />
            </Illustration>
        </Stack>
    );
