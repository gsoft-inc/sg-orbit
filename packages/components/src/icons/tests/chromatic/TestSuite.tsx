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
        </Stack>
    );
}
