import { Inline, Stack } from "@react-components/layout";
import { LightbulbIcon } from "@react-components/icons";
import { Text } from "@react-components/typography";
import { cloneElement } from "react";
import { paramsBuilder } from "@stories/utils";

function ToggleButton({ element, ...rest }) {
    return cloneElement(element, rest);
}

export function createToggleButtonTestSuite(element, stories) {
    return stories
        .add("default", () =>
            <Stack>
                <Inline alignY="end">
                    <ToggleButton size="sm" element={element}>Cutoff</ToggleButton>
                    <ToggleButton element={element}>Cutoff</ToggleButton>
                </Inline>
                <ToggleButton element={element}>
                    <Text>Cutoff</Text>
                    <LightbulbIcon />
                </ToggleButton>
            </Stack>,
             {
                 ...paramsBuilder()
                     .validateBreakpoints()
                     .build()
             }
        )
        .add("states", () =>
            <Inline alignY="end">
                <ToggleButton checked element={element}>Cutoff</ToggleButton>
                <ToggleButton active element={element}>Cutoff</ToggleButton>
                <ToggleButton focus element={element}>Cutoff</ToggleButton>
                <ToggleButton hover element={element}>Cutoff</ToggleButton>
                <ToggleButton focus hover element={element}>Cutoff</ToggleButton>
                <ToggleButton disabled element={element}>Cutoff</ToggleButton>
            </Inline>
        )
        .add("cicular", () =>
            <Stack>
                <Inline alignY="end">
                    <ToggleButton size="sm" shape="rounded" element={element}>Aa</ToggleButton>
                    <ToggleButton shape="rounded" element={element}>Aa</ToggleButton>
                </Inline>
                <Inline alignY="end">
                    <ToggleButton checked shape="rounded" element={element}>Aa</ToggleButton>
                    <ToggleButton active shape="rounded" element={element}>Aa</ToggleButton>
                    <ToggleButton focus vshape="rounded" element={element}>Aa</ToggleButton>
                    <ToggleButton hover shape="rounded" element={element}>Aa</ToggleButton>
                    <ToggleButton focus hover shape="rounded" element={element}>Aa</ToggleButton>
                    <ToggleButton disabled shape="rounded" element={element}>Aa</ToggleButton>
                </Inline>
            </Stack>
        )
        .add("cicular", () =>
            <Stack>
                <Inline alignY="end">
                    <ToggleButton size="sm" shape="circular" element={element}>Aa</ToggleButton>
                    <ToggleButton shape="circular" element={element}>Aa</ToggleButton>
                </Inline>
                <Inline alignY="end">
                    <ToggleButton checked shape="circular" element={element}>Aa</ToggleButton>
                    <ToggleButton active shape="circular" element={element}>Aa</ToggleButton>
                    <ToggleButton focus vshape="circular" element={element}>Aa</ToggleButton>
                    <ToggleButton hover shape="circular" element={element}>Aa</ToggleButton>
                    <ToggleButton focus hover shape="circular" element={element}>Aa</ToggleButton>
                    <ToggleButton disabled shape="circular" element={element}>Aa</ToggleButton>
                </Inline>
            </Stack>
        )
        .add("checked", () =>
            <Inline>
                <ToggleButton checked element={element}>Cutoff</ToggleButton>
                <ToggleButton defaultChecked element={element}>Cutoff</ToggleButton>
                <ToggleButton checked element={element}>
                    <Text>Cutoff</Text>
                    <LightbulbIcon />
                </ToggleButton>
            </Inline>
        );
}
