import { Dropdown, DropdownContext } from "../../dropdown";
import { createContentIcon } from "../../icons";
import { element, string } from "prop-types";
import { isNil } from "lodash";
import { throwWhenUnsupportedPropIsProvided } from "../../shared";
import { useContext } from "react";

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

function useRenderer({ rest }, renderedContent) {
    return () => {
        return (
            <Dropdown.Item {...rest} tabIndex="-1">
                {renderedContent}
            </Dropdown.Item>
        );
    };
}

export function DropdownMenuItem(props) {
    const { text, icon, description, content, children, ...rest } = props;

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-components/dropdown-menu/item");

    const { size } = useContext(DropdownContext);

    const renderContent = useContentRenderer({ text, icon, description, content, children }, size);
    const render = useRenderer({ rest }, renderContent());

    // Without a fragment, react-docgen doesn't work.
    return <>{render()}</>;
}

DropdownMenuItem.propTypes = propTypes;
