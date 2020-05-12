import { DropdownContext } from "./context";
import { Dropdown as SemanticDropdown } from "semantic-ui-react";
import { createIconForControl } from "../../icons";
import { element } from "prop-types";
import { isNil } from "lodash";
import { useContext } from "react";

const propTypes = {
    icon: element
};

function useIconRenderer({ icon, size }) {
    return () => {
        if (!isNil(icon)) {
            return createIconForControl(icon, size);
        }
    };
}

function useRenderer({ rest }, icon) {
    return () => {
        return (
            <SemanticDropdown.Item
                {...rest}
                icon={icon}
            />
        );
    };
}

export function DropdownItem(props) {
    const { icon, ...rest } = props;

    const { size } = useContext(DropdownContext);

    const renderIcon = useIconRenderer({ icon, size });
    const render = useRenderer({ rest }, renderIcon());

    // Without a fragment, react-docgen doesn't work.
    return <>{render()}</>;
}

DropdownItem.propTypes = propTypes;

export function createDropdownItem(props) {
    return <DropdownItem {...props} />;
}
