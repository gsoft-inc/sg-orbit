import { DropdownContext } from "./context";
import { Dropdown as SemanticDropdown } from "semantic-ui-react";
import { createIconForControl } from "../../icons";
import { element } from "prop-types";
import { isNil } from "lodash";
import { useContext } from "react";

const propTypes = {
    icon: element
};

function useIconRenderer(icon, size) {
    return () => {
        if (!isNil(icon)) {
            return createIconForControl(icon, size);
        }
    };
}

export function DropdownItem(props) {
    const { icon, ...rest } = props;
    const { size } = useContext(DropdownContext);

    const iconRenderer = useIconRenderer(icon, size);

    return (
        <SemanticDropdown.Item
            {...rest}
            icon={iconRenderer()}
        />
    );
}

DropdownItem.propTypes = propTypes;

export function createDropdownItem(props) {
    return <DropdownItem {...props} />;
}
