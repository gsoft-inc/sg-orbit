import { CheckCircleIcon } from "@react-components/icons";
import { Inline, Stack } from "@react-components/layout";
import { Lozenge } from "@react-components/lozenge";
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
        <Stack>
            <Inline align="end">
                <Lozenge size="small" iconLeft={<CheckCircleIcon />}>New</Lozenge>
                <Lozenge iconLeft={<CheckCircleIcon />}>New</Lozenge>
                <Lozenge size="large" iconLeft={<CheckCircleIcon />}>New</Lozenge>
            </Inline>
            <Inline align="end">
                <Lozenge size="small" iconRight={<CheckCircleIcon />}>New</Lozenge>
                <Lozenge iconRight={<CheckCircleIcon />}>New</Lozenge>
                <Lozenge size="large" iconRight={<CheckCircleIcon />}>New</Lozenge>
            </Inline>
        </Stack>
    )
    .add("size", () =>
        <Inline align="end">
            <Lozenge size="small">New</Lozenge>
            <Lozenge>New</Lozenge>
            <Lozenge size="large">New</Lozenge>
        </Inline>
    )
    .add("styling", () =>
        <Inline>
            <Lozenge className="border-red">New</Lozenge>
            <Lozenge
                style={{
                    border: "1px solid red"
                }}
            >New</Lozenge>
        </Inline>
    );
