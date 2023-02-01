import { Div } from "@components/html";
import { Image } from "@components/image";
import { Inline, Stack } from "@components/layout";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Launch, Mars } from "./assets";

export default {
    title: "Chromatic/Image",
    component: Image
} as ComponentMeta<typeof Image>;

type ImageStory = ComponentStoryObj<typeof Image>;

export const Default: ImageStory = {
    storyName: "default",
    render: () => (
        <Image src={Launch} alt="SpaceX launch" />
    )
};

export const Contained: ImageStory = {
    storyName: "contained",
    render: () => (
        <Div width="12.5rem" height="12.5rem">
            <Image src={Launch} alt="SpaceX launch" />
        </Div>
    )
};

export const Size: ImageStory = {
    storyName: "size",
    render: () => (
        <Stack>
            <Image width="12.5rem" src={Launch} alt="SpaceX launch" />
            <Image width="12.5rem" height="12.5rem" src={Launch} alt="SpaceX launch" />
        </Stack>
    )
};

export const Straight: ImageStory = {
    storyName: "straight",
    render: () => (
        <Inline alignY="end">
            <Image shape="straight" width="3.125rem" height="3.125rem" src={Launch} alt="SpaceX launch" />
            <Image shape="straight" width="6.25rem" height="6.25rem" src={Launch} alt="SpaceX launch" />
            <Image shape="straight" width="12.5rem" height="12.5rem" src={Launch} alt="SpaceX launch" />
            <Image shape="straight" width="18.75rem" height="18.75rem" src={Launch} alt="SpaceX launch" />
            <Image shape="straight" src={Launch} alt="SpaceX launch" />
        </Inline>
    )
};

export const Rounded: ImageStory = {
    storyName: "rounded",
    render: () => (
        <Inline alignY="end">
            <Image shape="rounded" width="3.125rem" height="3.125rem" src={Launch} alt="SpaceX launch" />
            <Image shape="rounded" width="6.25rem" height="6.25rem" src={Launch} alt="SpaceX launch" />
            <Image shape="rounded" width="12.5rem" height="12.5rem" src={Launch} alt="SpaceX launch" />
            <Image shape="rounded" width="18.75rem" height="18.75rem" src={Launch} alt="SpaceX launch" />
            <Image shape="rounded" src={Launch} alt="SpaceX launch" />
        </Inline>
    )
};

export const Circular: ImageStory = {
    storyName: "circular",
    render: () => (
        <Inline alignY="end">
            <Image shape="circular" width="3.125rem" height="3.125rem" src={Launch} alt="SpaceX launch" />
            <Image shape="circular" width="6.25rem" height="6.25rem" src={Launch} alt="SpaceX launch" />
            <Image shape="circular" width="12.5rem" height="12.5rem" src={Launch} alt="SpaceX launch" />
            <Image shape="circular" width="18.75rem" height="18.75rem" src={Launch} alt="SpaceX launch" />
            <Image shape="circular" src={Launch} alt="SpaceX launch" />
        </Inline>
    )
};

export const ObjectFit: ImageStory = {
    storyName: "object fit",
    render: () => (
        <Inline>
            <Div width="12.5rem" height="12.5rem">
                <Image objectFit="fill" width="100%" height="100%" src={Launch} alt="SpaceX launch" />
            </Div>
            <Div width="12.5rem" height="12.5rem">
                <Image objectFit="contain" width="100%" height="100%" src={Launch} alt="SpaceX launch" />
            </Div>
            <Div width="12.5rem" height="12.5rem">
                <Image objectFit="cover" width="100%" height="100%" src={Launch} alt="SpaceX launch" />
            </Div>
            <Div width="12.5rem" height="12.5rem">
                <Image objectFit="scale-down" width="100%" height="100%" src={Launch} alt="SpaceX launch" />
            </Div>
            <Div width="12.5rem" height="12.5rem">
                <Image objectFit="none" width="100%" height="100%" src={Launch} alt="SpaceX launch" />
            </Div>
        </Inline>
    )
};

export const ObjectPosition: ImageStory = {
    storyName: "object position",
    render: () => (
        <Inline>
            <Image objectPosition="50% 50%" objectFit="none" width="12.5rem" height="12.5rem" src={Mars} alt="SpaceX launch" />
            <Image objectPosition="right top" objectFit="none" width="12.5rem" height="12.5rem" src={Mars} alt="SpaceX launch" />
            <Image objectPosition="left bottom" objectFit="none" width="12.5rem" height="12.5rem" src={Mars} alt="SpaceX launch" />
            <Image objectPosition="27 17" objectFit="none" width="12.5rem" height="12.5rem" src={Mars} alt="SpaceX launch" />
        </Inline>
    )
};

export const Zoom: ImageStory = {
    storyName: "zoom",
    render: () => (
        <Stack>
            <Div className="zoom-in">
                <Image src={Launch} alt="SpaceX launch" />
            </Div>
            <Div className="zoom-out">
                <Image src={Launch} alt="SpaceX launch" />
            </Div>
        </Stack>
    )
};

export const Styling: ImageStory = {
    storyName: "styling",
    render: () => (
        <Inline>
            <Image border="warning-7" src={Mars} alt="SpaceX launch" />
            <Image className="border-red" src={Mars} alt="SpaceX launch" />
            <Image style={{ border: "0.0625rem solid red" }} src={Mars} alt="SpaceX launch" />
        </Inline>
    )
};
