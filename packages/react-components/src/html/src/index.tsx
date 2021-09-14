import { Box } from "../../box";
import { ElementRef, forwardRef } from "react";
import { JsxElement, StyledComponentProps, mergeProps, useStyleProps } from "../../shared";

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

// Content

export const Address = htmlElement("address", "address");

export const HtmlArticle = htmlElement("html-article", "article");

export const HtmlAside = htmlElement("html-aside", "aside");

export const HtmlBody = htmlElement("html-body", "body");

export const HtmlFooter = htmlElement("html-footer", "footer");

export const HtmlMain = htmlElement("html-main", "main");

export const HtmlNav = htmlElement("html-nav", "nav");

export const HtmlSection = htmlElement("html-section", "section");

// Text content

export const Div = htmlElement("div", "div");

export const UL = htmlElement("ul", "ul");
export const OL = htmlElement("ol", "ol");
export const LI = htmlElement("li", "li");

// Inline text semantics

export const A = htmlElement("a", "a");

export const Span = htmlElement("span", "span");

// Table content

export const Table = htmlElement("table", "table");

export const THead = htmlElement("thead", "thead");
export const TBody = htmlElement("tbody", "tbody");
export const TFoot = htmlElement("tfoot", "tfoot");

export const TH = htmlElement("th", "th");
export const TR = htmlElement("tr", "tr");
export const TD = htmlElement("td", "td");

// Forms

export const HtmlButton = htmlElement("html-button", "button");

export const HtmlInput = htmlElement("html-input", "input");

export const HtmlLabel = htmlElement("html-label", "label");

export const HtmlTextArea = htmlElement("html-textarea", "textarea");
