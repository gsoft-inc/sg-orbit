import { AddIcon } from "@react-components/icons";
import { ToggleButton, ToggleButtonGroup, ToggleIconButton } from "@react-components/button";
import { VerticalStack } from "@react-components/stack";
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
        <VerticalStack>
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
        </VerticalStack>
    )
    .add("icon button", () =>
        <VerticalStack>
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
        </VerticalStack>
    )
    .add("multiple selection", () =>
        <VerticalStack>
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
        </VerticalStack>
    )
    .add("exclusive selection", () =>
        <VerticalStack>
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
        </VerticalStack>
    );
