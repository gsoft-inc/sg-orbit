import { CheckIcon } from "@components/icons";
import { Div } from "@components/html";
import { Inline, Stack } from "@components/layout";
import { cloneElement } from "react";

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
            </Stack>
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
        .add("accent", () =>
            <Stack>
                <Inline alignY="end">
                    <ToggleIconButton tone="accent" size="sm" aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton tone="accent" aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                </Inline>
                <Inline alignY="end">
                    <ToggleIconButton tone="accent" checked aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton tone="accent" active aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton tone="accent" focus aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton tone="accent" hover aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton tone="accent" focus hover aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton tone="accent" disabled aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                </Inline>
            </Stack>
        )
        .add("basic", () =>
            <Stack>
                <Inline alignY="end">
                    <ToggleIconButton tone="basic" size="sm" aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton tone="basic" aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                </Inline>
                <Inline alignY="end">
                    <ToggleIconButton tone="basic" checked aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton tone="basic" active aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton tone="basic" focus aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton tone="basic" hover aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton tone="basic" focus hover aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton tone="basic" disabled aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                </Inline>
            </Stack>
        )
        .add("checked", () =>
            <Inline>
                <ToggleIconButton checked aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                <ToggleIconButton defaultChecked aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
            </Inline>
        )
        .add("zoom", () =>
            <Inline>
                <Div className="zoom-in">
                    <ToggleIconButton aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                </Div>
                <Div className="zoom-out">
                    <ToggleIconButton aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                </Div>
            </Inline>
        );
}
