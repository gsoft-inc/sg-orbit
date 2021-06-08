import { AddIcon } from "@react-components/icons";
import { Inline, Stack } from "@react-components/layout";
import { cloneElement } from "react";

function IconLink({ element, ...rest }) {
    return cloneElement(element, rest);
}

export function createIconLinkTestSuite(element, stories) {
    return stories
        .add("default", () =>
            <Inline verticalAlign="end">
                <IconLink size="sm" href="#" aria-label="Add" element={element}><AddIcon /></IconLink>
                <IconLink href="#" aria-label="Add" element={element}><AddIcon /></IconLink>
            </Inline>
        )
        .add("condensed", () =>
            <Inline verticalAlign="end">
                <IconLink condensed size="sm" href="#" aria-label="Add" element={element}><AddIcon /></IconLink>
                <IconLink condensed href="#" aria-label="Add" element={element}><AddIcon /></IconLink>
            </Inline>
        )
        .add("primary", () =>
            <Inline verticalAlign="end">
                <IconLink color="primary" size="sm" aria-label="Add" href="#" element={element}><AddIcon /></IconLink>
                <IconLink color="primary" aria-label="Add" href="#" element={element}><AddIcon /></IconLink>
            </Inline>
        )
        .add("secondary", () =>
            <Inline verticalAlign="end">
                <IconLink color="secondary" size="sm" aria-label="Add" href="#" element={element}><AddIcon /></IconLink>
                <IconLink color="secondary" aria-label="Add" href="#" element={element}><AddIcon /></IconLink>
            </Inline>
        )
        .add("danger", () =>
            <Inline verticalAlign="end">
                <IconLink color="danger" size="sm" aria-label="Add" href="#" element={element}><AddIcon /></IconLink>
                <IconLink color="danger" aria-label="Add" href="#" element={element}><AddIcon /></IconLink>
            </Inline>
        )
        .add("states", () =>
            <Stack>
                <Inline verticalAlign="end">
                    <IconLink active size="sm" aria-label="Add" href="#" element={element}><AddIcon /></IconLink>
                    <IconLink active aria-label="Add" href="#" element={element}><AddIcon /></IconLink>
                </Inline>
                <Inline verticalAlign="end">
                    <IconLink focus size="sm" aria-label="Add" href="#" element={element}><AddIcon /></IconLink>
                    <IconLink focus aria-label="Add" href="#" element={element}><AddIcon /></IconLink>
                </Inline>
                <Inline verticalAlign="end">
                    <IconLink hover size="sm" aria-label="Add" href="#" element={element}><AddIcon /></IconLink>
                    <IconLink hover aria-label="Add" href="#" element={element}><AddIcon /></IconLink>
                </Inline>
                <Inline verticalAlign="end">
                    <IconLink focus hover size="sm" aria-label="Add" href="#" element={element}><AddIcon /></IconLink>
                    <IconLink focus hover aria-label="Add" href="#" element={element}><AddIcon /></IconLink>
                </Inline>
                <Inline verticalAlign="end">
                    <IconLink disabled size="sm" aria-label="Add" href="#" element={element}><AddIcon /></IconLink>
                    <IconLink disabled aria-label="Add" href="#" element={element}><AddIcon /></IconLink>
                </Inline>
            </Stack>
        )
        .add("external", () =>
            <IconLink external href="https://www.space.com/spacex-delays-south-korea-military-satellite-launch.html" aria-label="Add" element={element}><AddIcon /></IconLink>
        )
        .add("new tab", () =>
            <IconLink target="_blank" href="#" aria-label="Add" element={element}><AddIcon /></IconLink>
        );
}

