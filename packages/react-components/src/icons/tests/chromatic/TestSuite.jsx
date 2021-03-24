import { Inline, Stack } from "@react-components/layout";
import { isNil } from "lodash";

export function TestSuite({ icon24: Icon24, icon32: Icon32, multiIcon: MultiIcon }) {
    return (
        <Stack>
            <If condition={!isNil(Icon24)}>
                <Inline verticalAlign="end">
                    <Icon24 size="2xs" />
                    <Icon24 size="xs" />
                    <Icon24 size="sm" />
                    <Icon24 />
                    <Icon24 size="lg" />
                    <Icon24 size="xl" />
                    <Icon24 size="xl" className="fill-sunray-900" />
                    <Icon24 size="xl" style={{ fill: "var(--o-ui-global-sunray-900)" }} />
                </Inline>
            </If>
            <If condition={!isNil(Icon32)}>
                <Inline verticalAlign="end">
                    <Icon32 size="2xs" />
                    <Icon32 size="xs" />
                    <Icon32 size="sm" />
                    <Icon32 />
                    <Icon32 size="lg" />
                    <Icon32 size="xl" />
                    <Icon32 size="xl" className="fill-sunray-900" />
                    <Icon32 size="xl" style={{ fill: "var(--o-ui-global-sunray-900)" }} />
                </Inline>
            </If>
            <Inline verticalAlign="end">
                <MultiIcon size="2xs" />
                <MultiIcon size="xs" />
                <MultiIcon size="sm" />
                <MultiIcon />
                <MultiIcon size="lg" />
                <MultiIcon size="xl" />
                <MultiIcon size="xl" className="fill-sunray-900" />
                <MultiIcon size="xl" style={{ fill: "var(--o-ui-global-sunray-900)" }} />
            </Inline>
            <div className="f1">
                <MultiIcon size="inherit" />
            </div>
        </Stack>
    );
}
