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
            <Image src={Nasa} alt="Nasa" width="11" />
        </Illustration>
    )
    .add("horizontal", () =>
        <Stack>
            <Illustration orientation="horizontal" width="17" height="12" backgroundColor="primary-2">
                <Image src={Nasa} alt="Nasa" />
            </Illustration>
            <Box width="17" height="12">
                <Illustration orientation="horizontal" backgroundColor="primary-2">
                    <Image src={Nasa} alt="Nasa" />
                </Illustration>
            </Box>
        </Stack>
    )
    .add("vertical", () =>
        <Inline>
            <Illustration orientation="vertical" width="12" height="16" backgroundColor="primary-2">
                <Image src={Nasa} alt="Nasa" />
            </Illustration>
            <Box width="12" height="16">
                <Illustration orientation="vertical" backgroundColor="primary-2">
                    <Image src={Nasa} alt="Nasa" />
                </Illustration>
            </Box>
        </Inline>
    )
    .add("straight", () =>
        <Illustration shape="straight" width="17" height="12" backgroundColor="primary-2">
            <Image src={Nasa} alt="Nasa" />
        </Illustration>
    )
    .add("rounded", () =>
        <Illustration shape="rounded" width="17" height="12" backgroundColor="primary-2">
            <Image src={Nasa} alt="Nasa" />
        </Illustration>
    )
    .add("color", () =>
        <Stack>
            <Inline>
                <Illustration backgroundColor="primary-2" width="17" height="12">
                    <Image src={Nasa} alt="Nasa" />
                </Illustration>
                <Illustration backgroundColor="rgb(151, 231, 222)" width="17" height="12">
                    <Image src={Nasa} alt="Nasa" />
                </Illustration>
            </Inline>
            <Inline>
                <Illustration backgroundColor="hsla(173, 63%, 75%, 1)" width="17" height="12">
                    <Image src={Nasa} alt="Nasa" />
                </Illustration>
                <Illustration backgroundColor="#97e7de" width="17" height="12">
                    <Image src={Nasa} alt="Nasa" />
                </Illustration>
            </Inline>
        </Stack>
    )
    .add("styling", () =>
        <Stack>
            <Illustration border="sunray-10" width="17" height="12">
                <Image src={Nasa} alt="Nasa" />
            </Illustration>
            <Illustration className="border-red" width="17" height="12">
                <Image src={Nasa} alt="Nasa" />
            </Illustration>
            <Illustration style={{ border: "1px solid red" }} width="17" height="12">
                <Image src={Nasa} alt="Nasa" />
            </Illustration>
        </Stack>
    );
