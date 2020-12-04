import { any, elementType, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { omitProps } from "../../shared";

const propTypes = {
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * [Slot](?path=/docs/getting-started-slots--page) to render into.
     */
    slot: string,
    /**
     * React children.
     */
    children: any
};

export function InnerBox(props) {
    const {
        as: ElementType = "div",
        children,
        forwardedRef,
        ...rest
    } = omitProps(props, ["slot"]);

    return (
        <ElementType
            {...rest}
            ref={forwardedRef}
        >
            {children}
        </ElementType>
    );
}

InnerBox.propTypes = propTypes;

export const Box = forwardRef((props, ref) => (
    <InnerBox {...props} forwardedRef={ref} />
));

Box.displayName = "Box";


