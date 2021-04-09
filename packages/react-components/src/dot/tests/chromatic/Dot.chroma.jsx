import { Dot } from "@react-components/dot";
import { Inline, Stack } from "@react-components/layout";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Dot")
        .segment(segment)
        .build();
}

stories()
    .add("default", () =>
        <Dot></Dot>
    )
    .add("label", () =>
        <Dot>Habitable</Dot>
    )
    .add("color", () =>
        <Stack>
            <Dot color="botanic-500"></Dot>
            <Dot color="beetle-500">Habitable</Dot>
            <Dot color="hsl(25, 69%, 41%)">Habitable</Dot>
            <Dot color="hsla(25, 69%, 41%, 0.5)">Habitable</Dot>
            <Dot color="#a4b5dd">Habitable</Dot>
            <Dot color="rgb(128,0,0)">Habitable</Dot>
            <Dot color="rgb(128,0,0,0.5)">Habitable</Dot>
            <Dot color="var(--o-ui-alias-background-1)">Habitable</Dot>
        </Stack>
    )
    .add("disabled", () =>
        <Stack>
            <Dot disabled></Dot>
            <Dot color="hsl(25, 69%, 41%)" disabled>Habitable</Dot>
        </Stack>
    )
    .add("styling", () =>
        <Stack>
            <Inline>
                <Dot className="bg-red"></Dot>
                <Dot style={{ backgroundColor: "red" }}></Dot>
            </Inline>
            <Inline>
                <Dot className="bg-red">Habitable</Dot>
                <Dot style={{ backgroundColor: "red" }}>Habitable</Dot>
                <Dot className="i">Habitable</Dot>
            </Inline>
        </Stack>
    );
