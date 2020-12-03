import { LearnUsageLink } from "./LearnUsageLink";
import { Snippet } from "@stories/components";
import { Tab } from "semantic-ui-react";
import { VARIANT_SHAPE } from "../shapes";
import { arrayOf, shape, string } from "prop-types";

function IconComponent({ componentType }) {
    return (
        <details>
            <summary className="marine-900">Use as a component</summary>
            <h4 className="marine-900 ma0 pa0 mt4">Import</h4>
            <Snippet language="javascript" code={`import { ${componentType} } from "@orbit-ui/react-components";`} className="mv2" />
            <h4 className="marine-900 ma0 pa0 mt4">Usage</h4>
            <Snippet language="jsx" code={`<${componentType} />`} className="mv2" />
            <LearnUsageLink />
        </details>
    );
}

function ImageSource({ componentType, iconFileName, iconDisplayName }) {
    return (
        <details>
            <summary className="marine-900">As an image source</summary>
            <h4 className="marine-900 ma0 pa0 mt4">Import</h4>
            <Snippet language="javascript" code={`import ${componentType} from "@orbit-ui/icons/${iconFileName}";`} className="mv2" />
            <h4 className="marine-900 ma0 pa0 mt4">Usage</h4>
            <Snippet language="jsx" code={`<img src={${componentType}} alt="${iconDisplayName}" className="w6 h6" />`} className="mv2" />
            <LearnUsageLink />
        </details>
    );
}

function CssBackground({ iconFileName, iconDisplayName }) {
    const code = `.${iconDisplayName.replace(/\s+/g, "-").toLowerCase()} {
    background: url("~@orbit-ui/icons/${iconFileName}");
    width: var(--scale-foxtrot);
    height: var(--scale-foxtrot);
}
    `;

    return (
        <details>
            <summary className="marine-900">As a CSS background</summary>
            <Snippet language="css" code={code} className="mv2" />
            <LearnUsageLink />
        </details>
    );
}

function Variant({ iconDisplayName, iconComponent, iconFileName }) {
    const componentType = iconComponent.props.mdxType;

    return (
        <div className="pt4">
            <IconComponent componentType={componentType} />
            <ImageSource componentType={componentType} iconFileName={iconFileName} iconDisplayName={iconDisplayName} />
            <CssBackground iconFileName={iconFileName} iconDisplayName={iconDisplayName} />
        </div>
    );
}

export function Variants({ iconDisplayName, variants }) {
    return (
        <>
            <h2 className="marine-900 ma0 pa0 mt2 mb4">Variants</h2>
            <Tab menu={{ secondary: true, pointing: true }} panes={variants.map(x => ({ menuItem: x.name, render: () => <Variant iconDisplayName={iconDisplayName} {...x} /> }))} />
        </>
    );
}

Variants.propTypes = {
    iconDisplayName: string.isRequired,
    variants: arrayOf(shape(VARIANT_SHAPE))
};
