import { ArrowIcon } from "../../icons";
import { bool, elementType, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { mergeClasses } from "../../shared";

const propTypes = {
    title: string,
    upward: bool,
    size: string,
    as: oneOfType([string, elementType]),
    fluid: bool,
    active: bool,
    focus: bool,
    hover: bool
};

const defaultProps = {
    as: "button"
};

export function InnerDropdownTitleTrigger({
    title,
    icon,
    // eslint-disable-next-line no-unused-vars
    open,
    upward,
    size,
    as: Element,
    fluid,
    active,
    focus,
    hover,
    className,
    forwardedRef,
    ...rest
}) {
    delete rest["open"];

    const classes = mergeClasses(
        "title-trigger",
        fluid && "fluid",
        active && "active",
        focus && "focus",
        hover && "hover",
        className
    );

    return (
        <Element
            {...rest}
            className={classes}
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

DropdownTitleTrigger.name = "DrodownTrigger";
