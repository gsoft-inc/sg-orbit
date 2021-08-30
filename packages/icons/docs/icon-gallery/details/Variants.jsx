import "./Variants.css";

import { Box, Disclosure, DisclosureArrow, Text } from "@react-components";
import { Content, Header, Item, Tabs } from "@react-components";
import { LearnUsageLink } from "./LearnUsageLink";
import { Snippet } from "@stories/components";
import { VARIANT_SHAPE } from "../shapes";
import { arrayOf, shape, string } from "prop-types";
import { components } from "@storybook/components";

const H2 = components.h2;
const H4 = components.h4;

function VariantSection({ name, children }) {
    return (
        <Disclosure>
            <button className="o-ui-sb-gallery-item-variant-section-toggle" type="button">
                <Text size="lg" className="o-ui-sb-gallery-item-variant-section-toggle-text">{name}</Text>
                <DisclosureArrow />
            </button>
            <Box className="o-ui-sb-gallery-item-variant-section-content">
                {children}
            </Box>
        </Disclosure>
    );
}

function IconComponent({ componentType }) {
    return (
        <VariantSection name="Use as a component">
            <>
                <H4>Import</H4>
                <Snippet language="javascript" code={`import { ${componentType} } from "@orbit-ui/react-components"`} />
                <H4>Usage</H4>
                <Snippet language="jsx" code={`<${componentType} />`} />
                <LearnUsageLink className="o-ui-sb-gallery-item-variant-usage" />
            </>
        </VariantSection>
    );
}

function ImageSource({ componentType, iconFileName, iconDisplayName }) {
    return (
        <VariantSection name="As an image source">
            <>
                <H4>Import</H4>
                <Snippet language="javascript" code={`import ${componentType} from "@orbit-ui/icons/${iconFileName}";`} />
                <H4>Usage</H4>
                <Snippet language="jsx" code={`<img src={${componentType}} alt="${iconDisplayName}" className="w6 h6" />`} />
                <LearnUsageLink className="o-ui-sb-gallery-item-variant-usage" />
            </>
        </VariantSection>
    );
}

function CssBackground({ iconFileName, iconDisplayName }) {
    const code = `.${iconDisplayName.replace(/\s+/g, "-").toLowerCase()} {
    background: url("~@orbit-ui/icons/${iconFileName}");
    width: var(--o-ui-space-6);
    height: var(--o-ui-space-6);
}`;

    return (
        <VariantSection name="As a CSS background">
            <>
                <Snippet language="css" code={code} />
                <LearnUsageLink />
            </>
        </VariantSection>
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
            <Tabs aria-label="Icon variants">
                {variants.map(x => (
                    <Item key={x.name}>
                        <Header>{x.name}</Header>
                        <Content>
                            <Variant
                                iconDisplayName={iconDisplayName}
                                {...x}
                            />
                        </Content>
                    </Item>
                ))}
            </Tabs>
        </>
    );
}

Variants.propTypes = {
    iconDisplayName: string.isRequired,
    variants: arrayOf(shape(VARIANT_SHAPE))
};
