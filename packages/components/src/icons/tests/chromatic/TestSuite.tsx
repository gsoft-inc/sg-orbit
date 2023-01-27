import { Div } from "@components/html";
import { Inline, Stack } from "@components/layout";
import { isNil } from "@components/shared";
import { ComponentType } from "react";
import {
    IconProps
} from "@components/icons";

interface TestSuiteProps {
    icon24?: ComponentType<Partial<IconProps>>;
    icon32?: ComponentType<Partial<IconProps>>;
    multiIcon?: ComponentType<Partial<IconProps>>;
}

export function TestSuite({ icon24: Icon24, icon32: Icon32, multiIcon: MultiIcon }: TestSuiteProps) {
    return (
        <Stack>
            {!isNil(Icon24) && (
                <Inline alignY="end">
                    <Icon24 size="2xs" />
                    <Icon24 size="xs" />
                    <Icon24 size="sm" />
                    <Icon24 />
                    <Icon24 size="lg" />
                    <Icon24 size="xl" />
                    <Icon24 size="xl" fill="warning-10" />
                    <Icon24 size="xl" className="fill-red" />
                    <Icon24 size="xl" style={{ fill: "red" }} />
                </Inline>
            )}
            {!isNil(Icon32) && (
                <Inline alignY="end">
                    <Icon32 size="2xs" />
                    <Icon32 size="xs" />
                    <Icon32 size="sm" />
                    <Icon32 />
                    <Icon32 size="lg" />
                    <Icon32 size="xl" />
                    <Icon32 size="xl" fill="warning-10" />
                    <Icon32 size="xl" className="fill-red" />
                    <Icon32 size="xl" style={{ fill: "red" }} />
                </Inline>
            )}
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
