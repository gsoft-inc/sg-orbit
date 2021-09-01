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
        <div style={{ width: "200px", height: "200px" }}>
            <Image src={Launch} alt="SpaceX launch" />
        </div>
    )
    .add("size", () =>
        <Stack>
            <Image width="200px" src={Launch} alt="SpaceX launch" />
            <Image width="200px" height="200px" src={Launch} alt="SpaceX launch" />
            <Image size="200px" src={Launch} alt="SpaceX launch" />
        </Stack>
    )
    .add("straight", () =>
        <Inline alignY="end">
            <Image shape="straight" size="50px" src={Launch} alt="SpaceX launch" />
            <Image shape="straight" size="100px" src={Launch} alt="SpaceX launch" />
            <Image shape="straight" size="200px" src={Launch} alt="SpaceX launch" />
            <Image shape="straight" size="300px" src={Launch} alt="SpaceX launch" />
            <Image shape="straight" src={Launch} alt="SpaceX launch" />
        </Inline>
    )
    .add("rounded", () =>
        <Inline alignY="end">
            <Image shape="rounded" size="50px" src={Launch} alt="SpaceX launch" />
            <Image shape="rounded" size="100px" src={Launch} alt="SpaceX launch" />
            <Image shape="rounded" size="200px" src={Launch} alt="SpaceX launch" />
            <Image shape="rounded" size="300px" src={Launch} alt="SpaceX launch" />
            <Image shape="rounded" src={Launch} alt="SpaceX launch" />
        </Inline>
    )
    .add("circular", () =>
        <Inline alignY="end">
            <Image shape="circular" size="50px" src={Launch} alt="SpaceX launch" />
            <Image shape="circular" size="100px" src={Launch} alt="SpaceX launch" />
            <Image shape="circular" size="200px" src={Launch} alt="SpaceX launch" />
            <Image shape="circular" size="300px" src={Launch} alt="SpaceX launch" />
            <Image shape="circular" src={Launch} alt="SpaceX launch" />
        </Inline>
    )
    .add("fit", () =>
        <Inline>
            <div style={{ width: "200px", height: "200px" }}>
                <Image fit="fill" width="100%" height="100%" src={Launch} alt="SpaceX launch" />
            </div>
            <div style={{ width: "200px", height: "200px" }}>
                <Image fit="contain" width="100%" height="100%" src={Launch} alt="SpaceX launch" />
            </div>
            <div style={{ width: "200px", height: "200px" }}>
                <Image fit="cover" width="100%" height="100%" src={Launch} alt="SpaceX launch" />
            </div>
            <div style={{ width: "200px", height: "200px" }}>
                <Image fit="scale-down" width="100%" height="100%" src={Launch} alt="SpaceX launch" />
            </div>
            <div style={{ width: "200px", height: "200px" }}>
                <Image fit="none" width="100%" height="100%" src={Launch} alt="SpaceX launch" />
            </div>
        </Inline>
    )
    .add("position", () =>
        <Inline>
            <Image position="50% 50%" fit="none" width="200px" height="200px" className="border-red" src={Mars} alt="SpaceX launch" />
            <Image position="right top" fit="none" width="200px" height="200px" className="border-red" src={Mars} alt="SpaceX launch" />
            <Image position="left bottom" fit="none" width="200px" height="200px" className="border-red" src={Mars} alt="SpaceX launch" />
            <Image position="250px 150px" fit="none" width="200px" height="200px" className="border-red" src={Mars} alt="SpaceX launch" />
        </Inline>
    );
