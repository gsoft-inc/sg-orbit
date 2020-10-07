import { ContentStyleProvider, cssModule, getSizeClass, mergeClasses, useTextContent } from "../../shared";
import { Text } from "../../text";
import { any, elementType, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";

const propTypes = {
    /**
     * A list item can vary in size.
     */
    size: oneOf(["sm", "md", "lg", "inherit"]),
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * @ignore
     */
    children: any.isRequired
};

export function InnerListItem({
    size,
    as: ElementType = "li",
    className,
    children,
    forwardedRef,
    ...rest
}) {
    const content = useTextContent(Text, children);

    return (
        <ElementType
            {...rest}
            className={mergeClasses(
                cssModule(
                    "o-ui-list-item",
                    getSizeClass(size)
                ),
                className
            )}
            ref={forwardedRef}
        >
            <ContentStyleProvider defaults={["text", "icon"]}>
                {content}
            </ContentStyleProvider>
        </ElementType>
    );
}

InnerListItem.propTypes = propTypes;

export const ListItem = forwardRef((props, ref) => (
    <InnerListItem {...props} forwardedRef={ref} />
));
