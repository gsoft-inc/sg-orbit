import { Ref, Dropdown as SemanticDropdown } from "semantic-ui-react";
import { forwardRef } from "react";
import { func, object, oneOf, oneOfType } from "prop-types";
import { throwWhenUnsupportedPropIsProvided } from "@orbit-ui/react-components-shared";

// Sizes constants are duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise it will not render properly in the docs.
const SIZES = ["small", "medium", "large"];
const DEFAULT_SIZE = "medium";

const UNSUPPORTED_PROPS = ["basic", "button", "compact", "additionLabel", "additionPosition", "allowAdditions", "direction", "floating", "header", "item", "icon", "labeled", "multiple", "pointing", "simple"];

const propTypes = {
    /**
     * A dropdown can vary in sizes.
     */
    size: oneOf(SIZES),
    /**
     * @ignore
     */
    forwardedRef: oneOfType([object, func])
};

const defaultProps = {
    size: DEFAULT_SIZE
};

export function PureDropdown(props) {
    const { children, forwardedRef, ...rest } = props;

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-dropdown");

    return (
        <Ref innerRef={forwardedRef}>
            <SemanticDropdown
                data-testid="dropdown"
                {...rest}
            >
                {children}
            </SemanticDropdown>
        </Ref>
    );
}

PureDropdown.propTypes = propTypes;
PureDropdown.defaultProps = defaultProps;

export const Dropdown = forwardRef((props, ref) => (
    <PureDropdown { ...props } forwardedRef={ref} />
));
