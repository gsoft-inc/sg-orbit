import "./html.css";

import { ComponentProps, ElementType } from "react";
import { htmlElement } from "./htmlElement";
import { isNil } from "../../shared";

// Sectioning & Content sectioning

export const Address = htmlElement("html-address", "address", "o-ui-html-address");

export const Article = htmlElement("html-article", "article", "o-ui-html-article");

export const Aside = htmlElement("html-aside", "aside", "o-ui-html-aside");

export const HtmlFooter = htmlElement("html-footer", "footer", "o-ui-html-footer");

export const HtmlH1 = htmlElement("html-h1", "h1", "o-ui-html-h1");
export const HtmlH2 = htmlElement("html-h2", "h2", "o-ui-html-h2");
export const HtmlH3 = htmlElement("html-h3", "h3", "o-ui-html-h3");
export const HtmlH4 = htmlElement("html-h4", "h4", "o-ui-html-h4");
export const HtmlH5 = htmlElement("html-h5", "h5", "o-ui-html-h5");
export const HtmlH6 = htmlElement("html-h6", "h6", "o-ui-html-h6");

export const HtmlHeader = htmlElement("html-header", "header", "o-ui-html-header");

export const Main = htmlElement("html-main", "main", "o-ui-html-main");

export const Nav = htmlElement("html-nav", "nav", "o-ui-html-nav");

export const Section = htmlElement("html-section", "section", "o-ui-html-section");

export type AddressProps = ComponentProps<typeof Address>;
export type ArticleProps = ComponentProps<typeof Article>;
export type AsideProps = ComponentProps<typeof Aside>;
export type HtmlFooterProps = ComponentProps<typeof HtmlFooter>;
export type HtmlH1Props = ComponentProps<typeof HtmlH1>;
export type HtmlH2Props = ComponentProps<typeof HtmlH2>;
export type HtmlH3Props = ComponentProps<typeof HtmlH3>;
export type HtmlH4Props = ComponentProps<typeof HtmlH4>;
export type HtmlH5Props = ComponentProps<typeof HtmlH5>;
export type HtmlH6Props = ComponentProps<typeof HtmlH6>;
export type HtmlHeaderProps = ComponentProps<typeof HtmlHeader>;
export type MainProps = ComponentProps<typeof Main>;
export type NavProps = ComponentProps<typeof Nav>;
export type SectionProps = ComponentProps<typeof Section>;

// Text content

export const Div = htmlElement("html-div", "div", "o-ui-html-div");

export const HtmlParagraph = htmlElement("html-p", "p", "o-ui-html-p");

export const OL = htmlElement("html-ol", "ol", "o-ui-html-ol");
export const UL = htmlElement("html-ul", "ul", "o-ui-html-ul");
export const LI = htmlElement("html-li", "li", "o-ui-html-li");

export type DivProps = ComponentProps<typeof Div>;
export type HtmlParagraphProps = ComponentProps<typeof HtmlParagraph>;
export type OLProps = ComponentProps<typeof OL>;
export type ULProps = ComponentProps<typeof UL>;
export type LIProps = ComponentProps<typeof LI>;

// Inline text semantics

export const A = htmlElement("html-a", "a", "o-ui-html-a");

export const Span = htmlElement("html-span", "span", "o-ui-html-span");

export type AProps = ComponentProps<typeof A>;
export type SpanProps = ComponentProps<typeof Span>;

// Image and multimedia

export const Img = htmlElement("html-img", "img", "o-ui-html-img");

export type ImgProps = ComponentProps<typeof Img>;

// Table content

export const Table = htmlElement("html-table", "table", "o-ui-html-table");

export const THead = htmlElement("html-thead", "thead", "o-ui-html-thead");
export const TBody = htmlElement("html-tbody", "tbody", "o-ui-html-tbody");
export const TFoot = htmlElement("html-tfoot", "tfoot", "o-ui-html-tfoot");

export const TH = htmlElement("html-th", "th", "o-ui-html-th");
export const TR = htmlElement("html-tr", "tr", "o-ui-html-tr");
export const TD = htmlElement("html-td", "td", "o-ui-html-td");

export type TableProps = ComponentProps<typeof Table>;
export type THeadProps = ComponentProps<typeof THead>;
export type TBodyProps = ComponentProps<typeof TBody>;
export type TFootProps = ComponentProps<typeof TFoot>;
export type THProps = ComponentProps<typeof TH>;
export type TRProps = ComponentProps<typeof TR>;
export type TDProps = ComponentProps<typeof TD>;

// Forms

export const HtmlButton = htmlElement("html-button", "button", "o-ui-html-button");

export const HtmlForm = htmlElement("html-form", "form", "o-ui-html-form");

export const HtmlInput = htmlElement("html-input", "input", "o-ui-html-input");

export const HtmlLabel = htmlElement("html-label", "label", "o-ui-html-label");

export const HtmlTextArea = htmlElement("html-textarea", "textarea", "o-ui-html-textarea");

export type HtmlButtonProps = ComponentProps<typeof HtmlButton>;
export type HtmlFormProps = ComponentProps<typeof HtmlForm>;
export type HtmlInputProps = ComponentProps<typeof HtmlInput>;
export type HtmlLabelProps = ComponentProps<typeof HtmlLabel>;
export type TextAreaProps = ComponentProps<typeof HtmlTextArea>;

///////////

export const HtmlElementType: Record<any, ElementType> = {
    "a": A,
    "address": Address,
    "article": Article,
    "button": HtmlButton,
    "div": Div,
    "footer": HtmlFooter,
    "form": HtmlForm,
    "h1": HtmlH1,
    "h2": HtmlH2,
    "h3": HtmlH3,
    "h4": HtmlH4,
    "h5": HtmlH5,
    "h6": HtmlH6,
    "header": HtmlHeader,
    "img": Img,
    "input": HtmlInput,
    "label": HtmlLabel,
    "li": LI,
    "main": Main,
    "nav": Nav,
    "ol": OL,
    "p": HtmlParagraph,
    "section": Section,
    "span": Span,
    "table": Table,
    "tbody": TBody,
    "td": TD,
    "textarea": HtmlTextArea,
    "tfoot": TFoot,
    "th": TH,
    "thead": THead,
    "tr": TR,
    "ul": UL
};

export function getHtmlElementType(as: ElementType) {
    const elementType = HtmlElementType[as as any];

    if (!isNil(elementType)) {
        return elementType;
    }

    return as;
}
