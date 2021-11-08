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
        <Dot color="alias-hard-break" />
    )
    .add("label", () =>
        <Dot color="alias-hard-break">Habitable</Dot>
    )
    .add("color", () =>
        <Stack>
            <Dot color="hsl(25, 69%, 41%)"></Dot>
            <Dot color="hsla(25, 69%, 41%, 0.5)"></Dot>
            <Dot color="#a4b5dd"></Dot>
            <Dot color="rgb(128,0,0)"></Dot>
            <Dot color="rgb(128,0,0,0.5)"></Dot>
            <Dot color="alias-accent"></Dot>
            <Dot color="red"></Dot>
            <Dot color="--o-ui-neutral-6"></Dot>
        </Stack>
    )
    .add("disabled", () =>
        <Stack>
            <Dot disabled color="alias-hard-break"></Dot>
            <Dot color="hsl(25, 69%, 41%)" disabled>Habitable</Dot>
        </Stack>
    )
    .add("zoom", () =>
        <Inline>
            <Div className="zoom-in">
                <Dot color="alias-hard-break" />
            </Div>
            <Div className="zoom-out">
                <Dot color="alias-hard-break" />
            </Div>
        </Inline>
    )
    .add("styling", () =>
        <Stack>
            <Inline>
                <Dot border="warning-7" color="alias-hard-break"></Dot>
                <Dot className="border-red" color="alias-hard-break"></Dot>
                <Dot style={{ border: "1px solid red" }} color="alias-hard-break"></Dot>
            </Inline>
            <Inline>
                <Dot border="warning-7" color="alias-hard-break">Habitable</Dot>
                <Dot className="border-red" color="alias-hard-break">Habitable</Dot>
                <Dot style={{ border: "1px solid red" }} color="alias-hard-break">Habitable</Dot>
            </Inline>
        </Stack>
    );
