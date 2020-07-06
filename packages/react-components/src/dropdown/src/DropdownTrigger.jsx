import { DropdownContext } from "./DropdownContext";
import { augmentElementProps, useMergedRefs } from "../../shared";
import { elementType, oneOfType, string } from "prop-types";
import { forwardRef, useContext } from "react";

const propTypes = {
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType])
};

const defaultProps = {
    as: "button"
};

export function InnerDropdownTrigger({ active, focus, hover, as: ElementType, children, forwardedRef, ...rest }) {
    const { fluid, size, setTriggerElement, onTriggerClick, onTriggerKeyDown } = useContext(DropdownContext);

    const triggerRef = useMergedRefs(setTriggerElement, forwardedRef);

    const augmentedProps = augmentElementProps(rest, {
        onClick: onTriggerClick,
        onKeyDown: onTriggerKeyDown,
        size,
        fluid,
        active,
        focus,
        hover,
        ref: triggerRef
    });

    return (
        <ElementType {...augmentedProps}>
            {children}
        </ElementType>
    );
}

InnerDropdownTrigger.propTypes = propTypes;
InnerDropdownTrigger.defaultProps = defaultProps;

export const DropdownTrigger = forwardRef((props, ref) => (
    <InnerDropdownTrigger {...props} forwardedRef={ref} />
));
