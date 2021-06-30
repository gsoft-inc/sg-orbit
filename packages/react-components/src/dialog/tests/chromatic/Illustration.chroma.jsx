import { Illustration } from "@react-components/dialog";
import { Image } from "@react-components/image";
import { Nasa } from "./assets";
import { Stack } from "@react-components/layout";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Illustration")
        .segment(segment)
        .build();
}

/*
- default
- width
- height
- horizontal
    - full image
    - centered image
- vertical
    - full image
    - centered image
- color
- styling
*/

stories()
    .add("default", () =>
        <Illustration>
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
            <Illustration orientation="horizontal" style={{ height: "150px" }}>
                <Image src={Nasa} width="100px" alt="NASA" />
            </Illustration>
        </Stack>
    );
