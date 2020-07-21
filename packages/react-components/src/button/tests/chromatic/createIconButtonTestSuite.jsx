import { AddIcon } from "@react-components/icons";
import { Inline, Stack } from "@react-components/layout";
import { cloneElement } from "react";

function IconButton({ element, ...rest }) {
    return cloneElement(element, rest);
}

export function createIconButtonTestSuite(iconButton, stories) {
    return stories
        .add("default", () =>
            <Stack>
                <Inline align="end">
                    <IconButton size="mini" element={iconButton}><AddIcon /></IconButton>
                    <IconButton size="tiny" element={iconButton}><AddIcon /></IconButton>
                    <IconButton size="small" element={iconButton}><AddIcon /></IconButton>
                    <IconButton element={iconButton}><AddIcon /></IconButton>
                    <IconButton size="large" element={iconButton}><AddIcon /></IconButton>
                </Inline>
                <Inline align="end">
                    <IconButton loading size="mini" element={iconButton}><AddIcon /></IconButton>
                    <IconButton loading size="tiny" element={iconButton}><AddIcon /></IconButton>
                    <IconButton loading size="small" element={iconButton}><AddIcon /></IconButton>
                    <IconButton loading element={iconButton}><AddIcon /></IconButton>
                    <IconButton loading size="large" element={iconButton}><AddIcon /></IconButton>
                </Inline>
            </Stack>
        )
        .add("primary", () =>
            <Stack>
                <Inline align="end">
                    <IconButton color="primary" size="mini" element={iconButton}><AddIcon /></IconButton>
                    <IconButton color="primary" size="tiny" element={iconButton}><AddIcon /></IconButton>
                    <IconButton color="primary" size="small" element={iconButton}><AddIcon /></IconButton>
                    <IconButton color="primary" element={iconButton}><AddIcon /></IconButton>
                    <IconButton color="primary" size="large" element={iconButton}><AddIcon /></IconButton>
                </Inline>
                <Inline align="end">
                    <IconButton loading color="primary" size="mini" element={iconButton}><AddIcon /></IconButton>
                    <IconButton loading color="primary" size="tiny" element={iconButton}><AddIcon /></IconButton>
                    <IconButton loading color="primary" size="small" element={iconButton}><AddIcon /></IconButton>
                    <IconButton loading color="primary" element={iconButton}><AddIcon /></IconButton>
                    <IconButton loading color="primary" size="large" element={iconButton}><AddIcon /></IconButton>
                </Inline>
            </Stack>
        )
        .add("secondary", () =>
            <Stack>
                <Inline align="end">
                    <IconButton color="secondary" size="mini" element={iconButton}><AddIcon /></IconButton>
                    <IconButton color="secondary" size="tiny" element={iconButton}><AddIcon /></IconButton>
                    <IconButton color="secondary" size="small" element={iconButton}><AddIcon /></IconButton>
                    <IconButton color="secondary" element={iconButton}><AddIcon /></IconButton>
                    <IconButton color="secondary" size="large" element={iconButton}><AddIcon /></IconButton>
                </Inline>
                <Inline align="end">
                    <IconButton loading color="secondary" size="mini" element={iconButton}><AddIcon /></IconButton>
                    <IconButton loading color="secondary" size="tiny" element={iconButton}><AddIcon /></IconButton>
                    <IconButton loading color="secondary" size="small" element={iconButton}><AddIcon /></IconButton>
                    <IconButton loading color="secondary" element={iconButton}><AddIcon /></IconButton>
                    <IconButton loading color="secondary" size="large" element={iconButton}><AddIcon /></IconButton>
                </Inline>
            </Stack>
        )
        .add("danger", () =>
            <Stack>
                <Inline align="end">
                    <IconButton color="danger" size="mini" element={iconButton}><AddIcon /></IconButton>
                    <IconButton color="danger" size="tiny" element={iconButton}><AddIcon /></IconButton>
                    <IconButton color="danger" size="small" element={iconButton}><AddIcon /></IconButton>
                    <IconButton color="danger" element={iconButton}><AddIcon /></IconButton>
                    <IconButton color="danger" size="large" element={iconButton}><AddIcon /></IconButton>
                </Inline>
                <Inline align="end">
                    <IconButton loading color="danger" size="mini" element={iconButton}><AddIcon /></IconButton>
                    <IconButton loading color="danger" size="tiny" element={iconButton}><AddIcon /></IconButton>
                    <IconButton loading color="danger" size="small" element={iconButton}><AddIcon /></IconButton>
                    <IconButton loading color="danger" element={iconButton}><AddIcon /></IconButton>
                    <IconButton loading color="danger" size="large" element={iconButton}><AddIcon /></IconButton>
                </Inline>
            </Stack>
        )
        .add("circular", () =>
            <Stack>
                <Inline align="end">
                    <IconButton circular size="mini" element={iconButton}><AddIcon /></IconButton>
                    <IconButton circular size="tiny" element={iconButton}><AddIcon /></IconButton>
                    <IconButton circular size="small" element={iconButton}><AddIcon /></IconButton>
                    <IconButton circular element={iconButton}><AddIcon /></IconButton>
                    <IconButton circular size="large" element={iconButton}><AddIcon /></IconButton>
                </Inline>
                <Inline align="end">
                    <IconButton loading circular size="mini" element={iconButton}><AddIcon /></IconButton>
                    <IconButton loading circular size="tiny" element={iconButton}><AddIcon /></IconButton>
                    <IconButton loading circular size="small" element={iconButton}><AddIcon /></IconButton>
                    <IconButton loading circular element={iconButton}><AddIcon /></IconButton>
                    <IconButton loading circular size="large" element={iconButton}><AddIcon /></IconButton>
                </Inline>
            </Stack>
        )
        .add("states", () =>
            <Stack>
                <Inline align="end">
                    <IconButton active size="mini" element={iconButton}><AddIcon /></IconButton>
                    <IconButton active size="tiny" element={iconButton}><AddIcon /></IconButton>
                    <IconButton active size="small" element={iconButton}><AddIcon /></IconButton>
                    <IconButton active element={iconButton}><AddIcon /></IconButton>
                    <IconButton active size="large" element={iconButton}><AddIcon /></IconButton>
                    <IconButton loading active element={iconButton}><AddIcon /></IconButton>
                </Inline>
                <Inline align="end">
                    <IconButton focus size="mini" element={iconButton}><AddIcon /></IconButton>
                    <IconButton focus size="tiny" element={iconButton}><AddIcon /></IconButton>
                    <IconButton focus size="small" element={iconButton}><AddIcon /></IconButton>
                    <IconButton focus element={iconButton}><AddIcon /></IconButton>
                    <IconButton focus size="large" element={iconButton}><AddIcon /></IconButton>
                    <IconButton loading focus element={iconButton}><AddIcon /></IconButton>
                </Inline>
                <Inline align="end">
                    <IconButton hover size="mini" element={iconButton}><AddIcon /></IconButton>
                    <IconButton hover size="tiny" element={iconButton}><AddIcon /></IconButton>
                    <IconButton hover size="small" element={iconButton}><AddIcon /></IconButton>
                    <IconButton hover element={iconButton}><AddIcon /></IconButton>
                    <IconButton hover size="large" element={iconButton}><AddIcon /></IconButton>
                    <IconButton loading hover element={iconButton}><AddIcon /></IconButton>
                </Inline>
                <Inline align="end">
                    <IconButton focus hover size="mini" element={iconButton}><AddIcon /></IconButton>
                    <IconButton focus hover size="tiny" element={iconButton}><AddIcon /></IconButton>
                    <IconButton focus hover size="small" element={iconButton}><AddIcon /></IconButton>
                    <IconButton focus hover element={iconButton}><AddIcon /></IconButton>
                    <IconButton focus hover size="large" element={iconButton}><AddIcon /></IconButton>
                    <IconButton loading focus hover element={iconButton}><AddIcon /></IconButton>
                </Inline>
            </Stack>
        )
        .add("styling", () =>
            <Inline>
                <IconButton className="bg-red" element={iconButton}><AddIcon /></IconButton>
                <IconButton style={{ backgroundColor: "red" }} element={iconButton}><AddIcon /></IconButton>
            </Inline>
        )
        .add("as anchor", () =>
            <IconButton as="a" element={iconButton}><AddIcon /></IconButton>
        );
}
