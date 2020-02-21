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
    const { icon, children, ...rest } = props;
    const context = useContext(DropdownContext);

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-dropdown/item");

    const renderIcon = () => {
        if (!isNil(icon)) {
            return createIconForControl(icon, context.size);
        }
    };

    return (
        <Dropdown.Item icon={renderIcon()} {...rest}>
            {children}
        </Dropdown.Item>
    );
}

DropdownItem.propTypes = propTypes;

DropdownItem.create = ({ content, ...rest }) => {
    return (
        <DropdownItem {...rest}>
            {content}
        </DropdownItem>
    );
};
