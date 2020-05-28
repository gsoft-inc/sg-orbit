import { DropdownContext } from "./context";
import { Dropdown as SemanticDropdown } from "semantic-ui-react";
import { SemanticRef, throwWhenUnsupportedPropIsProvided } from "../../shared";
import { createContentIcon } from "../../icons";
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

function getText(text, content, children) {
    return text || content || children;
}

function useTextRenderer({ text, content, children }) {
    return () => {
        const textValue = getText(text, content, children);

        if (!isNil(textValue)) {
            return <span className="text">{textValue}</span>;
        }
    };
}

function useDescriptionRenderer({ description }) {
    return () => {
        if (!isNil(description)) {
            return <span className="description">{description}</span>;
        }
    };
}

function useContentRenderer({ text, icon, description, content, children }, size) {
    const renderText = useTextRenderer({ text, content, children });
    const renderDescription = useDescriptionRenderer({ description });

    return () => {
        let left;

        if (!isNil(icon)) {
            left = createContentIcon(icon, size);
        }

        return <>{!isNil(left) && left}{renderText()}{renderDescription()}</>;
    };
}

function useRenderer({ forwardedRef, rest }, content) {
    return () => {
        return (
            <SemanticRef innerRef={forwardedRef}>
                <SemanticDropdown.Item {...rest} tabIndex="-1">
                    {content}
                </SemanticDropdown.Item>
            </SemanticRef>
        );
    };
}

export function InnerDropdownItem(props) {
    const { text, icon, description, content, children, forwardedRef, ...rest } = props;

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-components/DropdownItem");

    const { size } = useContext(DropdownContext);

    const renderContent = useContentRenderer({ text, icon, description, content, children }, size);
    const render = useRenderer({ forwardedRef, rest }, renderContent());

    // Without a fragment, react-docgen doesn't work.
    return <>{render()}</>;
}

InnerDropdownItem.propTypes = propTypes;

export const DropdownItem = forwardRef((props, ref) => (
    <InnerDropdownItem {...props} forwardedRef={ref} />
));

DropdownItem.name = "DropdownItem";
