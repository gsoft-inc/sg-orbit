import { ComponentProps, ElementType } from "react";

import { htmlElement } from "./htmlElement";
import { isNil } from "../../shared";

// Sectioning & Content sectioning

export const Address = htmlElement("html-address", "address");

export const Article = htmlElement("html-article", "article");

export const Aside = htmlElement("html-aside", "aside");

export const HtmlFooter = htmlElement("html-footer", "footer");

export const HtmlH1 = htmlElement("html-h1", "h1");
export const HtmlH2 = htmlElement("html-h2", "h2");
export const HtmlH3 = htmlElement("html-h3", "h3");
export const HtmlH4 = htmlElement("html-h4", "h4");
export const HtmlH5 = htmlElement("html-h5", "h5");
export const HtmlH6 = htmlElement("html-h6", "h6");

export const HtmlHeader = htmlElement("html-header", "header");

export const Main = htmlElement("html-main", "main");

export const Nav = htmlElement("html-nav", "nav");

export const HtmlSection = htmlElement("html-section", "section");

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
export type HtmlSectionProps = ComponentProps<typeof HtmlSection>;

// Text content

export const Div = htmlElement("html-div", "div");

export const HtmlParagraph = htmlElement("html-p", "p");

export const OL = htmlElement("html-ol", "ol");
export const UL = htmlElement("html-ul", "ul");
export const LI = htmlElement("html-li", "li");

export type DivProps = ComponentProps<typeof Div>;
export type HtmlParagraphProps = ComponentProps<typeof HtmlParagraph>;
export type OLProps = ComponentProps<typeof OL>;
export type ULProps = ComponentProps<typeof UL>;
export type LIProps = ComponentProps<typeof LI>;

// Inline text semantics

export const A = htmlElement("html-a", "a");

export const Span = htmlElement("html-span", "span");

export type AProps = ComponentProps<typeof A>;
export type SpanProps = ComponentProps<typeof Span>;

// Image and multimedia

export const Img = htmlElement("html-img", "img");

export type ImgProps = ComponentProps<typeof Img>;

// Table content

export const Table = htmlElement("html-table", "table");

export const THead = htmlElement("html-thead", "thead");
export const TBody = htmlElement("html-tbody", "tbody");
export const TFoot = htmlElement("html-tfoot", "tfoot");

export const TH = htmlElement("html-th", "th");
export const TR = htmlElement("html-tr", "tr");
export const TD = htmlElement("html-td", "td");

export type TableProps = ComponentProps<typeof Table>;
export type THeadProps = ComponentProps<typeof THead>;
export type TBodyProps = ComponentProps<typeof TBody>;
export type TFootProps = ComponentProps<typeof TFoot>;
export type THProps = ComponentProps<typeof TH>;
export type TRProps = ComponentProps<typeof TR>;
export type TDProps = ComponentProps<typeof TD>;

// Forms

export const HtmlButton = htmlElement("html-button", "button");

export const HtmlForm = htmlElement("html-form", "form");

export const HtmlInput = htmlElement("html-input", "input");

export const HtmlLabel = htmlElement("html-label", "label");

export const HtmlTextArea = htmlElement("html-textarea", "textarea");

export type HtmlButtonProps = ComponentProps<typeof HtmlButton>;
export type HtmlFormProps = ComponentProps<typeof HtmlForm>;
export type HtmlInputProps = ComponentProps<typeof HtmlInput>;
export type HtmlLabelProps = ComponentProps<typeof HtmlLabel>;
export type HtmlTextAreaProps = ComponentProps<typeof HtmlTextArea>;

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
    "section": HtmlSection,
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
