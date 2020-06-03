import { DropdownContext } from "./DropdownContext";
import { DropdownMenuContext } from "./DropdownMenuContext";
import { EmbeddedIcon } from "../../icons";
import { Dropdown as SemanticDropdown } from "semantic-ui-react";
import { SemanticRef, mergeClasses, throwWhenUnsupportedPropIsProvided, useEventCallback } from "../../shared";
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
     * [Shorthand](/?path=/docs/getting-started-shorthand-props--page) to display an [icon](/?path=/docs/components-icon--default-story) before the text.
     */
    icon: element
};

function Text({ children }) {
    return <span className="text">{children}</span>;
}

function Description({ children }) {
    return <span className="description">{children}</span>;
}

function Content({ text: legacyText, icon, description, children }) {
    const { size } = useContext(DropdownContext);

    let left;

    if (!isNil(icon)) {
        left = <EmbeddedIcon icon={icon} size={size} />;
    }

    const text = legacyText || children;

    return (
        <>
            {!isNil(left) && left}
            {!isNil(text) && <Text>{text}</Text>}
            {!isNil(description) && <Description>{description}</Description>}
        </>
    );
}

export function InnerDropdownItem(props) {
    const { text, icon, description, onClick, focus, hover, children, forwardedRef, ...rest } = props;
    const { onItemClick } = useContext(DropdownMenuContext);

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-components/DropdownItem");

    const handleClick = useEventCallback(event => {
        onItemClick(event);

        if (!isNil(onClick)) {
            onClick(event);
        }
    });

    return (
        <SemanticRef innerRef={forwardedRef}>
            <SemanticDropdown.Item
                {...rest}
                className={mergeClasses(
                    focus && "focus",
                    hover && "hover"
                )}
                onClick={handleClick}
                tabIndex="-1"
            >
                <Content text={text} icon={icon} description={description}>
                    {children}
                </Content>
            </SemanticDropdown.Item>
        </SemanticRef>
    );
}

InnerDropdownItem.propTypes = propTypes;

export const DropdownItem = forwardRef((props, ref) => (
    <InnerDropdownItem {...props} forwardedRef={ref} />
));

DropdownItem.name = "DropdownItem";
