import { AddIcon } from "@react-components/icons";
import { Stack, VerticalStack } from "@react-components/stack";
import { cloneElement } from "react";

function IconButton({ element, ...rest }) {
    return cloneElement(element, rest);
}

export function createIconButtonTestSuite(iconButton, stories) {
    return stories
        .add("default", () =>
            <VerticalStack>
                <Stack align="end">
                    <IconButton size="mini" element={iconButton}><AddIcon /></IconButton>
                    <IconButton size="tiny" element={iconButton}><AddIcon /></IconButton>
                    <IconButton size="small" element={iconButton}><AddIcon /></IconButton>
                    <IconButton element={iconButton}><AddIcon /></IconButton>
                    <IconButton size="large" element={iconButton}><AddIcon /></IconButton>
                </Stack>
                <Stack align="end">
                    <IconButton loading size="mini" element={iconButton}><AddIcon /></IconButton>
                    <IconButton loading size="tiny" element={iconButton}><AddIcon /></IconButton>
                    <IconButton loading size="small" element={iconButton}><AddIcon /></IconButton>
                    <IconButton loading element={iconButton}><AddIcon /></IconButton>
                    <IconButton loading size="large" element={iconButton}><AddIcon /></IconButton>
                </Stack>
            </VerticalStack>
        )
        .add("primary", () =>
            <VerticalStack>
                <Stack align="end">
                    <IconButton color="primary" size="mini" element={iconButton}><AddIcon /></IconButton>
                    <IconButton color="primary" size="tiny" element={iconButton}><AddIcon /></IconButton>
                    <IconButton color="primary" size="small" element={iconButton}><AddIcon /></IconButton>
                    <IconButton color="primary" element={iconButton}><AddIcon /></IconButton>
                    <IconButton color="primary" size="large" element={iconButton}><AddIcon /></IconButton>
                </Stack>
                <Stack align="end">
                    <IconButton loading color="primary" size="mini" element={iconButton}><AddIcon /></IconButton>
                    <IconButton loading color="primary" size="tiny" element={iconButton}><AddIcon /></IconButton>
                    <IconButton loading color="primary" size="small" element={iconButton}><AddIcon /></IconButton>
                    <IconButton loading color="primary" element={iconButton}><AddIcon /></IconButton>
                    <IconButton loading color="primary" size="large" element={iconButton}><AddIcon /></IconButton>
                </Stack>
            </VerticalStack>
        )
        .add("secondary", () =>
            <VerticalStack>
                <Stack align="end">
                    <IconButton color="secondary" size="mini" element={iconButton}><AddIcon /></IconButton>
                    <IconButton color="secondary" size="tiny" element={iconButton}><AddIcon /></IconButton>
                    <IconButton color="secondary" size="small" element={iconButton}><AddIcon /></IconButton>
                    <IconButton color="secondary" element={iconButton}><AddIcon /></IconButton>
                    <IconButton color="secondary" size="large" element={iconButton}><AddIcon /></IconButton>
                </Stack>
                <Stack align="end">
                    <IconButton loading color="secondary" size="mini" element={iconButton}><AddIcon /></IconButton>
                    <IconButton loading color="secondary" size="tiny" element={iconButton}><AddIcon /></IconButton>
                    <IconButton loading color="secondary" size="small" element={iconButton}><AddIcon /></IconButton>
                    <IconButton loading color="secondary" element={iconButton}><AddIcon /></IconButton>
                    <IconButton loading color="secondary" size="large" element={iconButton}><AddIcon /></IconButton>
                </Stack>
            </VerticalStack>
        )
        .add("danger", () =>
            <VerticalStack>
                <Stack align="end">
                    <IconButton color="danger" size="mini" element={iconButton}><AddIcon /></IconButton>
                    <IconButton color="danger" size="tiny" element={iconButton}><AddIcon /></IconButton>
                    <IconButton color="danger" size="small" element={iconButton}><AddIcon /></IconButton>
                    <IconButton color="danger" element={iconButton}><AddIcon /></IconButton>
                    <IconButton color="danger" size="large" element={iconButton}><AddIcon /></IconButton>
                </Stack>
                <Stack align="end">
                    <IconButton loading color="danger" size="mini" element={iconButton}><AddIcon /></IconButton>
                    <IconButton loading color="danger" size="tiny" element={iconButton}><AddIcon /></IconButton>
                    <IconButton loading color="danger" size="small" element={iconButton}><AddIcon /></IconButton>
                    <IconButton loading color="danger" element={iconButton}><AddIcon /></IconButton>
                    <IconButton loading color="danger" size="large" element={iconButton}><AddIcon /></IconButton>
                </Stack>
            </VerticalStack>
        )
        .add("circular", () =>
            <VerticalStack>
                <Stack align="end">
                    <IconButton circular size="mini" element={iconButton}><AddIcon /></IconButton>
                    <IconButton circular size="tiny" element={iconButton}><AddIcon /></IconButton>
                    <IconButton circular size="small" element={iconButton}><AddIcon /></IconButton>
                    <IconButton circular element={iconButton}><AddIcon /></IconButton>
                    <IconButton circular size="large" element={iconButton}><AddIcon /></IconButton>
                </Stack>
                <Stack align="end">
                    <IconButton loading circular size="mini" element={iconButton}><AddIcon /></IconButton>
                    <IconButton loading circular size="tiny" element={iconButton}><AddIcon /></IconButton>
                    <IconButton loading circular size="small" element={iconButton}><AddIcon /></IconButton>
                    <IconButton loading circular element={iconButton}><AddIcon /></IconButton>
                    <IconButton loading circular size="large" element={iconButton}><AddIcon /></IconButton>
                </Stack>
            </VerticalStack>
        )
        .add("states", () =>
            <VerticalStack>
                <Stack align="end">
                    <IconButton active size="mini" element={iconButton}><AddIcon /></IconButton>
                    <IconButton active size="tiny" element={iconButton}><AddIcon /></IconButton>
                    <IconButton active size="small" element={iconButton}><AddIcon /></IconButton>
                    <IconButton active element={iconButton}><AddIcon /></IconButton>
                    <IconButton active size="large" element={iconButton}><AddIcon /></IconButton>
                    <IconButton loading active element={iconButton}><AddIcon /></IconButton>
                </Stack>
                <Stack align="end">
                    <IconButton focus size="mini" element={iconButton}><AddIcon /></IconButton>
                    <IconButton focus size="tiny" element={iconButton}><AddIcon /></IconButton>
                    <IconButton focus size="small" element={iconButton}><AddIcon /></IconButton>
                    <IconButton focus element={iconButton}><AddIcon /></IconButton>
                    <IconButton focus size="large" element={iconButton}><AddIcon /></IconButton>
                    <IconButton loading focus element={iconButton}><AddIcon /></IconButton>
                </Stack>
                <Stack align="end">
                    <IconButton hover size="mini" element={iconButton}><AddIcon /></IconButton>
                    <IconButton hover size="tiny" element={iconButton}><AddIcon /></IconButton>
                    <IconButton hover size="small" element={iconButton}><AddIcon /></IconButton>
                    <IconButton hover element={iconButton}><AddIcon /></IconButton>
                    <IconButton hover size="large" element={iconButton}><AddIcon /></IconButton>
                    <IconButton loading hover element={iconButton}><AddIcon /></IconButton>
                </Stack>
                <Stack align="end">
                    <IconButton focus hover size="mini" element={iconButton}><AddIcon /></IconButton>
                    <IconButton focus hover size="tiny" element={iconButton}><AddIcon /></IconButton>
                    <IconButton focus hover size="small" element={iconButton}><AddIcon /></IconButton>
                    <IconButton focus hover element={iconButton}><AddIcon /></IconButton>
                    <IconButton focus hover size="large" element={iconButton}><AddIcon /></IconButton>
                    <IconButton loading focus hover element={iconButton}><AddIcon /></IconButton>
                </Stack>
            </VerticalStack>
        )
        .add("styling", () =>
            <Stack>
                <IconButton className="bg-red" element={iconButton}><AddIcon /></IconButton>
                <IconButton style={{ backgroundColor: "red" }} element={iconButton}><AddIcon /></IconButton>
            </Stack>
        )
        .add("as anchor", () =>
            <IconButton as="a" element={iconButton}><AddIcon /></IconButton>
        );
}
