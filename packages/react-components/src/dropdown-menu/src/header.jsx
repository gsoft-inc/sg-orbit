import { Children } from "react";
import { Dropdown, DropdownContext } from "../../dropdown";
import { createContentIcon } from "../../icons";
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

function useTextRenderer({ text }) {
    return () => {
        if (!isNil(text)) {
            return <span className="text">{text}</span>;
        }
    };
}

function useContentRenderer({ text, icon, children }, size) {
    const renderText = useTextRenderer({ text });

    return () => {
        const hasChildren = Children.count(children) > 0;

        if (hasChildren) {
            return children;
        }

        let left;

        if (!isNil(icon)) {
            left = createContentIcon(icon, size);
        }

        return <>{!isNil(left) && left}{renderText()}</>;
    };
}

function useRenderer({ rest }, content) {
    return () => {
        return (
            <Dropdown.Header {...rest}>
                {content}
            </Dropdown.Header>
        );
    };
}

export function DropdownMenuHeader(props) {
    const { text, icon, children, ...rest } = props;

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-components/dropdown-menu/header");

    const { size } = useContext(DropdownContext);

    const renderContent = useContentRenderer({ text, icon, children }, size);
    const render = useRenderer({ rest }, renderContent());

    return render();
}

DropdownMenuHeader.propTypes = propTypes;
