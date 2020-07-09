import { DropdownContext } from "./DropdownContext";
import { EmbeddedIcon } from "../../icons";
import { any, element, elementType, oneOfType, string } from "prop-types";
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
    as: oneOfType([string, elementType]),
    /**
     * @ignore
     */
    children: any.isRequired
};

const defaultProps = {
    as: "div"
};

export function InnerDropdownTitle({ icon, as: ElementType, className, children, forwardedRef, ...rest }) {
    const { size } = useContext(DropdownContext);

    const iconMarkup = !isNil(icon) && (
        <EmbeddedIcon size={size}>{icon}</EmbeddedIcon>
    );

    return (
        <ElementType
            {...rest}
            className={mergeClasses(
                "title",
                className
            )}
            ref={forwardedRef}
        >
            {iconMarkup}
            <span className="text">{children}</span>
        </ElementType>
    );
}

InnerDropdownTitle.propTypes = propTypes;
InnerDropdownTitle.defaultProps = defaultProps;

export const DropdownTitle = forwardRef((props, ref) => (
    <InnerDropdownTitle {...props} forwardedRef={ref} />
));
