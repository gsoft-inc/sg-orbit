import { DropdownContext } from "./DropdownContext";
import { EmbeddedIcon } from "../../icons";
import { element, elementType, oneOfType, string } from "prop-types";
import { forwardRef, useContext } from "react";
import { isNil } from "lodash";
import { mergeClasses, useChainedEventCallback } from "../../shared";

const propTypes = {
    /**
     * The item text.
     */
    text: string,
    /**
     * The item value.
     */
    value: string,
    /**
     * An item can navigate to a page.
     */
    href: string,
    /**
     * A description to display with less emphasize.
     */
    description: string,
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

export function InnerDropdownItem(props) {
    const { text: legacyText, icon, description, onClick, focus, hover, as: ElementType, children, forwardedRef, ...rest } = props;

    const { size, onSelectItem } = useContext(DropdownContext);

    const handleClick = useChainedEventCallback(onClick, onSelectItem);

    const text = legacyText || children;

    const iconMarkup = !isNil(icon) && (
        <EmbeddedIcon size={size}>{icon}</EmbeddedIcon>
    );

    const textMarkup = !isNil(text) && (
        <span className="text">{text}</span>
    );

    const descriptionMarkup = !isNil(description) && (
        <span className="description">{children}</span>
    );

    const content = (
        <>
            {iconMarkup}
            {textMarkup}
            {descriptionMarkup}
        </>
    );

    return (
        <ElementType
            {...rest}
            onClick={handleClick}
            className={mergeClasses(
                "item",
                focus && "focus",
                hover && "hover"
            )}
            tabIndex="-1"
            ref={forwardedRef}
        >
            {content}
        </ElementType>
    );

}

InnerDropdownItem.propTypes = propTypes;
InnerDropdownItem.defaultProps = defaultProps;

export const DropdownItem = forwardRef((props, ref) => (
    <InnerDropdownItem {...props} forwardedRef={ref} />
));
