import { Stack } from "@react-components/layout";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Stack"))
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

stories()
    .add("default", () =>
        <div className="h10">
            <Stack fluid>
                <div className="bg-primary-500">Alpha</div>
                <div className="bg-primary-500">Bravo</div>
                <div className="bg-primary-500">Charlie</div>
            </Stack>
        </div>
    )
    .add("align end", () =>
        <div className="h10">
            <Stack align="end" justify="end" fluid>
                <div>Alpha</div>
                <div>Bravo</div>
                <div>Charlie</div>
            </Stack>
        </div>
    )
    .add("align center", () =>
        <div className="h10">
            <Stack align="center" justify="center" fluid>
                <div>Alpha</div>
                <div>Bravo</div>
                <div>Charlie</div>
            </Stack>
        </div>
    )
    .add("gap", () =>
        <div className="h10">
            <Stack gap={10} fluid>
                <div>Alpha</div>
                <div>Bravo</div>
                <div>Charlie</div>
            </Stack>
        </div>
    );
