import { AddMajorIcon } from "@components/icons";
import { Div } from "@components/html";
import { Inline, Stack } from "@components/layout";
import { cloneElement } from "react";

function IconButton({ element, ...rest }) {
    return cloneElement(element, rest);
}

export function createIconButtonTestSuite(element, stories) {
    return stories
        .add("default", () =>
            <Stack>
                <Inline alignY="end">
                    <IconButton size="2xs" aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                    <IconButton size="xs" aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                    <IconButton size="sm" aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                    <IconButton aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                </Inline>
                <Inline alignY="end">
                    <IconButton loading size="2xs" aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                    <IconButton loading size="xs" aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                    <IconButton loading size="sm" aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                    <IconButton loading aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                </Inline>
                <Inline alignY="end">
                    <IconButton condensed size="2xs" aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                    <IconButton condensed size="xs" aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                    <IconButton condensed size="sm" aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                    <IconButton condensed aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                </Inline>
            </Stack>
        )
        .add("states", () =>
            <Inline gap={12}>
                <Stack>
                    <Inline alignY="end">
                        <IconButton active size="2xs" aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                        <IconButton active size="xs" aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                        <IconButton active size="sm" aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                        <IconButton active aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                        <IconButton loading active aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                    </Inline>
                    <Inline alignY="end">
                        <IconButton focus size="2xs" aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                        <IconButton focus size="xs" aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                        <IconButton focus size="sm" aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                        <IconButton focus aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                        <IconButton loading focus aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                    </Inline>
                    <Inline alignY="end">
                        <IconButton hover size="2xs" aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                        <IconButton hover size="xs" aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                        <IconButton hover size="sm" aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                        <IconButton hover aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                        <IconButton loading hover aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                    </Inline>
                    <Inline alignY="end">
                        <IconButton focus hover size="2xs" aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                        <IconButton focus hover size="xs" aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                        <IconButton focus hover size="sm" aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                        <IconButton focus hover aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                        <IconButton loading focus hover aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                    </Inline>
                </Stack>
                <Stack>
                    <Inline alignY="end">
                        <IconButton disabled size="2xs" aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                        <IconButton disabled size="xs" aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                        <IconButton disabled size="sm" aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                        <IconButton disabled aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                    </Inline>
                    <Inline alignY="end">
                        <IconButton disabled active size="2xs" aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                        <IconButton disabled active size="xs" aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                        <IconButton disabled active size="sm" aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                        <IconButton disabled active aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                    </Inline>
                    <Inline alignY="end">
                        <IconButton disabled focus size="2xs" aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                        <IconButton disabled focus size="xs" aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                        <IconButton disabled focus size="sm" aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                        <IconButton disabled focus aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                    </Inline>
                    <Inline alignY="end">
                        <IconButton disabled hover size="2xs" aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                        <IconButton disabled hover size="xs" aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                        <IconButton disabled hover size="sm" aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                        <IconButton disabled hover aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                    </Inline>
                    <Inline alignY="end">
                        <IconButton disabled focus hover size="2xs" aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                        <IconButton disabled focus hover size="xs" aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                        <IconButton disabled focus hover size="sm" aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                        <IconButton disabled focus hover aria-label="Add" element={element}><AddMajorIcon /></IconButton>
                    </Inline>
                </Stack>
            </Inline>
        )
        .add("zoom", () =>
            <Inline>
                <Div className="zoom-in">
                    <IconButton element={element}><AddMajorIcon /></IconButton>
                </Div>
                <Div className="zoom-out'">
                    <IconButton element={element}><AddMajorIcon /></IconButton>
                </Div>
            </Inline>
        );
}
