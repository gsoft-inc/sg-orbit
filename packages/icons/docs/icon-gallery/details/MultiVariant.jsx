import { CheckeredBackground } from "@stories/components";
import { Inline } from "@react-components/layout";
import { LearnUsageLink } from "./LearnUsageLink";
import { MULTI_VARIANT_SHAPE } from "../shapes";
import { Snippet } from "@stories/components";
import { cloneElement } from "react";

function ImportSection({ componentType }) {
    return (
        <>
            <h4 className="marine-900 pa0 ma0 mt4">Import</h4>
            <Snippet language="javasript" code={`import { ${componentType} } from "@orbit-ui/react-components";`} className="mv2" />
        </>
    );
}

function UsageSection({ componentType }) {
    return (
        <>
            <h4 className="marine-900 pa0 ma0 mt4">Usage</h4>
            <Snippet language="javascript" code={`<${componentType} />`} className="mv2" />
            <LearnUsageLink />
        </>
    );
}

function PreviewSection({ icon }) {
    return (
        <CheckeredBackground>
            <Inline verticalAlign="end" gap={2}>
                {cloneElement(icon, { size: "2xs" })}
                {cloneElement(icon, { size: "xs" })}
                {cloneElement(icon, { size: "sm" })}
                {cloneElement(icon, { size: "md" })}
                {cloneElement(icon, { size: "lg" })}
                {cloneElement(icon, { size: "xl" })}
            </Inline>
        </CheckeredBackground>
    );
}

export function MultiVariant({ icon }) {
    const componentType = icon.props.mdxType;

    return (
        <>
            <PreviewSection icon={icon} />
            <ImportSection componentType={componentType} />
            <UsageSection componentType={componentType} />
        </>
    );
}

MultiVariant.propTypes = MULTI_VARIANT_SHAPE;
