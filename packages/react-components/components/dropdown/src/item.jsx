import { Dropdown } from "semantic-ui-react";
import { DropdownContext } from "./context";
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
        <Dropdown.Item icon={renderIcon()} {...rest} />
    );
}

DropdownItem.text = "Hey text";
DropdownItem.value = "Hey value";

DropdownItem.propTypes = propTypes;

DropdownItem.create = props => {
    return <DropdownItem {...props} />;
};
