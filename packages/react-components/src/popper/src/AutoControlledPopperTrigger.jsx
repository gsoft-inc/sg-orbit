import { AutoControlledPopperContext } from "./AutoControlledPopperContext";
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

export function InnerAutoControlledPopperTrigger({ onClick, onKeyDown, active, focus, hover, as: ElementType, children, forwardedRef, ...rest }) {
    const { fluid, setTriggerElement, onTriggerClick, onTriggerKeyDown } = useContext(AutoControlledPopperContext);

    const triggerRef = useMergedRefs(setTriggerElement, forwardedRef);

    const handleClick = useChainedEventCallback(onTriggerClick, onClick);
    const handleKeyDown = useChainedEventCallback(onTriggerKeyDown, onKeyDown);

    return (
        <ElementType
            {...rest}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            fluid={fluid}
            active={active}
            focus={focus}
            hover={hover}
            ref={triggerRef}
        >
            {children}
        </ElementType>
    );
}

InnerAutoControlledPopperTrigger.propTypes = propTypes;
InnerAutoControlledPopperTrigger.defaultProps = defaultProps;

export const AutoControlledPopperTrigger = forwardRef((props, ref) => (
    <InnerAutoControlledPopperTrigger {...props} forwardedRef={ref} />
));
