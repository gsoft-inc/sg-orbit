import { CheckeredBackground } from "@blocks";
import { ComponentImport } from "@blocks/react-components";
import { LearnUsageLink } from "./learn-usage-link";
import { MULTI_VARIANT_SHAPE } from "../shapes";
import { Source } from "@storybook/components";
import { cloneElement } from "react";

function ImportSection({ componentType }) {
    return (
        <>
            <h4 className="marine-900 pa0 ma0 mt4">Import</h4>
            <ComponentImport
                bundle={`import { ${componentType} } from "@orbit-ui/react-components";`}
                standalone={`import { ${componentType} } from "@orbit-ui/react-icons";`}
                className="mv2"
            />
        </>
    );
}

function UsageSection({ componentType }) {
    return (
        <>
            <h4 className="marine-900 pa0 ma0 mt4">Usage</h4>
            <Source language="jsx" dark format={false} code={`<${componentType} />`} className="mv2" />
            <LearnUsageLink />
        </>
    );
}

function PreviewSection({ icon }) {
    return (
        <CheckeredBackground>
            {cloneElement(icon, { size: "tiny" })}
            {cloneElement(icon, { size: "small" })}
            {icon}
            {cloneElement(icon, { size: "large" })}
            {cloneElement(icon, { size: "big" })}
            {cloneElement(icon, { size: "huge" })}
            {cloneElement(icon, { size: "massive" })}
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
