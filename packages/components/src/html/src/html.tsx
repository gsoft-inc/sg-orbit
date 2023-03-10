import { ComponentProps, ElementType } from "react";

import { htmlElement } from "./htmlElement";
import { isNil } from "../../shared";

// Sectioning & Content sectioning

/**
 * A specialized [box](https://orbit.sharegate.design/?path=/docs/box--page) component for HTML address element.
 *
 * [Documentation](https://orbit.sharegate.design/?path=/docs/html-address--example)
*/
export const Address = htmlElement("html-address", "address");

/**
 * A specialized [box](https://orbit.sharegate.design/?path=/docs/box--page) component for HTML article element.
 *
 * [Documentation](https://orbit.sharegate.design/?path=/docs/html-article--page)
*/
export const Article = htmlElement("html-article", "article");

/**
 * A specialized [box](https://orbit.sharegate.design/?path=/docs/box--page) component for HTML aside element.
 *
 * [Documentation](https://orbit.sharegate.design/?path=/docs/html-aside--page)
*/
export const Aside = htmlElement("html-aside", "aside");

/**
 * A specialized [box](https://orbit.sharegate.design/?path=/docs/box--page) component for HTML footer element.
 *
 * [Documentation](https://orbit.sharegate.design/?path=/docs/html-footer--page)
*/
export const HtmlFooter = htmlElement("html-footer", "footer");

/**
 * A specialized [box](https://orbit.sharegate.design/?path=/docs/box--page) component for HTML h1 element.
*/
export const HtmlH1 = htmlElement("html-h1", "h1");

/**
 * A specialized [box](https://orbit.sharegate.design/?path=/docs/box--page) component for HTML h2 element.
*/
export const HtmlH2 = htmlElement("html-h2", "h2");

/**
 * A specialized [box](https://orbit.sharegate.design/?path=/docs/box--page) component for HTML h3 element.
*/
export const HtmlH3 = htmlElement("html-h3", "h3");

/**
 * A specialized [box](https://orbit.sharegate.design/?path=/docs/box--page) component for HTML h4 element.
*/
export const HtmlH4 = htmlElement("html-h4", "h4");

/**
 * A specialized [box](https://orbit.sharegate.design/?path=/docs/box--page) component for HTML h5 element.
*/
export const HtmlH5 = htmlElement("html-h5", "h5");

/**
 * A specialized [box](https://orbit.sharegate.design/?path=/docs/box--page) component for HTML h6 element.
*/
export const HtmlH6 = htmlElement("html-h6", "h6");

/**
 * A specialized [box](https://orbit.sharegate.design/?path=/docs/box--page) component for HTML header element.
 *
 * [Documentation](https://orbit.sharegate.design/?path=/docs/html-header--page)
*/
export const HtmlHeader = htmlElement("html-header", "header");

/**
 * A specialized [box](https://orbit.sharegate.design/?path=/docs/box--page) component for HTML main element.
 *
 * [Documentation](https://orbit.sharegate.design/?path=/docs/html-main--page)
*/
export const Main = htmlElement("html-main", "main");

/**
 * A specialized [box](https://orbit.sharegate.design/?path=/docs/box--page) component for HTML nav element.
 *
 * [Documentation](https://orbit.sharegate.design/?path=/docs/html-nav--page)
*/
export const Nav = htmlElement("html-nav", "nav");

/**
 * A specialized [box](https://orbit.sharegate.design/?path=/docs/box--page) component for HTML section element.
 *
 * [Documentation](https://orbit.sharegate.design/?path=/docs/html-section--page)
*/
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

/**
 * A specialized [box](https://orbit.sharegate.design/?path=/docs/box--page) component for HTML div element.
 *
 * [Documentation](https://orbit.sharegate.design/?path=/docs/html-div--example)
*/
export const Div = htmlElement("html-div", "div");

/**
 * A specialized [box](https://orbit.sharegate.design/?path=/docs/box--page) component for HTML p element.
*/
export const HtmlParagraph = htmlElement("html-p", "p");

/**
 * A specialized [box](https://orbit.sharegate.design/?path=/docs/box--page) component for HTML ol element.
*/
export const OL = htmlElement("html-ol", "ol");

/**
 * A specialized [box](https://orbit.sharegate.design/?path=/docs/box--page) component for HTML ul element.
*/
export const UL = htmlElement("html-ul", "ul");

/**
 * A specialized [box](https://orbit.sharegate.design/?path=/docs/box--page) component for HTML li element.
*/
export const LI = htmlElement("html-li", "li");

