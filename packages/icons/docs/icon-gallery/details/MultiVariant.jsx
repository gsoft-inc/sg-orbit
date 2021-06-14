import "./MultiVariant.css";

import { CheckeredBackground } from "@stories/components";
import { Inline } from "@react-components/layout";
import { LearnUsageLink } from "./LearnUsageLink";
import { MULTI_VARIANT_SHAPE } from "../shapes";
import { Snippet } from "@stories/components";
import { cloneElement } from "react";
import { components } from "@storybook/components";

const H4 = components.h4;

function ImportSection({ componentType }) {
    return (
        <>
            <H4>Import</H4>
            <Snippet language="javascript" code={`import { ${componentType} } from "@orbit-ui/react-components"`} className="mv2" />
        </>
    );
}

function UsageSection({ componentType }) {
    return (
        <>
            <H4>Usage</H4>
            <Snippet language="jsx" code={`<${componentType} />`} className="mv2" />
            <LearnUsageLink className="o-ui-sb-gallery-item-multi-variant-usage" />
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
