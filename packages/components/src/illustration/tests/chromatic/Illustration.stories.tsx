import { Box } from "@components/box";
import { Div } from "@components/html";
import { Illustration } from "@components/illustration";
import { Image } from "@components/image";
import { Inline, Stack } from "@components/layout";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Nasa } from "./assets";

export default {
    title: "Chromatic/Illustration",
    component: Illustration
} as ComponentMeta<typeof Illustration>;

type IllustrationStory = ComponentStoryObj<typeof Illustration>;

export const Default: IllustrationStory = {
    storyName: "default",
    render: () => (
        <Illustration>
            <Image src={Nasa} alt="Nasa" width="150px" />
        </Illustration>
    )
};

export const Horizontal: IllustrationStory = {
    storyName: "horizontal",
    render: () => (
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
    )
};

export const Vertical: IllustrationStory = {
    storyName: "vertical",
    render: () => (
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
    )
};

export const Straight: IllustrationStory = {
    storyName: "straight",
    render: () => (
        <Illustration shape="straight" width="700px" height="200px" backgroundColor="accent-2">
            <Image src={Nasa} alt="Nasa" />
        </Illustration>
    )
};

export const Rounded: IllustrationStory = {
    storyName: "rounded",
    render: () => (
        <Illustration shape="rounded" width="700px" height="200px" backgroundColor="accent-2">
            <Image src={Nasa} alt="Nasa" />
        </Illustration>
    )
};

export const Color: IllustrationStory = {
    storyName: "color",
    render: () => (
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
    )
};

export const Zoom: IllustrationStory = {
    storyName: "zoom",
    render: () => (
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
};

export const Styling: IllustrationStory = {
    storyName: "styling",
    render: () => (
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
    )
};
