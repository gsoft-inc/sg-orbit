import { LARGE, SMALL, mergeClasses, throwWhenUnsupportedPropIsProvided, useForwardRef } from "@orbit-ui/react-components-shared";
import { Ref, Dropdown as SemanticDropdown } from "semantic-ui-react";
import { bool, func, number, object,oneOf, oneOfType, string } from "prop-types";
import { forwardRef, useEffect } from "react";
import { isNil } from "lodash";

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
     * Whether or not the dropdown should autofocus on render.
     */
    autofocus: bool,
    /**
     * Delay before trying to autofocus.
     */
    autofocusDelay: number,
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
    autofocus: false,
    size: DEFAULT_SIZE
};

function focus(dropdownRef) {
    if (!isNil(dropdownRef.current)) {
        dropdownRef.current.focus();
    }
}

function useAutofocus(autofocus, autofocusDelay, disabled, dropdownRef) {
    useEffect(() => {
        let timeoutId;

        if (autofocus && !disabled) {
            const delay = !isNil(autofocusDelay) ? autofocusDelay : 5;

            timeoutId = setTimeout(() => {
                focus(dropdownRef);
            }, delay);
        }

        return () => {
            if (!isNil(timeoutId)) {
                clearTimeout(timeoutId);
            }
        };
    }, [autofocus, autofocusDelay, disabled, dropdownRef]);
}


export function PureDropdown(props) {
    const { size, autofocus, autofocusDelay, disabled, className, children, forwardedRef, ...rest } = props;

    const [ref, setRef] = useForwardRef(forwardedRef);

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-dropdown");
    useAutofocus(autofocus, autofocusDelay, disabled, ref);

    const classes = mergeClasses(
        SIZES_CLASSES[size],
        className
    );

    return (
        <Ref innerRef={setRef}>
            <SemanticDropdown
                selectOnBlur={false}
                selectOnNavigation={false}
                openOnFocus={false}
                disabled={disabled}
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

[PureDropdown, Dropdown].forEach(x => {
    x.Divider = SemanticDropdown.Divider;
    x.Header = SemanticDropdown.Header;
    x.Item = SemanticDropdown.Item;
    x.Menu = SemanticDropdown.Menu;
    x.SearchInput = SemanticDropdown.SearchInput;
});
