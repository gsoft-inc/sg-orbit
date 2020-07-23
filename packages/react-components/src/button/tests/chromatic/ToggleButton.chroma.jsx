import { Inline, Stack } from "@react-components/layout";
import { LightbulbIcon } from "@react-components/icons";
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
        <Stack>
            <Inline align="end">
                <ToggleButton size="small">Cutoff</ToggleButton>
                <ToggleButton>Cutoff</ToggleButton>
                <ToggleButton size="large">Cutoff</ToggleButton>
            </Inline>
            <Inline align="end">
                <ToggleButton checked>Cutoff</ToggleButton>
                <ToggleButton active>Cutoff</ToggleButton>
                <ToggleButton focus>Cutoff</ToggleButton>
                <ToggleButton hover>Cutoff</ToggleButton>
                <ToggleButton focus hover>Cutoff</ToggleButton>
                <ToggleButton disabled>Cutoff</ToggleButton>
            </Inline>
            <div>
                <ToggleButton iconLeft={<LightbulbIcon />}>Cutoff</ToggleButton>
            </div>
        </Stack>
    )
    .add("circular outline", () =>
        <Stack>
            <Inline align="end">
                <ToggleButton size="small" variant="outline" circular>Aa</ToggleButton>
                <ToggleButton variant="outline" circular>Aa</ToggleButton>
                <ToggleButton size="large" variant="outline" circular>Aa</ToggleButton>
            </Inline>
            <Inline align="end">
                <ToggleButton checked variant="outline" circular>Aa</ToggleButton>
                <ToggleButton active variant="outline" circular>Aa</ToggleButton>
                <ToggleButton focus variant="outline" circular>Aa</ToggleButton>
                <ToggleButton hover variant="outline" circular>Aa</ToggleButton>
                <ToggleButton focus hover variant="outline" circular>Aa</ToggleButton>
                <ToggleButton disabled variant="outline" circular>Aa</ToggleButton>
            </Inline>
        </Stack>
    )
    .add("checked", () =>
        <Inline>
            <ToggleButton checked>Cutoff</ToggleButton>
            <ToggleButton defaultChecked>Cutoff</ToggleButton>
            <ToggleButton iconLeft={<LightbulbIcon />} checked>Cutoff</ToggleButton>
        </Inline>
    );




