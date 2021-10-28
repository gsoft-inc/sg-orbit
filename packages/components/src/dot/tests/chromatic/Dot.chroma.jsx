import { Div } from "@components/html";
import { Dot } from "@components/dot";
import { Inline, Stack } from "@components/layout";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Dot")
        .segment(segment)
        .build();
}

stories()
    .add("default", () =>
        <Dot color="alias-2" />
    )
    .add("label", () =>
        <Dot color="alias-2">Habitable</Dot>
    )
    .add("color", () =>
        <Stack>
            <Dot color="hsl(25, 69%, 41%)"></Dot>
            <Dot color="hsla(25, 69%, 41%, 0.5)"></Dot>
            <Dot color="#a4b5dd"></Dot>
            <Dot color="rgb(128,0,0)"></Dot>
            <Dot color="rgb(128,0,0,0.5)"></Dot>
            <Dot color="alias-primary-1"></Dot>
            <Dot color="red"></Dot>
            <Dot color="--o-ui-neutral-6"></Dot>
        </Stack>
    )
    .add("disabled", () =>
        <Stack>
            <Dot disabled color="alias-2"></Dot>
            <Dot color="hsl(25, 69%, 41%)" disabled>Habitable</Dot>
        </Stack>
    )
    .add("zoom", () =>
        <Inline>
            <Div className="zoom-in">
                <Dot color="alias-2" />
            </Div>
            <Div className="zoom-out">
                <Dot color="alias-2" />
            </Div>
        </Inline>
    )
    .add("styling", () =>
        <Stack>
            <Inline>
                <Dot border="warning-7" color="alias-2"></Dot>
                <Dot className="border-red" color="alias-2"></Dot>
                <Dot style={{ border: "1px solid red" }} color="alias-2"></Dot>
            </Inline>
            <Inline>
                <Dot border="warning-7" color="alias-2">Habitable</Dot>
                <Dot className="border-red" color="alias-2">Habitable</Dot>
                <Dot style={{ border: "1px solid red" }} color="alias-2">Habitable</Dot>
            </Inline>
        </Stack>
    );
