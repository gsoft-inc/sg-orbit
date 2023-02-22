import "./Usage.css";
import { Disclosure, DisclosureArrow, DisclosureProps } from "@components/disclosure";
import { Div, HtmlButton } from "@components/html";
import { LearnUsageLink } from "./LearnUsageLink";
import { Snippet } from "@stories/components";
import { Text } from "@components/typography";
import { components } from "@storybook/components";
import { ReactElement } from "react";
import { CreatedIconProps } from "@components/icons";

const H2 = components.h2;
const H4 = components.h4;

interface UsageSectionProps {
    iconDisplayName: string;
    iconFileName: string;
    iconComponent: ReactElement<CreatedIconProps>;
}

export function UsageSection({ iconDisplayName, iconFileName, iconComponent }: UsageSectionProps) {
    // @ts-expect-error mdxType is not part of the props
    const componentType = iconComponent.props.mdxType;

    return (
        <>
            <H2>Usage</H2>
            <Div paddingTop={4}>
                <IconComponent componentType={componentType} />
                <ImageSource componentType={componentType} iconFileName={iconFileName} iconDisplayName={iconDisplayName} />
                <CssBackground iconFileName={iconFileName} iconDisplayName={iconDisplayName} />
            </Div>
        </>
    );
}

interface DisclosableSectionProps extends DisclosureProps {
    name:string;
}

function DisclosableSection({ name, children, ...rest }: DisclosableSectionProps) {
    return (
        <Disclosure {...rest}>
            <HtmlButton className="o-ui-sb-gallery-item-variant-section-toggle" type="button">
                <Text size="lg" className="o-ui-sb-gallery-item-variant-section-toggle-text">{name}</Text>
                <DisclosureArrow />
            </HtmlButton>
            <Div className="o-ui-sb-gallery-item-variant-section-content">
                {children}
            </Div>
        </Disclosure>
    );
}

interface IconComponentProps{
    componentType: string;
}

function IconComponent({ componentType }: IconComponentProps) {
    return (
        <DisclosableSection name="Use as a component" defaultOpen>
            <>
                <H4>Import</H4>
                <Snippet language="javascript" code={`import { ${componentType} } from "@sharegate/orbit-ui"`} />
                <H4>Usage</H4>
                <Snippet language="jsx" code={`<${componentType} />`} />
                <LearnUsageLink className="o-ui-sb-gallery-item-variant-usage" />
            </>
        </DisclosableSection>
    );
}

interface ImageSourceProps{
    componentType: string;
    iconFileName: string;
    iconDisplayName: string;
}

function ImageSource({ componentType, iconFileName, iconDisplayName }: ImageSourceProps) {
    return (
        <DisclosableSection name="As an image source">
            <>
                <H4>Import</H4>
                <Snippet language="javascript" code={`import ${componentType} from "@orbit-ui/icons/${iconFileName}";`} />
                <H4>Usage</H4>
                <Snippet language="jsx" code={`<img src={${componentType}} alt="${iconDisplayName}" />`} />
                <LearnUsageLink className="o-ui-sb-gallery-item-variant-usage" />
            </>
        </DisclosableSection>
    );
}
interface CssBackgroundProps {
    iconFileName: string;
    iconDisplayName: string;
}

function CssBackground({ iconFileName, iconDisplayName }: CssBackgroundProps) {
    const code = `.${iconDisplayName.replace(/\s+/g, "-").toLowerCase()} {
    background: url("~@orbit-ui/icons/${iconFileName}");
    width: var(--o-ui-sz-4);
    height: var(--o-ui-sz-4);
}`;

    return (
        <DisclosableSection name="As a CSS background">
            <>
                <Snippet language="css" code={code} />
                <LearnUsageLink />
            </>
        </DisclosableSection>
    );
}
