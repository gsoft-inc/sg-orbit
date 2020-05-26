import { Children } from "react";
import { Dropdown, DropdownContext } from "../../dropdown";
import { createContentIcon } from "../../icons";
import { element } from "prop-types";
import { forwardRef, useContext } from "react";
import { isNil } from "lodash";
import { throwWhenUnsupportedPropIsProvided } from "../../shared";

const UNSUPPORTED_PROPS = ["content"];

const propTypes = {
    /**
     * [Shorthand](/?path=/docs/getting-started-shorthand-props--page) to display an [icon](/?path=/docs/components-icon--default-story) before the text.
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
    const { text, icon, children, forwardedRef, ...rest } = props;

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-components/DropdownHeader");

    const { size } = useContext(DropdownContext);

    const renderContent = useContentRenderer({ text, icon, children }, size);
    const render = useRenderer({ rest, forwardedRef }, renderContent());

    // Without a fragment, react-docgen doesn't work.
    return <>{render()}</>;
}

InnerDropdownHeader.propTypes = propTypes;

export const DropdownHeader = forwardRef((props, ref) => (
    <InnerDropdownHeader {...props} forwardedRef={ref} />
));
