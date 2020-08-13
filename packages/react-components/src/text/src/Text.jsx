import { SIZE, createSizeAdapterSlotFactory, getSizeClass, mergeClasses, useSlotProps } from "../../shared";
import { any, elementType, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";

const propTypes = {
    size: oneOf(["mini", "tiny", "small", "large"]),
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
                "o-ui text",
                getSizeClass(size),
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

export const textSlot = createSizeAdapterSlotFactory({
    [SIZE.small]: SIZE.mini,
    [SIZE.medium]: SIZE.tiny,
    [SIZE.large]: SIZE.small
});
