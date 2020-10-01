const ACCEPTED_HTML_ELEMENTS = [
    "br",
    "b",
    "i",
    "strong",
    "big",
    "em",
    "code",
    "sub",
    "sup",
    "del",
    "pre",
    "samp",
    "a",
    "span"
];

export function useTextContent(ElementType, children) {
    let canWrap = false;

    if (typeof children === "string") {
        canWrap = true;
    }

    if (Array.isArray(children)) {
        canWrap = children.every(x => {
            return typeof x === "string" || ACCEPTED_HTML_ELEMENTS.includes(x.type);
        });
    }

    return canWrap
        ? <ElementType>{children}</ElementType>
        : children;
}
