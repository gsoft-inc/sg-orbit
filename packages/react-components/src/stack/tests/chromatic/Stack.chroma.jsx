import { Stack } from "@react-components/stack";
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
    .add("horizontal", () =>
        <div className="flex flex-column">
            <div className="h10">
                <Stack fluid>
                    <div className="bg-primary-500">Alpha</div>
                    <div className="bg-primary-500">Bravo</div>
                    <div className="bg-primary-500">Charlie</div>
                </Stack>
            </div>
            <div className="h10">
                <Stack align="end" justify="end" fluid>
                    <div>Alpha</div>
                    <div>Bravo</div>
                    <div>Charlie</div>
                </Stack>
            </div>
            <div className="h10">
                <Stack align="center" justify="center" fluid>
                    <div>Alpha</div>
                    <div>Bravo</div>
                    <div>Charlie</div>
                </Stack>
            </div>
            <div className="h10">
                <Stack spacing={10}>
                    <div>Alpha</div>
                    <div>Bravo</div>
                    <div>Charlie</div>
                </Stack>
            </div>
            <div className="h10">
                <Stack spacing="200px">
                    <div>Alpha</div>
                    <div>Bravo</div>
                    <div>Charlie</div>
                </Stack>
            </div>
        </div>
    )
    .add("vertical", () =>
        <div className="flex" style={{ height: "300px" }}>
            <div className="w12 mr8">
                <Stack direction="vertical" fluid>
                    <div className="bg-primary-500">Alpha</div>
                    <div className="bg-primary-500">Bravo</div>
                    <div className="bg-primary-500">Charlie</div>
                </Stack>
            </div>
            <div className="w12 mr8">
                <Stack direction="vertical" align="end" justify="end" fluid>
                    <div>Alpha</div>
                    <div>Bravo</div>
                    <div>Charlie</div>
                </Stack>
            </div>
            <div className="w12 mr8">
                <Stack direction="vertical" align="center" justify="center" fluid>
                    <div>Alpha</div>
                    <div>Bravo</div>
                    <div>Charlie</div>
                </Stack>
            </div>
            <div className="w12">
                <Stack direction="vertical" spacing={10}>
                    <div>Alpha</div>
                    <div>Bravo</div>
                    <div>Charlie</div>
                </Stack>
            </div>
            <div className="w12">
                <Stack direction="vertical" spacing="200px">
                    <div>Alpha</div>
                    <div>Bravo</div>
                    <div>Charlie</div>
                </Stack>
            </div>
        </div>
    );
