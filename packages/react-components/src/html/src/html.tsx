import { Box } from "../../box";
import { ElementRef, forwardRef } from "react";
import { JsxElement, StyledComponentProps, mergeProps, useStyleProps } from "../../shared";

import "./html.css";

function htmlElement<T extends JsxElement<any>>(name: string, elementType: T, className?: string) {
    return forwardRef<ElementRef<T>, StyledComponentProps<T>>((props, ref) => {
        const [styleProps] = useStyleProps<StyledComponentProps<T>>(name);

        return (
            <Box
                {...mergeProps(
                    props,
                    {
                        as: elementType,
                        className,
                        ref
                    },
                    styleProps
                )}
            />
        );
    });
}

// Sectioning & Content sectioning

export const Address = htmlElement("address", "address", "o-ui-html-address");

export const Article = htmlElement("article", "article", "o-ui-html-article");

export const Aside = htmlElement("aside", "aside", "o-ui-html-aside");

export const Body = htmlElement("body", "body");

export const HtmlFooter = htmlElement("html-footer", "footer", "o-ui-html-footer");

export const HtmlHeader = htmlElement("html-header", "header", "o-ui-html-header");

export const Main = htmlElement("main", "main", "o-ui-html-main");

export const Nav = htmlElement("nav", "nav", "o-ui-html-nav");

export const Section = htmlElement("section", "section", "o-ui-html-section");

// Text content

export const Div = htmlElement("div", "div", "o-ui-html-div");

export const UL = htmlElement("ul", "ul", "o-ui-html-ul");
export const OL = htmlElement("ol", "ol", "o-ui-html-ol");
export const LI = htmlElement("li", "li", "o-ui-html-li");

// Inline text semantics

export const A = htmlElement("a", "a", "o-ui-html-a");

export const Span = htmlElement("span", "span", "o-ui-html-span");

// Table content

export const Table = htmlElement("table", "table", "o-ui-html-table");

export const THead = htmlElement("thead", "thead", "o-ui-html-thead");
export const TBody = htmlElement("tbody", "tbody", "o-ui-html-tbody");
export const TFoot = htmlElement("tfoot", "tfoot", "o-ui-html-tfoot");

export const TH = htmlElement("th", "th", "o-ui-html-th");
export const TR = htmlElement("tr", "tr", "o-ui-html-tr");
export const TD = htmlElement("td", "td", "o-ui-html-td");

// Forms

export const HtmlButton = htmlElement("html-button", "button", "o-ui-html-button");

export const HtmlInput = htmlElement("html-input", "input", "o-ui-html-input");

export const HtmlLabel = htmlElement("html-label", "label", "o-ui-html-label");

export const HtmlTextArea = htmlElement("html-textarea", "textarea", "o-ui-html-textarea");
