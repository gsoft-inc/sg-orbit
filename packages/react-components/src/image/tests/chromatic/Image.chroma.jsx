import { Div } from "@react-components/html";
import { Image } from "@react-components/image";
import { Inline, Stack } from "@react-components/layout";
import { Launch, Mars } from "./assets";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Image")
        .segment(segment)
        .build();
}

stories()
    .add("default", () =>
        <Image src={Launch} alt="SpaceX launch" />
    )
    .add("contained", () =>
        <Div width={12} height={12}>
            <Image src={Launch} alt="SpaceX launch" />
        </Div>
    )
    .add("size", () =>
        <Stack>
            <Image width={12} src={Launch} alt="SpaceX launch" />
            <Image width={12} height={12} src={Launch} alt="SpaceX launch" />
        </Stack>
    )
    .add("straight", () =>
        <Inline alignY="end">
            <Image shape="straight" width={7} height={7} src={Launch} alt="SpaceX launch" />
            <Image shape="straight" width={10} height={10} src={Launch} alt="SpaceX launch" />
            <Image shape="straight" width={12} height={12} src={Launch} alt="SpaceX launch" />
            <Image shape="straight" width={14} height={14} src={Launch} alt="SpaceX launch" />
            <Image shape="straight" src={Launch} alt="SpaceX launch" />
        </Inline>
    )
    .add("rounded", () =>
        <Inline alignY="end">
            <Image shape="rounded" width={7} height={7} src={Launch} alt="SpaceX launch" />
            <Image shape="rounded" width={10} height={10} src={Launch} alt="SpaceX launch" />
            <Image shape="rounded" width={12} height={12} src={Launch} alt="SpaceX launch" />
            <Image shape="rounded" width={14} height={14} src={Launch} alt="SpaceX launch" />
            <Image shape="rounded" src={Launch} alt="SpaceX launch" />
        </Inline>
    )
    .add("circular", () =>
        <Inline alignY="end">
            <Image shape="circular" width={7} height={7} src={Launch} alt="SpaceX launch" />
            <Image shape="circular" width={10} height={10} src={Launch} alt="SpaceX launch" />
            <Image shape="circular" width={12} height={12} src={Launch} alt="SpaceX launch" />
            <Image shape="circular" width={14} height={14} src={Launch} alt="SpaceX launch" />
            <Image shape="circular" src={Launch} alt="SpaceX launch" />
        </Inline>
    )
    .add("object fit", () =>
        <Inline>
            <Div width={12} height={12}>
                <Image objectFit="fill" width="100%" height="100%" src={Launch} alt="SpaceX launch" />
            </Div>
            <Div width={12} height={12}>
                <Image objectFit="contain" width="100%" height="100%" src={Launch} alt="SpaceX launch" />
            </Div>
            <Div width={12} height={12}>
                <Image objectFit="cover" width="100%" height="100%" src={Launch} alt="SpaceX launch" />
            </Div>
            <Div width={12} height={12}>
                <Image objectFit="scale-down" width="100%" height="100%" src={Launch} alt="SpaceX launch" />
            </Div>
            <Div width={12} height={12}>
                <Image objectFit="none" width="100%" height="100%" src={Launch} alt="SpaceX launch" />
            </Div>
        </Inline>
    )
    .add("object position", () =>
        <Inline>
            <Image objectPosition="50% 50%" fit="none" width={12} height={12} src={Mars} alt="SpaceX launch" />
            <Image objectPosition="right top" fit="none" width={12} height={12} src={Mars} alt="SpaceX launch" />
            <Image objectPosition="left bottom" fit="none" width={12} height={12} src={Mars} alt="SpaceX launch" />
            <Image objectPosition="27 17" fit="none" width={12} height={12} src={Mars} alt="SpaceX launch" />
        </Inline>
    )
    .add("zoom", () =>
        <>
            <Div className="zoom-in">
                <Image src={Launch} alt="SpaceX launch" />
            </Div>
            <Div className="zoom-out">
                <Image src={Launch} alt="SpaceX launch" />
            </Div>
        </>
    )
    .add("styling", () =>
        <Inline>
            <Image border="sunray-10" src={Mars} alt="SpaceX launch" />
            <Image className="border-red" src={Mars} alt="SpaceX launch" />
            <Image style={{ border: "1px solid red" }} src={Mars} alt="SpaceX launch" />
        </Inline>
    );
