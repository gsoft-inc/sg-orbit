import { Stack } from "@react-components/stack";
import { ToggleIconButton } from "@react-components/button";
import { VerticalDotsIcon } from "@react-components/icons";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("ToggleIconButton"))
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
                <ToggleIconButton size="small" value="any"><VerticalDotsIcon /></ToggleIconButton>
                <ToggleIconButton value="any"><VerticalDotsIcon /></ToggleIconButton>
                <ToggleIconButton size="large" value="any"><VerticalDotsIcon /></ToggleIconButton>
            </Stack>
            <Stack align="end">
                <ToggleIconButton selected value="any"><VerticalDotsIcon /></ToggleIconButton>
                <ToggleIconButton active value="any"><VerticalDotsIcon /></ToggleIconButton>
                <ToggleIconButton focus value="any"><VerticalDotsIcon /></ToggleIconButton>
                <ToggleIconButton hover value="any"><VerticalDotsIcon /></ToggleIconButton>
                <ToggleIconButton focus hover value="any"><VerticalDotsIcon /></ToggleIconButton>
                <ToggleIconButton disabled value="any"><VerticalDotsIcon /></ToggleIconButton>
            </Stack>
        </Stack>
    )
    .add("circular outline", () =>
        <Stack direction="vertical">
            <Stack align="end">
                <ToggleIconButton size="small" variant="outline" circular value="any"><VerticalDotsIcon /></ToggleIconButton>
                <ToggleIconButton variant="outline" circular value="any"><VerticalDotsIcon /></ToggleIconButton>
                <ToggleIconButton size="large" variant="outline" circular value="any"><VerticalDotsIcon /></ToggleIconButton>
            </Stack>
            <Stack align="end">
                <ToggleIconButton selected variant="outline" circular value="any"><VerticalDotsIcon /></ToggleIconButton>
                <ToggleIconButton active variant="outline" circular value="any"><VerticalDotsIcon /></ToggleIconButton>
                <ToggleIconButton focus variant="outline" circular value="any"><VerticalDotsIcon /></ToggleIconButton>
                <ToggleIconButton hover variant="outline" circular value="any"><VerticalDotsIcon /></ToggleIconButton>
                <ToggleIconButton focus hover variant="outline" circular value="any"><VerticalDotsIcon /></ToggleIconButton>
                <ToggleIconButton disabled variant="outline" circular value="any"><VerticalDotsIcon /></ToggleIconButton>
            </Stack>
        </Stack>
    )
    .add("selected", () =>
        <Stack>
            <ToggleIconButton selected value="any"><VerticalDotsIcon /></ToggleIconButton>
            <ToggleIconButton defaultSelected value="any"><VerticalDotsIcon /></ToggleIconButton>
        </Stack>
    );




