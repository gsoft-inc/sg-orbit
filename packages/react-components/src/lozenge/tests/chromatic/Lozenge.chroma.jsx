import { CheckCircleIcon } from "@react-components/icons";
import { Lozenge } from "@react-components/lozenge";
import { Stack, VerticalStack } from "@react-components/stack";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Lozenge"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .chromaticDelay(100)
            .build())
        .build();
}

stories()
    .add("default", () =>
        <Lozenge>New</Lozenge>
    )
    .add("icon", () =>
        <VerticalStack>
            <Stack align="end">
                <Lozenge size="small" iconLeft={<CheckCircleIcon />}>New</Lozenge>
                <Lozenge iconLeft={<CheckCircleIcon />}>New</Lozenge>
                <Lozenge size="large" iconLeft={<CheckCircleIcon />}>New</Lozenge>
            </Stack>
            <Stack align="end">
                <Lozenge size="small" iconRight={<CheckCircleIcon />}>New</Lozenge>
                <Lozenge iconRight={<CheckCircleIcon />}>New</Lozenge>
                <Lozenge size="large" iconRight={<CheckCircleIcon />}>New</Lozenge>
            </Stack>
        </VerticalStack>
    )
    .add("size", () =>
        <Stack align="end">
            <Lozenge size="small">New</Lozenge>
            <Lozenge>New</Lozenge>
            <Lozenge size="large">New</Lozenge>
        </Stack>
    )
    .add("styling", () =>
        <Stack>
            <Lozenge className="border-red">New</Lozenge>
            <Lozenge
                style={{
                    border: "1px solid red"
                }}
            >New</Lozenge>
        </Stack>
    );
