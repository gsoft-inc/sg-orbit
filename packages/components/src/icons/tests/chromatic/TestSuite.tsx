import { Div } from "@components/html";
import { Inline, Stack } from "@components/layout";
import { ComponentType } from "react";
import {
    IconProps
} from "@components/icons";

interface TestSuiteProps {
    multiIcon?: ComponentType<Partial<IconProps>>;
}

export function TestSuite({ multiIcon: MultiIcon }: TestSuiteProps) {
    return (
        <Stack>
            <Inline alignY="end">
                <MultiIcon size="2xs" />
                <MultiIcon size="xs" />
                <MultiIcon size="sm" />
                <MultiIcon />
                <MultiIcon size="lg" />
                <MultiIcon size="xl" />
                <MultiIcon size="xl" fill="warning-10" />
                <MultiIcon size="xl" className="fill-red" />
                <MultiIcon size="xl" style={{ fill: "red" }} />
            </Inline>
            <Div fontSize={1}>
                <MultiIcon size="inherit" />
            </Div>
        </Stack>
    );
}
