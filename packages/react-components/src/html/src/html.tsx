import { htmlElement } from "./htmlElement";

// Sectioning & Content sectioning

export const Address = htmlElement("html-address", "address");

export const Article = htmlElement("html-article", "article");

export const Aside = htmlElement("html-aside", "aside");

export const HtmlFooter = htmlElement("html-html-footer", "footer");

export const HtmlHeader = htmlElement("html-html-header", "header");

export const Main = htmlElement("html-main", "main");

export const Nav = htmlElement("html-nav", "nav");

export const HtmlSection = htmlElement("html-section", "section");

// Text content

export const Div = htmlElement("html-div", "div");

export const P = htmlElement("html-p", "p");

export const OL = htmlElement("html-ol", "ol");
export const UL = htmlElement("html-ul", "ul");
export const LI = htmlElement("html-li", "li");

// Inline text semantics

export const A = htmlElement("html-a", "a");

export const Span = htmlElement("html-span", "span");

// Image and multimedia

export const Img = htmlElement("html-img", "img");

// Table content

export const Table = htmlElement("html-table", "table");

export const THead = htmlElement("html-thead", "thead");
export const TBody = htmlElement("html-tbody", "tbody");
export const TFoot = htmlElement("html-tfoot", "tfoot");

export const TH = htmlElement("html-th", "th");
export const TR = htmlElement("html-tr", "tr");
export const TD = htmlElement("html-td", "td");

// Forms

export const HtmlButton = htmlElement("html-button", "button");

export const HtmlForm = htmlElement("html-form", "form");

export const HtmlInput = htmlElement("html-input", "input");

export const HtmlLabel = htmlElement("html-label", "label");

export const HtmlTextArea = htmlElement("html-textarea", "textarea");

///////////

export const HtmlElements = {
    "a": A,
    "address": Address,
    "article": Article,
    "button": HtmlButton,
    "div": Div,
    "footer": HtmlFooter,
    "form": HtmlForm,
    "header": HtmlHeader,
    "img": Img,
    "input": HtmlInput,
    "label": HtmlLabel,
    "li": LI,
    "main": Main,
    "nav": Nav,
    "ol": OL,
    "p": P,
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
