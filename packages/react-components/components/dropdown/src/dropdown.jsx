import "./monkey-patch-dropdown-item";

import { DropdownContext } from "./context";
import { DropdownItem } from "./item";
import { LARGE, SMALL, mergeClasses, throwWhenUnsupportedPropIsProvided, useForwardRef } from "@orbit-ui/react-components-shared";
import { Ref, Dropdown as SemanticDropdown } from "semantic-ui-react";
import { any, arrayOf, bool, element, func, number, object, oneOf, oneOfType, shape, string } from "prop-types";
import { forwardRef, useEffect } from "react";
import { isNil } from "lodash";

// Sizes constants are duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise it will not render properly in the docs.
const SIZES = ["small", "medium", "large"];

const SIZES_CLASSES = {
    [SMALL]: "small",
    [LARGE]: "large"
};

const UNSUPPORTED_PROPS = ["as", "basic", "button", "compact", "additionLabel", "additionPosition", "allowAdditions", "direction", "floating", "header", "item", "icon", "labeled", "multiple", "openOnFocus", "pointing", "searchInput", "selectOnBlur", "selectOnNavigation", "simple"];

const ACTION_SHAPE = {
    content: element,
    className: string
};

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
     * A dropdown can have a list of actions.
     */
    actions: arrayOf(shape(ACTION_SHAPE)),
    /**
     * @ignore
     */
    options: arrayOf(any).isRequired,
    /**
     * @ignore
     */
    disabled: bool,
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
    autofocus: false
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

const renderAction = ({ className, ...rest }, index) => {
    const classes = mergeClasses(
        className,
        "action bg-white o-100"
    );

    return { className: classes, disabled: true, key: `action-${index}`, ...rest };
};

export function PureDropdown(props) {
    const { size, autofocus, autofocusDelay, actions, options, disabled, className, forwardedRef, ...rest } = props;

    const [ref, setRef] = useForwardRef(forwardedRef);

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-dropdown");
    useAutofocus(autofocus, autofocusDelay, disabled, ref);

    const classes = mergeClasses(
        SIZES_CLASSES[size],
        className
    );

    const renderOptions = () => {
        if (!isNil(actions)) {
            return [...options, ...actions.map(renderAction)];
        }

        return options;
    };

    return (
        <Ref innerRef={setRef}>
            <DropdownContext.Provider value={{ size: size }}>
                <SemanticDropdown
                    options={renderOptions()}
                    selectOnBlur={false}
                    selectOnNavigation={false}
                    openOnFocus={false}
                    disabled={disabled}
                    className={classes}
                    data-testid="dropdown"
                    {...rest}
                />
            </DropdownContext.Provider>
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
    x.Item = DropdownItem;
    x.Menu = SemanticDropdown.Menu;
    x.SearchInput = SemanticDropdown.SearchInput;
});
