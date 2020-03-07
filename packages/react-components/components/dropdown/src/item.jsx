import { DropdownContext } from "./context";
import { Dropdown as SemanticDropdown } from "semantic-ui-react";
import { createIconForControl } from "@orbit-ui/react-icons";
import { element } from "prop-types";
import { isNil } from "lodash";
import { useContext } from "react";

const propTypes = {
    icon: element
};

export function DropdownItem(props) {
    const { icon, ...rest } = props;
    const context = useContext(DropdownContext);

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
