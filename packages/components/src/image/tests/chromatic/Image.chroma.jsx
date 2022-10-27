import { Div } from "@components/html";
import { Image } from "@components/image";
import { Inline, Stack } from "@components/layout";
import { Launch, Mars } from "./assets";

export default {
    title: "Chromatic/Image",
    component: Image
};

export const Default = () =>
    <Image src={Launch} alt="SpaceX launch" />;

export const Contained = () =>
    <Div width="200px" height="200px">
        <Image src={Launch} alt="SpaceX launch" />
    </Div>;

export const Size = () =>
    <Stack>
        <Image width="200px" src={Launch} alt="SpaceX launch" />
        <Image width="200px" height="200px" src={Launch} alt="SpaceX launch" />
    </Stack>;

export const Straight = () =>
    <Inline alignY="end">
        <Image shape="straight" width="50px" height="50px" src={Launch} alt="SpaceX launch" />
        <Image shape="straight" width="100px" height="100px" src={Launch} alt="SpaceX launch" />
        <Image shape="straight" width="200px" height="200px" src={Launch} alt="SpaceX launch" />
        <Image shape="straight" width="300px" height="300px" src={Launch} alt="SpaceX launch" />
        <Image shape="straight" src={Launch} alt="SpaceX launch" />
    </Inline>;

export const Rounded = () =>
    <Inline alignY="end">
        <Image shape="rounded" width="50px" height="50px" src={Launch} alt="SpaceX launch" />
        <Image shape="rounded" width="100px" height="100px" src={Launch} alt="SpaceX launch" />
        <Image shape="rounded" width="200px" height="200px" src={Launch} alt="SpaceX launch" />
        <Image shape="rounded" width="300px" height="300px" src={Launch} alt="SpaceX launch" />
        <Image shape="rounded" src={Launch} alt="SpaceX launch" />
    </Inline>;

export const Circular = () =>
    <Inline alignY="end">
        <Image shape="circular" width="50px" height="50px" src={Launch} alt="SpaceX launch" />
        <Image shape="circular" width="100px" height="100px" src={Launch} alt="SpaceX launch" />
        <Image shape="circular" width="200px" height="200px" src={Launch} alt="SpaceX launch" />
        <Image shape="circular" width="300px" height="300px" src={Launch} alt="SpaceX launch" />
        <Image shape="circular" src={Launch} alt="SpaceX launch" />
    </Inline>;

export const ObjectFit = () =>
    <Inline>
        <Div width="200px" height="200px">
            <Image objectFit="fill" width="100%" height="100%" src={Launch} alt="SpaceX launch" />
        </Div>
        <Div width="200px" height="200px">
            <Image objectFit="contain" width="100%" height="100%" src={Launch} alt="SpaceX launch" />
        </Div>
        <Div width="200px" height="200px">
            <Image objectFit="cover" width="100%" height="100%" src={Launch} alt="SpaceX launch" />
        </Div>
        <Div width="200px" height="200px">
            <Image objectFit="scale-down" width="100%" height="100%" src={Launch} alt="SpaceX launch" />
        </Div>
        <Div width="200px" height="200px">
            <Image objectFit="none" width="100%" height="100%" src={Launch} alt="SpaceX launch" />
        </Div>
    </Inline>;

export const ObjectPosition = () =>
    <Inline>
        <Image objectPosition="50% 50%" fit="none" width="200px" height="200px" src={Mars} alt="SpaceX launch" />
        <Image objectPosition="right top" fit="none" width="200px" height="200px" src={Mars} alt="SpaceX launch" />
        <Image objectPosition="left bottom" fit="none" width="200px" height="200px" src={Mars} alt="SpaceX launch" />
        <Image objectPosition="27 17" fit="none" width="200px" height="200px" src={Mars} alt="SpaceX launch" />
    </Inline>;

export const Zoom = () =>
    <Stack>
        <Div className="zoom-in">
            <Image src={Launch} alt="SpaceX launch" />
        </Div>
        <Div className="zoom-out">
            <Image src={Launch} alt="SpaceX launch" />
        </Div>
    </Stack>;

export const Styling = () =>
    <Inline>
        <Image border="warning-7" src={Mars} alt="SpaceX launch" />
        <Image className="border-red" src={Mars} alt="SpaceX launch" />
        <Image style={{ border: "1px solid red" }} src={Mars} alt="SpaceX launch" />
    </Inline>;

Default.storyName = "default";
Contained.storyName = "contained";
Size.storyName = "size";
Straight.storyName = "straight";
Rounded.storyName = "rounded";
Circular.storyName = "circular";
ObjectFit.storyName = "object fit";
ObjectPosition.storyName = "object position";
Zoom.storyName = "zoom";
Styling.storyName = "styling";
