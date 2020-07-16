import { Stack } from "@react-components/stack";
import { ToggleButton } from "@react-components/button";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("ToggleButton"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .chromaticDelay(100)
            .build())
        .build();
}

stories()
    .add("default", () =>
        <Stack direction="vertical">
            <Stack align="end">
                <ToggleButton size="small" value="any">Cutoff</ToggleButton>
                <ToggleButton value="any">Cutoff</ToggleButton>
                <ToggleButton size="large" value="any">Cutoff</ToggleButton>
            </Stack>
            <Stack align="end">
                <ToggleButton selected value="any">Cutoff</ToggleButton>
                <ToggleButton active value="any">Cutoff</ToggleButton>
                <ToggleButton focus value="any">Cutoff</ToggleButton>
                <ToggleButton hover value="any">Cutoff</ToggleButton>
                <ToggleButton focus hover value="any">Cutoff</ToggleButton>
                <ToggleButton disabled value="any">Cutoff</ToggleButton>
            </Stack>
        </Stack>
    )
    .add("circular outline", () =>
        <Stack direction="vertical">
            <Stack align="end">
                <ToggleButton size="small" variant="outline" circular value="any">Aa</ToggleButton>
                <ToggleButton variant="outline" circular value="any">Aa</ToggleButton>
                <ToggleButton size="large" variant="outline" circular value="any">Aa</ToggleButton>
            </Stack>
            <Stack align="end">
                <ToggleButton selected variant="outline" circular value="any">Aa</ToggleButton>
                <ToggleButton active variant="outline" circular value="any">Aa</ToggleButton>
                <ToggleButton focus variant="outline" circular value="any">Aa</ToggleButton>
                <ToggleButton hover variant="outline" circular value="any">Aa</ToggleButton>
                <ToggleButton focus hover variant="outline" circular value="any">Aa</ToggleButton>
                <ToggleButton disabled variant="outline" circular value="any">Aa</ToggleButton>
            </Stack>
        </Stack>
    );




