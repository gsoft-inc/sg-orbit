import { CheckIcon } from "@react-components/icons";
import { Inline, Stack } from "@react-components/layout";
import { cloneElement } from "react";
import { paramsBuilder } from "@stories/utils";

function ToggleIconButton({ element, ...rest }) {
    return cloneElement(element, rest);
}

export function createToggleIconButtonTestSuite(element, stories) {
    return stories
        .add("default", () =>
            <Stack>
                <Inline alignY="end">
                    <ToggleIconButton size="sm" aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                </Inline>
                <Inline alignY="end">
                    <ToggleIconButton checked aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton active aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton focus aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton hover aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton focus hover aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton disabled aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                </Inline>
            </Stack>,
             {
                 ...paramsBuilder()
                     .validateBreakpoints()
                     .build()
             }
        )
        .add("rounded", () =>
            <Stack>
                <Inline alignY="end">
                    <ToggleIconButton size="sm" shape="circular" aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton shape="rounded" aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                </Inline>
                <Inline alignY="end">
                    <ToggleIconButton checked shape="rounded" aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton active shape="rounded" aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton focus shape="rounded" aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton hover shape="rounded" aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton focus hover shape="rounded" aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton disabled shape="rounded" aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                </Inline>
            </Stack>
        )
        .add("circular", () =>
            <Stack>
                <Inline alignY="end">
                    <ToggleIconButton size="sm" shape="circular" aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton shape="circular" aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                </Inline>
                <Inline alignY="end">
                    <ToggleIconButton checked shape="circular" aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton active shape="circular" aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton focus shape="circular" aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton hover shape="circular" aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton focus hover shape="circular" aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton disabled shape="circular" aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                </Inline>
            </Stack>
        )
        .add("checked", () =>
            <Inline>
                <ToggleIconButton checked aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                <ToggleIconButton defaultChecked aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
            </Inline>
        );
}
