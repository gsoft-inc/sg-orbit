import "./Text.css";

import { SIZE, createSizeAdapterSlotFactory, getSizeClass, mergeClasses, useSlotProps } from "../../shared";
import { any, elementType, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";

export const EMBED_SIZE = {
    [SIZE.small]: SIZE.tiny,
    [SIZE.medium]: SIZE.small,
    [SIZE.large]: SIZE.medium
};

const propTypes = {
    /**
     * A text can vary in size.
     */
    size: oneOf(["mini", "tiny", "small", "medium", "large"]),
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * @ignore
     */
    children: any.isRequired
};

const defaultProps = {
    as: "span"
};

export function InnerText(props) {
    const {
        size,
        as: ElementType,
        className,
        children,
        forwardedRef,
        ...rest
    } = useSlotProps(props, "text");

    return (
        <ElementType
            data-testid="text"
            {...rest}
            className={mergeClasses(
                getSizeClass(size, "o-ui-text--"),
                className
            )}
            ref={forwardedRef}
        >
            {children}
        </ElementType>
    );
}

InnerText.propTypes = propTypes;
InnerText.defaultProps = defaultProps;

export const Text = forwardRef((props, ref) => (
    <InnerText {...props} forwardedRef={ref} />
));

export const textSlot = createSizeAdapterSlotFactory(EMBED_SIZE);
