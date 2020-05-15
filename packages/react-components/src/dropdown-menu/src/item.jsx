import { Dropdown, DropdownContext } from "../../dropdown";
import { bool, element, string } from "prop-types";
import { createContentIcon } from "../../icons";
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
    icon: element,
    /**
     * A disabled item cannot be selected.
     */
    disabled: bool
};

const defaultProps = {
    disabled: false
};

function useTextRenderer({ text, content, children }) {
    return () => {
        const value = text || content || children;

        if (!isNil(value)) {
            return <span className="text">{value}</span>;
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

function useRenderer({ rest }, content) {
    return () => {
        return (
            <Dropdown.Item {...rest}>
                {content}
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
DropdownMenuItem.defaultProps = defaultProps;
