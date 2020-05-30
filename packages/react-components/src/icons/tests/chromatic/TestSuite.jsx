import { isNil } from "lodash";

export function TestSuite({ icon24: Icon24, icon32: Icon32, multiIcon: MultiIcon }) {
    return (
        <div className="flex flex-column">
            <If condition={!isNil(Icon24)}>
                <div className="flex items-end">
                    <Icon24 size="micro" />
                    <Icon24 size="mini" />
                    <Icon24 size="tiny" />
                    <Icon24 size="small" />
                    <Icon24 />
                    <Icon24 size="large" />
                    <Icon24 size="big" />
                    <Icon24 size="huge" />
                    <Icon24 size="massive" />
                    <Icon24 size="massive" className="fill-sunray-900" />
                    <Icon24 size="massive" style={{ fill: "var(--sunray-900)" }} />
                </div>
            </If>
            <If condition={!isNil(Icon32)}>
                <div className="flex items-end">
                    <Icon32 size="micro" />
                    <Icon32 size="mini" />
                    <Icon32 size="tiny" />
                    <Icon32 size="small" />
                    <Icon32 />
                    <Icon32 size="large" />
                    <Icon32 size="big" />
                    <Icon32 size="huge" />
                    <Icon32 size="massive" />
                    <Icon32 size="massive" className="fill-sunray-900" />
                    <Icon32 size="massive" style={{ fill: "var(--sunray-900)" }} />
                </div>
            </If>
            <div className="flex items-end">
                <MultiIcon size="micro" />
                <MultiIcon size="mini" />
                <MultiIcon size="tiny" />
                <MultiIcon size="small" />
                <MultiIcon />
                <MultiIcon size="large" />
                <MultiIcon size="big" />
                <MultiIcon size="huge" />
                <MultiIcon size="massive" />
                <MultiIcon size="massive" className="fill-sunray-900" />
                <MultiIcon size="massive" style={{ fill: "var(--sunray-900)" }} />
            </div>
        </div>
    );
}
