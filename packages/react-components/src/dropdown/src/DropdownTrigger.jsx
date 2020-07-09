import { DropdownContext } from "./DropdownContext";
import { elementType, oneOfType, string } from "prop-types";
import { forwardRef, useContext } from "react";
import { useChainedEventCallback, useMergedRefs } from "../../shared";

const propTypes = {
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType])
};

const defaultProps = {
    as: "button"
};

export function InnerDropdownTrigger({ onClick, onKeyDown, active, focus, hover, as: ElementType, children, forwardedRef, ...rest }) {
    const { fluid, size, triggerRef, onTriggerClick, onTriggerKeyDown } = useContext(DropdownContext);

    const ref = useMergedRefs(triggerRef, forwardedRef);

    const handleClick = useChainedEventCallback(onTriggerClick, onClick);
    const handleKeyDown = useChainedEventCallback(onTriggerKeyDown, onKeyDown);

    return (
        <ElementType
            {...rest}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            size={size}
            fluid={fluid}
            active={active}
            focus={focus}
            hover={hover}
            ref={ref}
        >
            {children}
        </ElementType>
    );
}

InnerDropdownTrigger.propTypes = propTypes;
InnerDropdownTrigger.defaultProps = defaultProps;

export const DropdownTrigger = forwardRef((props, ref) => (
    <InnerDropdownTrigger {...props} forwardedRef={ref} />
));
