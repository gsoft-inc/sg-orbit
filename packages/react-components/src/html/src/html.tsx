import "./html.css";
import { htmlElement } from "./htmlElement";

// Sectioning & Content sectioning

export const Address = htmlElement("html-address", "address", "o-ui-html-address");

export const Article = htmlElement("html-article", "article", "o-ui-html-article");

export const Aside = htmlElement("html-aside", "aside", "o-ui-html-aside");

export const HtmlFooter = htmlElement("html-html-footer", "footer", "o-ui-html-footer");

export const HtmlHeader = htmlElement("html-html-header", "header", "o-ui-html-header");

export const Main = htmlElement("html-main", "main", "o-ui-html-main");

export const Nav = htmlElement("html-nav", "nav", "o-ui-html-nav");

export const HtmlSection = htmlElement("html-section", "section", "o-ui-html-section");

// Text content

export const Div = htmlElement("html-div", "div", "o-ui-html-div");

export const P = htmlElement("html-p", "p", "o-ui-html-p");

export const OL = htmlElement("html-ol", "ol", "o-ui-html-ol");
export const UL = htmlElement("html-ul", "ul", "o-ui-html-ul");
export const LI = htmlElement("html-li", "li", "o-ui-html-li");

// Inline text semantics

export const A = htmlElement("html-a", "a", "o-ui-html-a");

export const Span = htmlElement("html-span", "span", "o-ui-html-span");

// Image and multimedia

export const Img = htmlElement("html-img", "img", "o-ui-html-img");

// Table content

export const Table = htmlElement("html-table", "table", "o-ui-html-table");

export const THead = htmlElement("html-thead", "thead", "o-ui-html-thead");
export const TBody = htmlElement("html-tbody", "tbody", "o-ui-html-tbody");
export const TFoot = htmlElement("html-tfoot", "tfoot", "o-ui-html-tfoot");

export const TH = htmlElement("html-th", "th", "o-ui-html-th");
export const TR = htmlElement("html-tr", "tr", "o-ui-html-tr");
export const TD = htmlElement("html-td", "td", "o-ui-html-td");

// Forms

export const HtmlButton = htmlElement("html-button", "button", "o-ui-html-button");

export const HtmlForm = htmlElement("html-form", "form", "o-ui-html-form");

export const HtmlInput = htmlElement("html-input", "input", "o-ui-html-input");

export const HtmlLabel = htmlElement("html-label", "label", "o-ui-html-label");

export const HtmlTextArea = htmlElement("html-textarea", "textarea", "o-ui-html-textarea");

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
