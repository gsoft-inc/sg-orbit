import { Dropdown, DropdownContext } from "..";
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

export function InnerDropdownHeader(props) {
    const { icon, children, forwardedRef, ...rest } = props;
    const { size } = useContext(DropdownContext);

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-components/DropdownHeader");

    return (
        <Dropdown.Header {...rest} ref={forwardedRef}>
            {!isNil(icon) && <EmbeddedIcon icon={icon} size={size} />}
            <span className="text">{children}</span>
        </Dropdown.Header>
    );
}

InnerDropdownHeader.propTypes = propTypes;

export const DropdownHeader = forwardRef((props, ref) => (
    <InnerDropdownHeader {...props} forwardedRef={ref} />
));
