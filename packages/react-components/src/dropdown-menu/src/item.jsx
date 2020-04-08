import { Dropdown, DropdownContext } from "../../dropdown";
import { bool, element, string } from "prop-types";
import { createIconForControl } from "../../icons";
import { isNil } from "lodash";
import { throwWhenUnsupportedPropIsProvided } from "../../shared";
import { useContext } from "react";

// TODO:
// - Support href ??? with external links?

const UNSUPPORTED_PROPS = ["content", "flag", "image", "label"];

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
     * A description to display with less emphasize.
     */
    description: string,
    /**
     * An item can display an icon before his text.
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

export function DropdownMenuItem(props) {
    const { text, icon, description, ...rest } = props;
    const context = useContext(DropdownContext);

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-components/dropdown-menu/item");

    const renderText = () => {
        if (!isNil(text)) {
            return <span className="text">{text}</span>;
        }
    };

    const renderDescription = () => {
        if (!isNil(description)) {
            return <span className="description">{description}</span>;
        }
    };

    const renderContent = () => {
        let left;

        if (!isNil(icon)) {
            left = createIconForControl(icon, context.size);
        }

        return <>{!isNil(left) && left}{renderText()}{renderDescription()}</>;
    };

    return (
        <Dropdown.Item {...rest}>
            {renderContent()}
        </Dropdown.Item>
    );
}

DropdownMenuItem.propTypes = propTypes;
DropdownMenuItem.defaultProps = defaultProps;
