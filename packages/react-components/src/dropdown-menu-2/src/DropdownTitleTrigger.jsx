import { ArrowIcon } from "../../icons";
import { DropdownContext } from "./DropdownContext";
import { elementType, oneOfType, string } from "prop-types";
import { forwardRef, useContext } from "react";
import { mergeClasses } from "../../shared";

const propTypes = {
    as: oneOfType([string, elementType])
};

const defaultProps = {
    as: "button"
};

export function InnerDropdownTitleTrigger({
    as: Element,
    className,
    forwardedRef,
    ...rest
}) {
    const {
        icon,
        title,
        upward,
        size,
        fluid,
        active,
        focus,
        hover
    } = useContext(DropdownContext);

    return (
        <Element
            {...rest}
            className={mergeClasses(
                "o-ui title-trigger",
                fluid && "fluid",
                active && "active",
                focus && "focus",
                hover && "hover",
                className
            )}
            ref={forwardedRef}
        >
            {icon}
            {title}
            <ArrowIcon className={upward ? "rotate-270" : "rotate-90"} />
        </Element>
    );
}

InnerDropdownTitleTrigger.propTypes = propTypes;
InnerDropdownTitleTrigger.defaultProps = defaultProps;

export const DropdownTitleTrigger = forwardRef((props, ref) => (
    <InnerDropdownTitleTrigger {...props} forwardedRef={ref} />
));
