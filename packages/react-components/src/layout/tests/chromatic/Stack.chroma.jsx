import { Stack } from "@react-components/layout";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Stack"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

stories()
    .add("default", () =>
        <Stack>
            <div className="bg-primary-500">Alpha</div>
            <div className="bg-primary-500">Bravo</div>
            <div className="bg-primary-500">Charlie</div>
        </Stack>
    )
    .add("align start", () =>
        <Stack align="start">
            <div>Alpha</div>
            <div>Bravo</div>
            <div>Charlie</div>
        </Stack>
    )
    .add("align end", () =>
        <Stack align="end">
            <div>Alpha</div>
            <div>Bravo</div>
            <div>Charlie</div>
        </Stack>
    )
    .add("align center", () =>
        <Stack align="center">
            <div>Alpha</div>
            <div>Bravo</div>
            <div>Charlie</div>
        </Stack>
    )
    .add("vertical align start", () =>
        <Stack verticalAlign="start" style={{ height: "200px" }}>
            <div>Alpha</div>
            <div>Bravo</div>
            <div>Charlie</div>
        </Stack>
    )
    .add("vertical align end", () =>
        <Stack verticalAlign="end" style={{ height: "200px" }}>
            <div>Alpha</div>
            <div>Bravo</div>
            <div>Charlie</div>
        </Stack>
    )
    .add("vertical align center", () =>
        <Stack verticalAlign="center" style={{ height: "200px" }}>
            <div>Alpha</div>
            <div>Bravo</div>
            <div>Charlie</div>
        </Stack>
    )
    .add("gap", () =>
        <Stack gap={10}>
            <div>Alpha</div>
            <div>Bravo</div>
            <div>Charlie</div>
        </Stack>
    );
