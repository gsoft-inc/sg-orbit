import { Dot } from "@react-components/dot";
import { Inline, Stack } from "@react-components/layout";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Dot"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .chromaticDelay(100)
            .build())
        .build();
}

stories()
    .add("default", () =>
        <Inline align="end">
            <Dot size="sm"></Dot>
            <Dot></Dot>
            <Dot size="lg"></Dot>
        </Inline>
    )
    .add("label", () =>
        <Inline align="end">
            <Dot size="sm">Habitable</Dot>
            <Dot>Habitable</Dot>
            <Dot size="lg">Habitable</Dot>
        </Inline>
    )
    .add("color", () =>
        <Stack>
            <Dot color="success-500"></Dot>
            <Dot color="alert-500">Habitable</Dot>
        </Stack>
    )
    .add("disabled", () =>
        <Stack>
            <Dot disabled></Dot>
            <Dot disabled>Habitable</Dot>
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
