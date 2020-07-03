import { DropdownCarret } from "./DropdownCarret";
import { EmbeddedIcon } from "../../icons";
import { bool, element, elementType, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { getSizeClass, mergeClasses } from "../../shared";
import { isNil } from "lodash";

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
    const iconMarkup = !isNil(icon) && (
        <EmbeddedIcon size={size}>{icon}</EmbeddedIcon>
    );

    return (
        <Element
            {...rest}
            className={mergeClasses(
                "o-ui dropdown-title-trigger",
                fluid && "fluid",
                active && "active",
                focus && "focus",
                hover && "hover",
                iconMarkup && "with-icon",
                getSizeClass(size),
                className
            )}
            ref={forwardedRef}
        >
            {iconMarkup}
            <span className="text">{title}</span>
            <DropdownCarret />
        </Element>
    );
}

InnerDropdownTitleTrigger.propTypes = propTypes;
InnerDropdownTitleTrigger.defaultProps = defaultProps;

export const DropdownTitleTrigger = forwardRef((props, ref) => (
    <InnerDropdownTitleTrigger {...props} forwardedRef={ref} />
));
