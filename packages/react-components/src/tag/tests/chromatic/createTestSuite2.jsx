import { Badge } from "@react-components/badge";
import { Button } from "@react-components/button";
import { CrossIcon, LightbulbIcon } from "@react-components/icons";
import { Stack } from "@react-components/stack";
import { cloneElement } from "react";

function Tag({ element, ...rest }) {
    return cloneElement(element, rest);
}

export function createTestSuite(tag, stories) {
    return stories
        .add("default", () =>
            <Stack direction="vertical">
                <Stack align="end">
                    <Tag size="small" element={tag}>Falcon 9</Tag>
                    <Tag element={tag}>Falcon 9</Tag>
                    <Tag size="large" element={tag}>Falcon 9</Tag>
                </Stack>
                <Stack>
                    <Tag fluid element={tag}>Falcon 9</Tag>
                </Stack>
                <Stack className="w-10">
                    <Tag fluid element={tag}>Falcon 9</Tag>
                </Stack>
            </Stack>
        );
}
