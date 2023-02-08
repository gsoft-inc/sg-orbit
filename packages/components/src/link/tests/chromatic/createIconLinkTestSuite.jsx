import { AddMajorIcon } from "@components/icons";
import { Div } from "@components/html";
import { Inline, Stack } from "@components/layout";
import { cloneElement } from "react";

function IconLink({ element, ...rest }) {
    return cloneElement(element, rest);
}

export function createIconLinkTestSuite(element, stories) {
    return stories
        .add("default", () =>
            <Inline alignY="end">
                <IconLink size="sm" href="#" aria-label="Add" element={element}><AddMajorIcon /></IconLink>
                <IconLink href="#" aria-label="Add" element={element}><AddMajorIcon /></IconLink>
            </Inline>
        )
        .add("primary", () =>
            <Inline alignY="end">
                <IconLink variant="primary" size="sm" aria-label="Add" href="#" element={element}><AddMajorIcon /></IconLink>
                <IconLink variant="primary" aria-label="Add" href="#" element={element}><AddMajorIcon /></IconLink>
            </Inline>
        )
        .add("accent", () =>
            <Inline alignY="end">
                <IconLink variant="accent" size="sm" aria-label="Add" href="#" element={element}><AddMajorIcon /></IconLink>
                <IconLink variant="accent" aria-label="Add" href="#" element={element}><AddMajorIcon /></IconLink>
            </Inline>
        )
        .add("negative", () =>
            <Inline alignY="end">
                <IconLink variant="negative" size="sm" aria-label="Add" href="#" element={element}><AddMajorIcon /></IconLink>
                <IconLink variant="negative" aria-label="Add" href="#" element={element}><AddMajorIcon /></IconLink>
            </Inline>
        )
        .add("inherit color", () =>
            <Inline alignY="end" color="alias-accent">
                <IconLink color="inherit" size="sm" aria-label="Add" href="#" element={element}><AddMajorIcon /></IconLink>
                <IconLink color="inherit" aria-label="Add" href="#" element={element}><AddMajorIcon /></IconLink>
            </Inline>
        )
        .add("states", () =>
            <Stack>
                <Inline alignY="end">
                    <IconLink active size="sm" aria-label="Add" href="#" element={element}><AddMajorIcon /></IconLink>
                    <IconLink active aria-label="Add" href="#" element={element}><AddMajorIcon /></IconLink>
                </Inline>
                <Inline alignY="end">
                    <IconLink focus size="sm" aria-label="Add" href="#" element={element}><AddMajorIcon /></IconLink>
                    <IconLink focus aria-label="Add" href="#" element={element}><AddMajorIcon /></IconLink>
                </Inline>
                <Inline alignY="end">
                    <IconLink hover size="sm" aria-label="Add" href="#" element={element}><AddMajorIcon /></IconLink>
                    <IconLink hover aria-label="Add" href="#" element={element}><AddMajorIcon /></IconLink>
                </Inline>
                <Inline alignY="end">
                    <IconLink focus hover size="sm" aria-label="Add" href="#" element={element}><AddMajorIcon /></IconLink>
                    <IconLink focus hover aria-label="Add" href="#" element={element}><AddMajorIcon /></IconLink>
                </Inline>
            </Stack>
        )
        .add("disabled states", () =>
            <Stack>
                <Inline alignY="end">
                    <IconLink disabled size="sm" aria-label="Add" href="#" element={element}><AddMajorIcon /></IconLink>
                    <IconLink disabled aria-label="Add" href="#" element={element}><AddMajorIcon /></IconLink>
                </Inline>
                <Inline alignY="end">
                    <IconLink disabled active size="sm" aria-label="Add" href="#" element={element}><AddMajorIcon /></IconLink>
                    <IconLink disabled active aria-label="Add" href="#" element={element}><AddMajorIcon /></IconLink>
                </Inline>
                <Inline alignY="end">
                    <IconLink disabled focus size="sm" aria-label="Add" href="#" element={element}><AddMajorIcon /></IconLink>
                    <IconLink disabled focus aria-label="Add" href="#" element={element}><AddMajorIcon /></IconLink>
                </Inline>
                <Inline alignY="end">
                    <IconLink disabled hover size="sm" aria-label="Add" href="#" element={element}><AddMajorIcon /></IconLink>
                    <IconLink disabled hover aria-label="Add" href="#" element={element}><AddMajorIcon /></IconLink>
                </Inline>
                <Inline alignY="end">
                    <IconLink disabled focus hover size="sm" aria-label="Add" href="#" element={element}><AddMajorIcon /></IconLink>
                    <IconLink disabled focus hover aria-label="Add" href="#" element={element}><AddMajorIcon /></IconLink>
                </Inline>
            </Stack>
        )
        .add("external", () =>
            <IconLink external href="https://www.space.com/spacex-delays-south-korea-military-satellite-launch.html" aria-label="Add" element={element}><AddMajorIcon /></IconLink>
        )
        .add("new tab", () =>
            <IconLink target="_blank" href="#" aria-label="Add" element={element}><AddMajorIcon /></IconLink>
        )
        .add("zoom", () =>
            <Stack>
                <Div className="zoom-in">
                    <IconLink href="#" aria-label="Add" element={element}><AddMajorIcon /></IconLink>
                </Div>
                <Div className="zoom-out">
                    <IconLink href="#" aria-label="Add" element={element}><AddMajorIcon /></IconLink>
                </Div>
            </Stack>
        );
}

