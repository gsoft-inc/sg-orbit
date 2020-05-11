import { DropdownContext } from "./context";
import { Dropdown as SemanticDropdown } from "semantic-ui-react";
import { createContentIcon } from "../../icons";
import { element } from "prop-types";
import { isNil } from "lodash";
import { useContext } from "react";

const propTypes = {
    icon: element
};

function useIconRenderer({ icon, size }) {
    return () => {
        if (!isNil(icon)) {
            return createContentIcon(icon, size);
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

    return render();
}

DropdownItem.propTypes = propTypes;

export function createDropdownItem(props) {
    return <DropdownItem {...props} />;
}
