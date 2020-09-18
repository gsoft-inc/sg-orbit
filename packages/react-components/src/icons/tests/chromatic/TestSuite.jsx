import { Inline } from "@react-components/layout";
import { isNil } from "lodash";

export function TestSuite({ icon24: Icon24, icon32: Icon32, multiIcon: MultiIcon }) {
    return (
        <div className="flex flex-column">
            <If condition={!isNil(Icon24)}>
                <Inline align="end">
                    <Icon24 size="3xs" />
                    <Icon24 size="2xs" />
                    <Icon24 size="xs" />
                    <Icon24 size="sm" />
                    <Icon24 />
                    <Icon24 size="lg" />
                    <Icon24 size="xl" />
                    <Icon24 size="2xl" />
                    <Icon24 size="3xl" />
                    <Icon24 size="3xl" className="fill-sunray-900" />
                    <Icon24 size="3xl" style={{ fill: "var(--sunray-900)" }} />
                </Inline>
            </If>
            <If condition={!isNil(Icon32)}>
                <Inline align="end">
                    <Icon32 size="3xs" />
                    <Icon32 size="2xs" />
                    <Icon32 size="xs" />
                    <Icon32 size="sm" />
                    <Icon32 />
                    <Icon32 size="lg" />
                    <Icon32 size="xl" />
                    <Icon32 size="2xl" />
                    <Icon32 size="3xl" />
                    <Icon32 size="3xl" className="fill-sunray-900" />
                    <Icon32 size="3xl" style={{ fill: "var(--sunray-900)" }} />
                </Inline>
            </If>
            <Inline align="end">
                <MultiIcon size="3xs" />
                <MultiIcon size="2xs" />
                <MultiIcon size="xs" />
                <MultiIcon size="sm" />
                <MultiIcon />
                <MultiIcon size="lg" />
                <MultiIcon size="xl" />
                <MultiIcon size="2xl" />
                <MultiIcon size="3xl" />
                <MultiIcon size="3xl" className="fill-sunray-900" />
                <MultiIcon size="3xl" style={{ fill: "var(--sunray-900)" }} />
            </Inline>
        </div>
    );
}
