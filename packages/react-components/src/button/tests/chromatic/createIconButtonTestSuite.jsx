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
                    <IconButton size="mini" element={element}><AddIcon /></IconButton>
                    <IconButton size="tiny" element={element}><AddIcon /></IconButton>
                    <IconButton size="small" element={element}><AddIcon /></IconButton>
                    <IconButton element={element}><AddIcon /></IconButton>
                    <IconButton size="large" element={element}><AddIcon /></IconButton>
                </Inline>
                <Inline align="end">
                    <IconButton loading size="mini" element={element}><AddIcon /></IconButton>
                    <IconButton loading size="tiny" element={element}><AddIcon /></IconButton>
                    <IconButton loading size="small" element={element}><AddIcon /></IconButton>
                    <IconButton loading element={element}><AddIcon /></IconButton>
                    <IconButton loading size="large" element={element}><AddIcon /></IconButton>
                </Inline>
            </Stack>
        )
        .add("primary", () =>
            <Stack>
                <Inline align="end">
                    <IconButton color="primary" size="mini" element={element}><AddIcon /></IconButton>
                    <IconButton color="primary" size="tiny" element={element}><AddIcon /></IconButton>
                    <IconButton color="primary" size="small" element={element}><AddIcon /></IconButton>
                    <IconButton color="primary" element={element}><AddIcon /></IconButton>
                    <IconButton color="primary" size="large" element={element}><AddIcon /></IconButton>
                </Inline>
                <Inline align="end">
                    <IconButton loading color="primary" size="mini" element={element}><AddIcon /></IconButton>
                    <IconButton loading color="primary" size="tiny" element={element}><AddIcon /></IconButton>
                    <IconButton loading color="primary" size="small" element={element}><AddIcon /></IconButton>
                    <IconButton loading color="primary" element={element}><AddIcon /></IconButton>
                    <IconButton loading color="primary" size="large" element={element}><AddIcon /></IconButton>
                </Inline>
            </Stack>
        )
        .add("secondary", () =>
            <Stack>
                <Inline align="end">
                    <IconButton color="secondary" size="mini" element={element}><AddIcon /></IconButton>
                    <IconButton color="secondary" size="tiny" element={element}><AddIcon /></IconButton>
                    <IconButton color="secondary" size="small" element={element}><AddIcon /></IconButton>
                    <IconButton color="secondary" element={element}><AddIcon /></IconButton>
                    <IconButton color="secondary" size="large" element={element}><AddIcon /></IconButton>
                </Inline>
                <Inline align="end">
                    <IconButton loading color="secondary" size="mini" element={element}><AddIcon /></IconButton>
                    <IconButton loading color="secondary" size="tiny" element={element}><AddIcon /></IconButton>
                    <IconButton loading color="secondary" size="small" element={element}><AddIcon /></IconButton>
                    <IconButton loading color="secondary" element={element}><AddIcon /></IconButton>
                    <IconButton loading color="secondary" size="large" element={element}><AddIcon /></IconButton>
                </Inline>
            </Stack>
        )
        .add("danger", () =>
            <Stack>
                <Inline align="end">
                    <IconButton color="danger" size="mini" element={element}><AddIcon /></IconButton>
                    <IconButton color="danger" size="tiny" element={element}><AddIcon /></IconButton>
                    <IconButton color="danger" size="small" element={element}><AddIcon /></IconButton>
                    <IconButton color="danger" element={element}><AddIcon /></IconButton>
                    <IconButton color="danger" size="large" element={element}><AddIcon /></IconButton>
                </Inline>
                <Inline align="end">
                    <IconButton loading color="danger" size="mini" element={element}><AddIcon /></IconButton>
                    <IconButton loading color="danger" size="tiny" element={element}><AddIcon /></IconButton>
                    <IconButton loading color="danger" size="small" element={element}><AddIcon /></IconButton>
                    <IconButton loading color="danger" element={element}><AddIcon /></IconButton>
                    <IconButton loading color="danger" size="large" element={element}><AddIcon /></IconButton>
                </Inline>
            </Stack>
        )
        .add("circular", () =>
            <Stack>
                <Inline align="end">
                    <IconButton shape="circular" size="mini" element={element}><AddIcon /></IconButton>
                    <IconButton shape="circular" size="tiny" element={element}><AddIcon /></IconButton>
                    <IconButton shape="circular" size="small" element={element}><AddIcon /></IconButton>
                    <IconButton shape="circular" element={element}><AddIcon /></IconButton>
                    <IconButton shape="circular" size="large" element={element}><AddIcon /></IconButton>
                </Inline>
                <Inline align="end">
                    <IconButton loading shape="circular" size="mini" element={element}><AddIcon /></IconButton>
                    <IconButton loading shape="circular" size="tiny" element={element}><AddIcon /></IconButton>
                    <IconButton loading shape="circular" size="small" element={element}><AddIcon /></IconButton>
                    <IconButton loading shape="circular" element={element}><AddIcon /></IconButton>
                    <IconButton loading shape="circular" size="large" element={element}><AddIcon /></IconButton>
                </Inline>
            </Stack>
        )
        .add("rounded", () =>
            <Stack>
                <Inline align="end">
                    <IconButton shape="rounded" size="mini" element={element}><AddIcon /></IconButton>
                    <IconButton shape="rounded" size="tiny" element={element}><AddIcon /></IconButton>
                    <IconButton shape="rounded" size="small" element={element}><AddIcon /></IconButton>
                    <IconButton shape="rounded" element={element}><AddIcon /></IconButton>
                    <IconButton shape="rounded" size="large" element={element}><AddIcon /></IconButton>
                </Inline>
                <Inline align="end">
                    <IconButton loading shape="rounded" size="mini" element={element}><AddIcon /></IconButton>
                    <IconButton loading shape="rounded" size="tiny" element={element}><AddIcon /></IconButton>
                    <IconButton loading shape="rounded" size="small" element={element}><AddIcon /></IconButton>
                    <IconButton loading shape="rounded" element={element}><AddIcon /></IconButton>
                    <IconButton loading shape="rounded" size="large" element={element}><AddIcon /></IconButton>
                </Inline>
            </Stack>
        )
        .add("states", () =>
            <Stack>
                <Inline align="end">
                    <IconButton active size="mini" element={element}><AddIcon /></IconButton>
                    <IconButton active size="tiny" element={element}><AddIcon /></IconButton>
                    <IconButton active size="small" element={element}><AddIcon /></IconButton>
                    <IconButton active element={element}><AddIcon /></IconButton>
                    <IconButton active size="large" element={element}><AddIcon /></IconButton>
                    <IconButton loading active element={element}><AddIcon /></IconButton>
                </Inline>
                <Inline align="end">
                    <IconButton focus size="mini" element={element}><AddIcon /></IconButton>
                    <IconButton focus size="tiny" element={element}><AddIcon /></IconButton>
                    <IconButton focus size="small" element={element}><AddIcon /></IconButton>
                    <IconButton focus element={element}><AddIcon /></IconButton>
                    <IconButton focus size="large" element={element}><AddIcon /></IconButton>
                    <IconButton loading focus element={element}><AddIcon /></IconButton>
                </Inline>
                <Inline align="end">
                    <IconButton hover size="mini" element={element}><AddIcon /></IconButton>
                    <IconButton hover size="tiny" element={element}><AddIcon /></IconButton>
                    <IconButton hover size="small" element={element}><AddIcon /></IconButton>
                    <IconButton hover element={element}><AddIcon /></IconButton>
                    <IconButton hover size="large" element={element}><AddIcon /></IconButton>
                    <IconButton loading hover element={element}><AddIcon /></IconButton>
                </Inline>
                <Inline align="end">
                    <IconButton focus hover size="mini" element={element}><AddIcon /></IconButton>
                    <IconButton focus hover size="tiny" element={element}><AddIcon /></IconButton>
                    <IconButton focus hover size="small" element={element}><AddIcon /></IconButton>
                    <IconButton focus hover element={element}><AddIcon /></IconButton>
                    <IconButton focus hover size="large" element={element}><AddIcon /></IconButton>
                    <IconButton loading focus hover element={element}><AddIcon /></IconButton>
                </Inline>
                <Inline align="end">
                    <IconButton disabled size="mini" element={element}><AddIcon /></IconButton>
                    <IconButton disabled size="tiny" element={element}><AddIcon /></IconButton>
                    <IconButton disabled size="small" element={element}><AddIcon /></IconButton>
                    <IconButton disabled element={element}><AddIcon /></IconButton>
                    <IconButton disabled size="large" element={element}><AddIcon /></IconButton>
                </Inline>
            </Stack>
        )
        .add("as anchor", () =>
            <IconButton as="a" element={element}><AddIcon /></IconButton>
        );
}
