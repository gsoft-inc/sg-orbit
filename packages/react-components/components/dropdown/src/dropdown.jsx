import { LARGE, SMALL, mergeClasses, throwWhenUnsupportedPropIsProvided } from "@orbit-ui/react-components-shared";
import { Ref, Dropdown as SemanticDropdown } from "semantic-ui-react";
import { forwardRef } from "react";
import { func, object, oneOf, oneOfType,string } from "prop-types";

// Sizes constants are duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise it will not render properly in the docs.
const SIZES = ["small", "medium", "large"];
const DEFAULT_SIZE = "medium";

const SIZES_CLASSES = {
    [SMALL]: "small",
    [LARGE]: "large"
};

const UNSUPPORTED_PROPS = ["basic", "button", "compact", "additionLabel", "additionPosition", "allowAdditions", "direction", "floating", "header", "item", "icon", "labeled", "multiple", "pointing", "simple"];

const propTypes = {
    /**
     * A dropdown can vary in sizes.
     */
    size: oneOf(SIZES),
    /**
     * @ignore
     */
    className: string,
    /**
     * @ignore
     */
    forwardedRef: oneOfType([object, func])
};

const defaultProps = {
    size: DEFAULT_SIZE
};

export function PureDropdown(props) {
    const { size, className, children, forwardedRef, ...rest } = props;

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-dropdown");

    const classes = mergeClasses(
        SIZES_CLASSES[size],
        className
    );

    return (
        <Ref innerRef={forwardedRef}>
            <SemanticDropdown
                selectOnBlur={false}
                selectOnNavigation={false}
                className={classes}
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