export type DivProps = ComponentProps<typeof Div>;
export type HtmlParagraphProps = ComponentProps<typeof HtmlParagraph>;
export type OLProps = ComponentProps<typeof OL>;
export type ULProps = ComponentProps<typeof UL>;
export type LIProps = ComponentProps<typeof LI>;

// Inline text semantics

/**
 * A specialized [box](https://orbit.sharegate.design/?path=/docs/box--page) component for HTML anchor element.
 *
 * [Documentation](https://orbit.sharegate.design/?path=/docs/html-anchor--example)
*/
export const A = htmlElement("html-a", "a");

/**
 * A specialized [box](https://orbit.sharegate.design/?path=/docs/box--page) component for HTML span element.
 *
 * [Documentation](https://orbit.sharegate.design/?path=/docs/html-span--example)
*/
export const Span = htmlElement("html-span", "span");

export type AProps = ComponentProps<typeof A>;
export type SpanProps = ComponentProps<typeof Span>;

// Image and multimedia

/**
 * A specialized [box](https://orbit.sharegate.design/?path=/docs/box--page) component for HTML img element.
 *
 * [Documentation](https://orbit.sharegate.design/?path=/docs/html-img--example)
*/
export const Img = htmlElement("html-img", "img");

export type ImgProps = ComponentProps<typeof Img>;

// Table content

/**
 * A specialized [box](https://orbit.sharegate.design/?path=/docs/box--page) component for HTML table element.
 *
 * [Documentation](https://orbit.sharegate.design/?path=/docs/html-span--example)
*/
export const Table = htmlElement("html-table", "table");

/**
 * A specialized [box](https://orbit.sharegate.design/?path=/docs/box--page) component for HTML thead element.
 *
 * [Documentation](https://orbit.sharegate.design/?path=/docs/html-table--example)
*/
export const THead = htmlElement("html-thead", "thead");

/**
 * A specialized [box](https://orbit.sharegate.design/?path=/docs/box--page) component for HTML tbody element.
 *
 * [Documentation](https://orbit.sharegate.design/?path=/docs/html-table--example)
*/
export const TBody = htmlElement("html-tbody", "tbody");

/**
 * A specialized [box](https://orbit.sharegate.design/?path=/docs/box--page) component for HTML tfoot element.
 *
 * [Documentation](https://orbit.sharegate.design/?path=/docs/html-table--example)
*/
export const TFoot = htmlElement("html-tfoot", "tfoot");

/**
 * A specialized [box](https://orbit.sharegate.design/?path=/docs/box--page) component for HTML th element.
 *
 * [Documentation](https://orbit.sharegate.design/?path=/docs/html-table--example)
*/
export const TH = htmlElement("html-th", "th");

/**
 * A specialized [box](https://orbit.sharegate.design/?path=/docs/box--page) component for HTML tr element.
 *
 * [Documentation](https://orbit.sharegate.design/?path=/docs/html-table--example)
*/
export const TR = htmlElement("html-tr", "tr");

/**
 * A specialized [box](https://orbit.sharegate.design/?path=/docs/box--page) component for HTML td element.
 *
 * [Documentation](https://orbit.sharegate.design/?path=/docs/html-table--example)
*/
export const TD = htmlElement("html-td", "td");

export type TableProps = ComponentProps<typeof Table>;
export type THeadProps = ComponentProps<typeof THead>;
export type TBodyProps = ComponentProps<typeof TBody>;
export type TFootProps = ComponentProps<typeof TFoot>;
export type THProps = ComponentProps<typeof TH>;
export type TRProps = ComponentProps<typeof TR>;
export type TDProps = ComponentProps<typeof TD>;

// Forms
/**
 * A specialized [box](https://orbit.sharegate.design/?path=/docs/box--page) component for HTML button element.
 *
 * [Documentation](https://orbit.sharegate.design/?path=/docs/html-button--example)
*/
export const HtmlButton = htmlElement("html-button", "button");

/**
 * A specialized [box](https://orbit.sharegate.design/?path=/docs/box--page) component for HTML form element.
*/
export const HtmlForm = htmlElement("html-form", "form");

/**
 * A specialized [box](https://orbit.sharegate.design/?path=/docs/box--page) component for HTML input element.
 *
 * [Documentation](https://orbit.sharegate.design/?path=/docs/html-input--example)
*/
export const HtmlInput = htmlElement("html-input", "input");

/**
 * A specialized [box](https://orbit.sharegate.design/?path=/docs/box--page) component for HTML label element.
*/
export const HtmlLabel = htmlElement("html-label", "label");

/**
 * A specialized [box](https://orbit.sharegate.design/?path=/docs/box--page) component for HTML textarea element.
*/
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
