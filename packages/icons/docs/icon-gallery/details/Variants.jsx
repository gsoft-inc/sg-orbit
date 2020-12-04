import "./Variants.css";

import { LearnUsageLink } from "./LearnUsageLink";
import { Snippet } from "@stories/components";
import { Tab } from "semantic-ui-react";
import { VARIANT_SHAPE } from "../shapes";
import { arrayOf, shape, string } from "prop-types";
import { components } from "@storybook/components/html";

const H2 = components.h2;
const H4 = components.h4;

function IconComponent({ componentType }) {
    return (
        <details>
            <summary className="marine-900">Use as a component</summary>
            <H4>Import</H4>
            <Snippet language="javascript" code={`import { ${componentType} } from "@orbit-ui/react-components"`} className="mv2" />
            <H4>Usage</H4>
            <Snippet language="jsx" code={`<${componentType} />`} className="mv2" />
            <LearnUsageLink className="o-ui-sb-gallery-item-variant-usage" />
        </details>
    );
}

function ImageSource({ componentType, iconFileName, iconDisplayName }) {
    return (
        <details>
            <summary className="marine-900">As an image source</summary>
            <H4>Import</H4>
            <Snippet language="javascript" code={`import ${componentType} from "@orbit-ui/icons/${iconFileName}";`} className="mv2" />
            <H4>Usage</H4>
            <Snippet language="jsx" code={`<img src={${componentType}} alt="${iconDisplayName}" className="w6 h6" />`} className="mv2" />
            <LearnUsageLink className="o-ui-sb-gallery-item-variant-usage" />
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
            <LearnUsageLink className="o-ui-sb-gallery-item-variant-usage" />
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
            <H2>Variants</H2>
            <Tab menu={{ secondary: true, pointing: true }} panes={variants.map(x => ({ menuItem: x.name, render: () => <Variant iconDisplayName={iconDisplayName} {...x} /> }))} />
        </>
    );
}

Variants.propTypes = {
    iconDisplayName: string.isRequired,
    variants: arrayOf(shape(VARIANT_SHAPE))
};
