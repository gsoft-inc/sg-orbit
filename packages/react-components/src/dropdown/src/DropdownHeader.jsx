import { DropdownContext } from "./DropdownContext";
import { EmbeddedIcon } from "../../icons";
import { element, elementType, oneOfType, string } from "prop-types";
import { forwardRef, useContext } from "react";
import { isNil } from "lodash";
import { mergeClasses } from "../../shared";

const propTypes = {
    /**
     * [Icon](/?path=/docs/components-icon--default-story) component rendered before the text.
     */
    icon: element,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType])
};

const defaultProps = {
    as: "div"
};

export function InnerDropdownHeader({ icon, as: ElementType, className, children, forwardedRef, ...rest }) {
    const { size } = useContext(DropdownContext);

    const iconMarkup = !isNil(icon) && (
        <EmbeddedIcon size={size}>{icon}</EmbeddedIcon>
    );

    return (
        <ElementType
            {...rest}
            className={mergeClasses(
                "header",
                className
            )}
            ref={forwardedRef}
        >
            {iconMarkup}
            <span className="text">{children}</span>
        </ElementType>
    );
}

InnerDropdownHeader.propTypes = propTypes;
InnerDropdownHeader.defaultProps = defaultProps;

export const DropdownHeader = forwardRef((props, ref) => (
    <InnerDropdownHeader {...props} forwardedRef={ref} />
));
