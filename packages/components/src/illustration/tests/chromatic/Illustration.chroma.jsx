import { Box } from "@components/box";
import { Div } from "@components/html";
import { Illustration } from "@components/illustration";
import { Image } from "@components/image";
import { Inline, Stack } from "@components/layout";
import { Nasa } from "./assets";

export default {
    title: "Chromatic/Illustration",
    component: Illustration
};

export const Default = () => (
    <Illustration>
        <Image src={Nasa} alt="Nasa" width="150px" />
    </Illustration>
);

Default.storyName = "default";

export const Horizontal = () => (
    <Stack>
        <Illustration orientation="horizontal" width="700px" height="200px" backgroundColor="accent-2">
            <Image src={Nasa} alt="Nasa" />
        </Illustration>
        <Box width="700px" height="200px">
            <Illustration orientation="horizontal" backgroundColor="accent-2">
                <Image src={Nasa} alt="Nasa" />
            </Illustration>
        </Box>
    </Stack>
);

Horizontal.storyName = "horizontal";

export const Vertical = () => (
    <Inline>
        <Illustration orientation="vertical" width="200px" height="500px" backgroundColor="accent-2">
            <Image src={Nasa} alt="Nasa" />
        </Illustration>
        <Box width="200px" height="500px">
            <Illustration orientation="vertical" backgroundColor="accent-2">
                <Image src={Nasa} alt="Nasa" />
            </Illustration>
        </Box>
    </Inline>
);

Vertical.storyName = "vertical";

export const Straight = () => (
    <Illustration shape="straight" width="700px" height="200px" backgroundColor="accent-2">
        <Image src={Nasa} alt="Nasa" />
    </Illustration>
);

Straight.storyName = "straight";

export const Rounded = () => (
    <Illustration shape="rounded" width="700px" height="200px" backgroundColor="accent-2">
        <Image src={Nasa} alt="Nasa" />
    </Illustration>
);

Rounded.storyName = "rounded";

export const Color = () => (
    <Stack>
        <Inline>
            <Illustration backgroundColor="accent-2" width="700px" height="200px">
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
);

Color.storyName = "color";

export const Zoom = () => (
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
);

Zoom.storyName = "zoom";

export const Styling = () => (
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

Styling.storyName = "styling";
