import { ChevronIcon, EmbeddedIcon } from "../../icons";
import { DropdownContext } from "./DropdownContext";
import { bool, element, elementType, oneOfType, string } from "prop-types";
import { forwardRef, useContext } from "react";
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
    const { upward } = useContext(DropdownContext);

    const iconMarkup = !isNil(icon) && <EmbeddedIcon icon={icon} size={size} />;

    return (
        <Element
            {...rest}
            className={mergeClasses(
                "o-ui dropdown-title-trigger",
                fluid && "fluid",
                active && "active",
                focus && "focus",
                hover && "hover",
                getSizeClass(size),
                className
            )}
            ref={forwardedRef}
        >
            {iconMarkup}
            <span className="text">{title}</span>
            <EmbeddedIcon
                icon={
                    <ChevronIcon
                        className={mergeClasses(
                            "arrow",
                            upward && "upward"
                        )}
                    />
                }
                size={size}
            />
        </Element>
    );
}

InnerDropdownTitleTrigger.propTypes = propTypes;
InnerDropdownTitleTrigger.defaultProps = defaultProps;

export const DropdownTitleTrigger = forwardRef((props, ref) => (
    <InnerDropdownTitleTrigger {...props} forwardedRef={ref} />
));
