export function useTextContent(ElementType, children) {
    return typeof children === "string"
        ? <ElementType>{children}</ElementType>
        : children;
}
