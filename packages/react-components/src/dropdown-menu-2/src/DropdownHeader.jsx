import "./DropdownHeader.css";
import { Dropdown, DropdownContext } from "../../dropdown";
import { EmbeddedIcon } from "../../icons";
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

function Text({ children }) {
    return <span className="text">{children}</span>;
}

function Content({ icon, children }) {
    const { size } = useContext(DropdownContext);

    let left;

    if (!isNil(icon)) {
        left = <EmbeddedIcon icon={icon} size={size} />;
    }

    return (
        <>
            {!isNil(left) && left}
            <Text>{children}</Text>
        </>
    );
}

export function InnerDropdownHeader(props) {
    const { icon, children, forwardedRef, ...rest } = props;

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-components/DropdownHeader");

    return (
        <Dropdown.Header {...rest} ref={forwardedRef}>
            <Content icon={icon}>
                {children}
            </Content>
        </Dropdown.Header>
    );
}

InnerDropdownHeader.propTypes = propTypes;

export const DropdownHeader = forwardRef((props, ref) => (
    <InnerDropdownHeader {...props} forwardedRef={ref} />
));
