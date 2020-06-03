import { ArrowIcon, EmbeddedIcon } from "../../icons";
import { DropdownContext } from "./DropdownContext";
import { SIZE, mergeClasses } from "../../shared";
import { bool, element, elementType, oneOfType, string } from "prop-types";
import { forwardRef, useContext } from "react";
import { isNil } from "lodash";

const SIZE_CLASS = {
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

function Text({ children }) {
    return <span className="text">{children}</span>;
}

function Arrow({ upward, size }) {
    const icon = (
        <ArrowIcon
            className={mergeClasses(
                "arrow",
                upward && "upward"
            )}
        />
    );

    return <EmbeddedIcon icon={icon} size={size} />;
}

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
                "o-ui dropdown-title-trigger",
                size && SIZE_CLASS[size],
                fluid && "fluid",
                active && "active",
                focus && "focus",
                hover && "hover",
                className
            )}
            ref={forwardedRef}
        >
            {!isNil(icon) && <EmbeddedIcon icon={icon} size={size} />}
            <Text>{title}</Text>
            <Arrow upward={upward} size={size} />
        </Element>
    );
}

InnerDropdownTitleTrigger.propTypes = propTypes;
InnerDropdownTitleTrigger.defaultProps = defaultProps;

export const DropdownTitleTrigger = forwardRef((props, ref) => (
    <InnerDropdownTitleTrigger {...props} forwardedRef={ref} />
));
