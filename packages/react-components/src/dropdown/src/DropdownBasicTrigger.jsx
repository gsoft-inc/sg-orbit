import { DropdownCarret } from "./DropdownCarret";
import { DropdownTrigger } from "./DropdownTrigger";
import { EmbeddedIcon } from "../../icons";
import { any, element, elementType, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { isNil } from "lodash";
import { mergeClasses, normalizeSize } from "../../shared";

const propTypes = {
    /**
     * [Icon](/?path=/docs/components-icon--default-story) component rendered before the text.
     */
    icon: element,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * @ignore
     */
    children: any.isRequired
};

const defaultProps = {
    as: "button"
};

export function InnerDropdownBasicTrigger({ icon, as: ElementType, forwardedRef, ...rest }) {
    return (
        <DropdownTrigger
            {...rest}
            as={forwardRef(({ fluid, size, active, focus, hover, className, children, ...asProps }, ref) => {
                const iconMarkup = !isNil(icon) && (
                    <EmbeddedIcon size={size}>{icon}</EmbeddedIcon>
                );

                return (
                    <ElementType
                        {...asProps}
                        className={mergeClasses(
                            "title-trigger",
                            fluid && "fluid",
                            active && "active",
                            focus && "focus",
                            hover && "hover",
                            iconMarkup && "with-icon",
                            normalizeSize(size),
                            className
                        )}
                        ref={ref}
                    >
                        {iconMarkup}
                        <span className="text">{children}</span>
                        <DropdownCarret />
                    </ElementType>
                );
            })}
            ref={forwardedRef}
        />
    );
}

InnerDropdownBasicTrigger.propTypes = propTypes;
InnerDropdownBasicTrigger.defaultProps = defaultProps;

export const DropdownBasicTrigger = forwardRef((props, ref) => (
    <InnerDropdownBasicTrigger {...props} forwardedRef={ref} />
));
