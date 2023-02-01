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
            <Image src={Nasa} alt="Nasa" width="9.375rem" />
        </Illustration>
    )
};

export const Horizontal: IllustrationStory = {
    storyName: "horizontal",
    render: () => (
        <Stack>
            <Illustration orientation="horizontal" width="43.75rem" height="12.5rem" backgroundColor="accent-2">
                <Image src={Nasa} alt="Nasa" />
            </Illustration>
            <Box width="43.75rem" height="12.5rem">
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
            <Illustration orientation="vertical" width="12.5rem" height="31.25rem" backgroundColor="accent-2">
                <Image src={Nasa} alt="Nasa" />
            </Illustration>
            <Box width="12.5rem" height="31.25rem">
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
        <Illustration shape="straight" width="43.75rem" height="12.5rem" backgroundColor="accent-2">
            <Image src={Nasa} alt="Nasa" />
        </Illustration>
    )
};

export const Rounded: IllustrationStory = {
    storyName: "rounded",
    render: () => (
        <Illustration shape="rounded" width="43.75rem" height="12.5rem" backgroundColor="accent-2">
            <Image src={Nasa} alt="Nasa" />
        </Illustration>
    )
};

export const Color: IllustrationStory = {
    storyName: "color",
    render: () => (
        <Stack>
            <Inline>
                <Illustration backgroundColor="accent-2" width="43.75rem" height="12.5rem">
                    <Image src={Nasa} alt="Nasa" />
                </Illustration>
                <Illustration backgroundColor="rgb(151, 231, 222)" width="43.75rem" height="12.5rem">
                    <Image src={Nasa} alt="Nasa" />
                </Illustration>
            </Inline>
            <Inline>
                <Illustration backgroundColor="hsla(173, 63%, 75%, 1)" width="43.75rem" height="12.5rem">
                    <Image src={Nasa} alt="Nasa" />
                </Illustration>
                <Illustration backgroundColor="#97e7de" width="43.75rem" height="12.5rem">
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
                <Illustration border="warning-7" width="43.75rem" height="12.5rem">
                    <Image src={Nasa} alt="Nasa" />
                </Illustration>
            </Div>
            <Div className="zoom-out">
                <Illustration border="warning-7" width="43.75rem" height="12.5rem">
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
            <Illustration border="warning-7" width="43.75rem" height="12.5rem">
                <Image src={Nasa} alt="Nasa" />
            </Illustration>
            <Illustration className="border-red" width="43.75rem" height="12.5rem">
                <Image src={Nasa} alt="Nasa" />
            </Illustration>
            <Illustration style={{ border: "0.0625rem solid red" }} width="43.75rem" height="12.5rem">
                <Image src={Nasa} alt="Nasa" />
            </Illustration>
        </Stack>
    )
};
