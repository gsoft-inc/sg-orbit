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
                <Inline align="end">
                    <IconButton size="mini" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton size="tiny" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton size="small" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton size="large" aria-label="Add" element={element}><AddIcon /></IconButton>
                </Inline>
                <Inline align="end">
                    <IconButton loading size="mini" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading size="tiny" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading size="small" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading size="large" aria-label="Add" element={element}><AddIcon /></IconButton>
                </Inline>
            </Stack>
        )
        .add("primary", () =>
            <Stack>
                <Inline align="end">
                    <IconButton color="primary" size="mini" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton color="primary" size="tiny" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton color="primary" size="small" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton color="primary" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton color="primary" size="large" aria-label="Add" element={element}><AddIcon /></IconButton>
                </Inline>
                <Inline align="end">
                    <IconButton loading color="primary" size="mini" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading color="primary" size="tiny" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading color="primary" size="small" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading color="primary" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading color="primary" size="large" aria-label="Add" element={element}><AddIcon /></IconButton>
                </Inline>
            </Stack>
        )
        .add("secondary", () =>
            <Stack>
                <Inline align="end">
                    <IconButton color="secondary" size="mini" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton color="secondary" size="tiny" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton color="secondary" size="small" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton color="secondary" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton color="secondary" size="large" aria-label="Add" element={element}><AddIcon /></IconButton>
                </Inline>
                <Inline align="end">
                    <IconButton loading color="secondary" size="mini" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading color="secondary" size="tiny" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading color="secondary" size="small" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading color="secondary" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading color="secondary" size="large" aria-label="Add" element={element}><AddIcon /></IconButton>
                </Inline>
            </Stack>
        )
        .add("danger", () =>
            <Stack>
                <Inline align="end">
                    <IconButton color="danger" size="mini" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton color="danger" size="tiny" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton color="danger" size="small" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton color="danger" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton color="danger" size="large" aria-label="Add" element={element}><AddIcon /></IconButton>
                </Inline>
                <Inline align="end">
                    <IconButton loading color="danger" size="mini" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading color="danger" size="tiny" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading color="danger" size="small" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading color="danger" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading color="danger" size="large" aria-label="Add" element={element}><AddIcon /></IconButton>
                </Inline>
            </Stack>
        )
        .add("circular", () =>
            <Stack>
                <Inline align="end">
                    <IconButton shape="circular" size="mini" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton shape="circular" size="tiny" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton shape="circular" size="small" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton shape="circular" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton shape="circular" size="large" aria-label="Add" element={element}><AddIcon /></IconButton>
                </Inline>
                <Inline align="end">
                    <IconButton loading shape="circular" size="mini" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading shape="circular" size="tiny" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading shape="circular" size="small" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading shape="circular" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading shape="circular" size="large" aria-label="Add" element={element}><AddIcon /></IconButton>
                </Inline>
            </Stack>
        )
        .add("rounded", () =>
            <Stack>
                <Inline align="end">
                    <IconButton shape="rounded" size="mini" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton shape="rounded" size="tiny" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton shape="rounded" size="small" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton shape="rounded" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton shape="rounded" size="large" aria-label="Add" element={element}><AddIcon /></IconButton>
                </Inline>
                <Inline align="end">
                    <IconButton loading shape="rounded" size="mini" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading shape="rounded" size="tiny" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading shape="rounded" size="small" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading shape="rounded" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading shape="rounded" size="large" aria-label="Add" element={element}><AddIcon /></IconButton>
                </Inline>
            </Stack>
        )
        .add("states", () =>
            <Stack>
                <Inline align="end">
                    <IconButton active size="mini" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton active size="tiny" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton active size="small" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton active aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton active size="large" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading active aria-label="Add" element={element}><AddIcon /></IconButton>
                </Inline>
                <Inline align="end">
                    <IconButton focus size="mini" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton focus size="tiny" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton focus size="small" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton focus aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton focus size="large" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading focus aria-label="Add" element={element}><AddIcon /></IconButton>
                </Inline>
                <Inline align="end">
                    <IconButton hover size="mini" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton hover size="tiny" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton hover size="small" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton hover aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton hover size="large" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading hover aria-label="Add" element={element}><AddIcon /></IconButton>
                </Inline>
                <Inline align="end">
                    <IconButton focus hover size="mini" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton focus hover size="tiny" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton focus hover size="small" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton focus hover aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton focus hover size="large" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton loading focus hover aria-label="Add" element={element}><AddIcon /></IconButton>
                </Inline>
                <Inline align="end">
                    <IconButton disabled size="mini" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton disabled size="tiny" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton disabled size="small" aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton disabled aria-label="Add" element={element}><AddIcon /></IconButton>
                    <IconButton disabled size="large" aria-label="Add" element={element}><AddIcon /></IconButton>
                </Inline>
            </Stack>
        )
        .add("as anchor", () =>
            <IconButton as="a" aria-label="Add" element={element}><AddIcon /></IconButton>
        );
}
