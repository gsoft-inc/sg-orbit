import { Dropdown, DropdownContext } from "../../dropdown";
import { any, element } from "prop-types";
import { createContentIcon } from "../../icons";
import { forwardRef, useContext } from "react";
import { isNil } from "lodash";
import { throwWhenUnsupportedPropIsProvided } from "../../shared";

const UNSUPPORTED_PROPS = ["content"];

const propTypes = {
    /**
     * [Shorthand](/?path=/docs/getting-started-shorthand-props--page) to display an [icon](/?path=/docs/components-icon--default-story) before the text.
     */
    icon: element,
    /**
     * @ignore
     */
    children: any.isRequired
};

function useTextRenderer({ children }) {
    return () => {
        return <span className="text">{children}</span>;
    };
}

function useContentRenderer({ icon, children }, size) {
    const renderText = useTextRenderer({ children });

    return () => {
        let left;

        if (!isNil(icon)) {
            left = createContentIcon(icon, size);
        }

        return <>{!isNil(left) && left}{renderText()}</>;
    };
}

function useRenderer({ forwardedRef, rest }, content) {
    return () => {
        return (
            <Dropdown.Header {...rest} ref={forwardedRef}>
                {content}
            </Dropdown.Header>
        );
    };
}

export function InnerDropdownHeader(props) {
    const { icon, children, forwardedRef, ...rest } = props;

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-components/DropdownHeader");

    const { size } = useContext(DropdownContext);

    const renderContent = useContentRenderer({ icon, children }, size);
    const render = useRenderer({ rest, forwardedRef }, renderContent());

    // Without a fragment, react-docgen doesn't work.
    return <>{render()}</>;
}

InnerDropdownHeader.propTypes = propTypes;

export const DropdownHeader = forwardRef((props, ref) => (
    <InnerDropdownHeader {...props} forwardedRef={ref} />
));
