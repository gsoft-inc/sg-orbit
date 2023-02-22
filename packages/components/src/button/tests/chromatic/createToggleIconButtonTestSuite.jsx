import { CheckMajorIcon } from "@components/icons";
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
                    <ToggleIconButton size="sm" aria-label="Activate" element={element}><CheckMajorIcon /></ToggleIconButton>
                    <ToggleIconButton aria-label="Activate" element={element}><CheckMajorIcon /></ToggleIconButton>
                </Inline>
                <Inline alignY="end">
                    <ToggleIconButton checked aria-label="Activate" element={element}><CheckMajorIcon /></ToggleIconButton>
                    <ToggleIconButton active aria-label="Activate" element={element}><CheckMajorIcon /></ToggleIconButton>
                    <ToggleIconButton focus aria-label="Activate" element={element}><CheckMajorIcon /></ToggleIconButton>
                    <ToggleIconButton hover aria-label="Activate" element={element}><CheckMajorIcon /></ToggleIconButton>
                    <ToggleIconButton focus hover aria-label="Activate" element={element}><CheckMajorIcon /></ToggleIconButton>
                    <ToggleIconButton disabled aria-label="Activate" element={element}><CheckMajorIcon /></ToggleIconButton>
                </Inline>
            </Stack>
        )
        .add("checked", () =>
            <Inline>
                <ToggleIconButton checked aria-label="Activate" element={element}><CheckMajorIcon /></ToggleIconButton>
                <ToggleIconButton defaultChecked aria-label="Activate" element={element}><CheckMajorIcon /></ToggleIconButton>
            </Inline>
        )
        .add("zoom", () =>
            <Inline>
                <Div className="zoom-in">
                    <ToggleIconButton aria-label="Activate" element={element}><CheckMajorIcon /></ToggleIconButton>
                </Div>
                <Div className="zoom-out">
                    <ToggleIconButton aria-label="Activate" element={element}><CheckMajorIcon /></ToggleIconButton>
                </Div>
            </Inline>
        );
}
