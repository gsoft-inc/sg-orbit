import { DropdownContext } from "./context";
import { Dropdown as SemanticDropdown } from "semantic-ui-react";
import { createIconForControl } from "@orbit-ui/react-icons";
import { element } from "prop-types";
import { isNil } from "lodash";
import { throwWhenUnsupportedPropIsProvided } from "@orbit-ui/react-components-shared";
import { useContext } from "react";

const UNSUPPORTED_PROPS = ["flag", "label"];

const propTypes = {
    icon: element
};

export function DropdownItem(props) {
    const { icon, ...rest } = props;
    const context = useContext(DropdownContext);

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-dropdown/item");

    const renderIcon = () => {
        if (!isNil(icon)) {
            return createIconForControl(icon, context.size);
        }
    };

    return (
        <SemanticDropdown.Item
            icon={renderIcon()}
            {...rest}
        />
    );
}

DropdownItem.propTypes = propTypes;

export function createDropdownItem(props) {
    return <DropdownItem {...props} />;
}
