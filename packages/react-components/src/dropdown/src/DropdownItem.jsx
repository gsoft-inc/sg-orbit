import { DropdownContext } from "./DropdownContext";
import { DropdownMenuContext } from "./DropdownMenuContext";
import { EmbeddedIcon } from "../../icons";
import { Dropdown as SemanticDropdown } from "semantic-ui-react";
import { SemanticRef, mergeClasses, throwWhenUnsupportedPropIsProvided, useChainedEventCallback } from "../../shared";
import { element, string } from "prop-types";
import { forwardRef, useContext } from "react";
import { isNil } from "lodash";

const UNSUPPORTED_PROPS = ["flag", "image", "label"];

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
    icon: element
};

export function InnerDropdownItem(props) {
    const { text: legacyText, icon, description, onClick, focus, hover, children, forwardedRef, ...rest } = props;
    const { size } = useContext(DropdownContext);
    const { onItemClick } = useContext(DropdownMenuContext);

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-components/DropdownItem");

    const handleClick = useChainedEventCallback(onClick, onItemClick);

    const text = legacyText || children;

    const iconMarkup = !isNil(icon) && (
        <EmbeddedIcon icon={icon} size={size} />
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
        <SemanticRef innerRef={forwardedRef}>
            <SemanticDropdown.Item
                {...rest}
                onClick={handleClick}
                className={mergeClasses(
                    focus && "focus",
                    hover && "hover"
                )}
                tabIndex="-1"
            >
                {content}
            </SemanticDropdown.Item>
        </SemanticRef>
    );
}

InnerDropdownItem.propTypes = propTypes;

export const DropdownItem = forwardRef((props, ref) => (
    <InnerDropdownItem {...props} forwardedRef={ref} />
));
