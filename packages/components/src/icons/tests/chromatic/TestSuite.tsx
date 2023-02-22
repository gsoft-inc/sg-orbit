import { Div } from "@components/html";
import { Inline, Stack } from "@components/layout";
import { ComponentType } from "react";
import {
    IconProps
} from "@components/icons";

interface TestSuiteProps {
    icon?: ComponentType<Partial<IconProps>>;
}

export function TestSuite({ icon: Icon }: TestSuiteProps) {
    return (
        <Stack>
            <Inline alignY="end">
                <Icon />
            </Inline>
            <Div fontSize={1}>
                <Icon size="inherit" />
            </Div>
        </Stack>
    );
}
