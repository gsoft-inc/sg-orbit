import { AddIcon } from "@react-components/icons";
import { Inline, Stack } from "@react-components/layout";
import { cloneElement } from "react";

function IconButton({ element, ...rest }) {
    return cloneElement(element, rest);
}

export function createIconButtonTestSuite(element, stories) {
    return stories
        .add("default", () =>
            <Stack>
                <Inline verticalAlign="end">
                    <IconButton size="2xs" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton size="xs" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton size="sm" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton size="lg" aria-label="Add" element={element}><AddIcon /></IconButton>
                </Inline>
                <Inline verticalAlign="end">
                    <IconButton loading size="2xs" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading size="xs" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading size="sm" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading size="lg" aria-label="Add" element={element}><AddIcon /></IconButton>
                </Inline>
                <Inline verticalAlign="end">
                    <IconButton condensed size="2xs" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton condensed size="xs" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton condensed size="sm" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton condensed aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton condensed size="lg" aria-label="Add" element={element}><AddIcon /></IconButton>
                </Inline>
            </Stack>
        )
        .add("primary", () =>
            <Stack>
                <Inline verticalAlign="end">
                    <IconButton color="primary" size="2xs" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton color="primary" size="xs" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton color="primary" size="sm" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton color="primary" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton color="primary" size="lg" aria-label="Add" element={element}><AddIcon /></IconButton>
                </Inline>
                <Inline verticalAlign="end">
                    <IconButton loading color="primary" size="2xs" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading color="primary" size="xs" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading color="primary" size="sm" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading color="primary" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading color="primary" size="lg" aria-label="Add" element={element}><AddIcon /></IconButton>
                </Inline>
            </Stack>
        )
        .add("secondary", () =>
            <Stack>
                <Inline verticalAlign="end">
                    <IconButton color="secondary" size="2xs" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton color="secondary" size="xs" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton color="secondary" size="sm" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton color="secondary" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton color="secondary" size="lg" aria-label="Add" element={element}><AddIcon /></IconButton>
                </Inline>
                <Inline verticalAlign="end">
                    <IconButton loading color="secondary" size="2xs" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading color="secondary" size="xs" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading color="secondary" size="sm" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading color="secondary" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading color="secondary" size="lg" aria-label="Add" element={element}><AddIcon /></IconButton>
                </Inline>
            </Stack>
        )
        .add("danger", () =>
            <Stack>
                <Inline verticalAlign="end">
                    <IconButton color="danger" size="2xs" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton color="danger" size="xs" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton color="danger" size="sm" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton color="danger" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton color="danger" size="lg" aria-label="Add" element={element}><AddIcon /></IconButton>
                </Inline>
                <Inline verticalAlign="end">
                    <IconButton loading color="danger" size="2xs" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading color="danger" size="xs" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading color="danger" size="sm" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading color="danger" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading color="danger" size="lg" aria-label="Add" element={element}><AddIcon /></IconButton>
                </Inline>
            </Stack>
        )
        .add("circular", () =>
            <Stack>
                <Inline verticalAlign="end">
                    <IconButton shape="circular" size="2xs" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton shape="circular" size="xs" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton shape="circular" size="sm" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton shape="circular" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton shape="circular" size="lg" aria-label="Add" element={element}><AddIcon /></IconButton>
                </Inline>
                <Inline verticalAlign="end">
                    <IconButton loading shape="circular" size="2xs" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading shape="circular" size="xs" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading shape="circular" size="sm" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading shape="circular" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading shape="circular" size="lg" aria-label="Add" element={element}><AddIcon /></IconButton>
                </Inline>
                <Inline verticalAlign="end">
                    <IconButton condensed shape="circular" size="2xs" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton condensed shape="circular" size="xs" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton condensed shape="circular" size="sm" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton condensed shape="circular" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton condensed shape="circular" size="lg" aria-label="Add" element={element}><AddIcon /></IconButton>
                </Inline>
            </Stack>
        )
        .add("rounded", () =>
            <Stack>
                <Inline verticalAlign="end">
                    <IconButton shape="rounded" size="2xs" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton shape="rounded" size="xs" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton shape="rounded" size="sm" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton shape="rounded" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton shape="rounded" size="lg" aria-label="Add" element={element}><AddIcon /></IconButton>
                </Inline>
                <Inline verticalAlign="end">
                    <IconButton loading shape="rounded" size="2xs" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading shape="rounded" size="xs" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading shape="rounded" size="sm" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading shape="rounded" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading shape="rounded" size="lg" aria-label="Add" element={element}><AddIcon /></IconButton>
                </Inline>
                <Inline verticalAlign="end">
                    <IconButton condensed shape="rounded" size="2xs" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton condensed shape="rounded" size="xs" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton condensed shape="rounded" size="sm" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton condensed shape="rounded" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton condensed shape="rounded" size="lg" aria-label="Add" element={element}><AddIcon /></IconButton>
                </Inline>
            </Stack>
        )
        .add("states", () =>
            <Stack>
                <Inline verticalAlign="end">
                    <IconButton active size="2xs" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton active size="xs" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton active size="sm" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton active aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton active size="lg" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading active aria-label="Add" element={element}><AddIcon /></IconButton>
                </Inline>
                <Inline verticalAlign="end">
                    <IconButton focus size="2xs" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton focus size="xs" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton focus size="sm" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton focus aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton focus size="lg" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading focus aria-label="Add" element={element}><AddIcon /></IconButton>
                </Inline>
                <Inline verticalAlign="end">
                    <IconButton hover size="2xs" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton hover size="xs" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton hover size="sm" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton hover aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton hover size="lg" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading hover aria-label="Add" element={element}><AddIcon /></IconButton>
                </Inline>
                <Inline verticalAlign="end">
                    <IconButton focus hover size="2xs" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton focus hover size="xs" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton focus hover size="sm" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton focus hover aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton focus hover size="lg" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading focus hover aria-label="Add" element={element}><AddIcon /></IconButton>
                </Inline>
                <Inline verticalAlign="end">
                    <IconButton disabled size="2xs" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton disabled size="xs" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton disabled size="sm" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton disabled aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton disabled size="lg" aria-label="Add" element={element}><AddIcon /></IconButton>
                </Inline>
            </Stack>
        )
        .add("as anchor", () =>
            <IconButton as="a" aria-label="Add" element={element}><AddIcon /></IconButton>
        );
}
