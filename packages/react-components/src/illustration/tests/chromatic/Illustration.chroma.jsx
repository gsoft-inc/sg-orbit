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
        <Illustration orientation="vertical">
            <Image src={Nasa} width="100px" alt="NASA" />
        </Illustration>
    )
    .add("horizontal", () =>
        <Stack>
            <Illustration orientation="horizontal">
                <Image src={Nasa} width="100px" alt="NASA" />
            </Illustration>
            <Illustration orientation="horizontal" style={{ width: "300px" }}>
                <Image src={Nasa} width="100px" alt="NASA" />
            </Illustration>
            <Illustration orientation="horizontal" style={{ height: "200px" }}>
                <Image src={Nasa} width="100px" alt="NASA" />
            </Illustration>
        </Stack>
    )
    .add("vertical", () =>
        <Inline style={{ height: "100%" }}>
            <Illustration orientation="vertical">
                <Image src={Nasa} width="100px" alt="NASA" />
            </Illustration>
            <Illustration orientation="vertical" style={{ height: "300px" }}>
                <Image src={Nasa} width="100px" alt="NASA" />
            </Illustration>
            <Illustration orientation="vertical" style={{ height: "200px" }}>
                <Image src={Nasa} width="100px" alt="NASA" />
            </Illustration>
        </Inline>
    )
    .add("color", () =>
        <Stack>
            <Illustration color="primary-200">
                <Image src={Nasa} width="100px" alt="NASA" />
            </Illustration>
            <Illustration color="rgb(151, 231, 222)">
                <Image src={Nasa} width="100px" alt="NASA" />
            </Illustration>
            <Illustration color="hsla(173, 63%, 75%, 1)">
                <Image src={Nasa} width="100px" alt="NASA" />
            </Illustration>
            <Illustration color="#97e7de">
                <Image src={Nasa} width="100px" alt="NASA" />
            </Illustration>
        </Stack>
    )
    .add("styling", () =>
        <Stack>
            <Illustration className="border-red">
                <Image src={Nasa} width="100px" alt="NASA" />
            </Illustration>
            <Illustration style={{ border: "1px solid red" }}>
                <Image src={Nasa} width="100px" alt="NASA" />
            </Illustration>
        </Stack>
    );
