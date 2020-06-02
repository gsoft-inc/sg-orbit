import { ArrowIcon } from "../../icons";
import { DropdownContext } from "./DropdownContext";
import { SIZE, mergeClasses } from "../../shared";
import { bool, element, elementType, oneOfType, string } from "prop-types";
import { forwardRef, useContext } from "react";

const SIZE_CSS_CLASS = {
    [SIZE.small]: "small",
    [SIZE.large]: "large"
};

const propTypes = {
    icon: element,
    title: string,
    fluid: bool,
    as: oneOfType([string, elementType])
};

const defaultProps = {
    as: "button"
};

export function InnerDropdownTitleTrigger({
    title,
    icon,
    fluid,
    size,
    active,
    focus,
    hover,
    as: Element,
    className,
    forwardedRef,
    ...rest
}) {
    const { upward } = useContext(DropdownContext);

    return (
        <Element
            {...rest}
            className={mergeClasses(
                "o-ui title-trigger",
                size && SIZE_CSS_CLASS[size],
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
