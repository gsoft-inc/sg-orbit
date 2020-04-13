import { Children } from "react";
import { Dropdown, DropdownContext } from "../../dropdown";
import { createIconForControl } from "../../icons";
import { element } from "prop-types";
import { isNil } from "lodash";
import { throwWhenUnsupportedPropIsProvided } from "../../shared";
import { useContext } from "react";

const UNSUPPORTED_PROPS = ["content"];

const propTypes = {
    /**
     * An item can display an icon after his text.
     */
    icon: element
};

export function DropdownMenuHeader(props) {
    const { text, icon, children, ...rest } = props;
    const context = useContext(DropdownContext);

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-components/dropdown-menu/header");

    const renderText = () => {
        if (!isNil(text)) {
            return <span className="text">{text}</span>;
        }
    };

    const renderContent = () => {
        const hasChildren = Children.count(children) > 0;

        if (hasChildren) {
            return children;
        }

        let left;

        if (!isNil(icon)) {
            left = createIconForControl(icon, context.size);
        }

        return <>{!isNil(left) && left}{renderText()}</>;
    };

    return (
        <Dropdown.Header {...rest}>
            {renderContent()}
        </Dropdown.Header>
    );
}

DropdownMenuHeader.propTypes = propTypes;
