import { AddIcon } from "@react-components/icons";
import { Stack } from "@react-components/stack";
import { ToggleButton, ToggleButtonGroup, ToggleIconButton } from "@react-components/button";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("ToggleButtonGroup"))
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
            <ToggleButtonGroup size="small">
                <ToggleButton value="1">Cutoff</ToggleButton>
                <ToggleButton value="2">Cutoff</ToggleButton>
                <ToggleButton value="3">Cutoff</ToggleButton>
            </ToggleButtonGroup>
            <ToggleButtonGroup>
                <ToggleButton value="1">Cutoff</ToggleButton>
                <ToggleButton value="2">Cutoff</ToggleButton>
                <ToggleButton value="3">Cutoff</ToggleButton>
            </ToggleButtonGroup>
            <ToggleButtonGroup size="large">
                <ToggleButton value="1">Cutoff</ToggleButton>
                <ToggleButton value="2">Cutoff</ToggleButton>
                <ToggleButton value="3">Cutoff</ToggleButton>
            </ToggleButtonGroup>
        </Stack>
    )
    .add("icon button", () =>
        <Stack direction="vertical">
            <ToggleButtonGroup size="small">
                <ToggleIconButton variant="outline" circular value="1"><AddIcon /></ToggleIconButton>
                <ToggleIconButton variant="outline" circular value="2"><AddIcon /></ToggleIconButton>
                <ToggleIconButton variant="outline" circular value="3"><AddIcon /></ToggleIconButton>
            </ToggleButtonGroup>
            <ToggleButtonGroup>
                <ToggleIconButton variant="outline" circular value="1"><AddIcon /></ToggleIconButton>
                <ToggleIconButton variant="outline" circular value="2"><AddIcon /></ToggleIconButton>
                <ToggleIconButton variant="outline" circular value="3"><AddIcon /></ToggleIconButton>
            </ToggleButtonGroup>
            <ToggleButtonGroup size="large">
                <ToggleIconButton variant="outline" circular value="1"><AddIcon /></ToggleIconButton>
                <ToggleIconButton variant="outline" circular value="2"><AddIcon /></ToggleIconButton>
                <ToggleIconButton variant="outline" circular value="3"><AddIcon /></ToggleIconButton>
            </ToggleButtonGroup>
        </Stack>
    )
    .add("multiple selection", () =>
        <Stack direction="vertical">
            <ToggleButtonGroup value="2">
                <ToggleButton variant="outline" circular value="1">1</ToggleButton>
                <ToggleButton variant="outline" circular value="2">2</ToggleButton>
                <ToggleButton variant="outline" circular value="3">3</ToggleButton>
            </ToggleButtonGroup>
            <ToggleButtonGroup value={["2"]}>
                <ToggleButton variant="outline" circular value="1">1</ToggleButton>
                <ToggleButton variant="outline" circular value="2">2</ToggleButton>
                <ToggleButton variant="outline" circular value="3">3</ToggleButton>
            </ToggleButtonGroup>
            <ToggleButtonGroup value={["1", "2", "3"]}>
                <ToggleButton variant="outline" circular value="1">1</ToggleButton>
                <ToggleButton variant="outline" circular value="2">2</ToggleButton>
                <ToggleButton variant="outline" circular value="3">3</ToggleButton>
            </ToggleButtonGroup>
            <ToggleButtonGroup defaultValue={["2"]}>
                <ToggleButton variant="outline" circular value="1">1</ToggleButton>
                <ToggleButton variant="outline" circular value="2">2</ToggleButton>
                <ToggleButton variant="outline" circular value="3">3</ToggleButton>
            </ToggleButtonGroup>
        </Stack>
    )
    .add("exclusive selection", () =>
        <Stack direction="vertical">
            <ToggleButtonGroup value="2">
                <ToggleButton variant="outline" circular value="1">1</ToggleButton>
                <ToggleButton variant="outline" circular value="2">2</ToggleButton>
                <ToggleButton variant="outline" circular value="3">3</ToggleButton>
            </ToggleButtonGroup>
            <ToggleButtonGroup defaultValue="2">
                <ToggleButton variant="outline" circular value="1">1</ToggleButton>
                <ToggleButton variant="outline" circular value="2">2</ToggleButton>
                <ToggleButton variant="outline" circular value="3">3</ToggleButton>
            </ToggleButtonGroup>
        </Stack>
    );
