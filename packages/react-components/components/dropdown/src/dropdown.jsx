import "./monkey-patch-dropdown-item";

import { DOMEventListener, KEYS, LARGE, SMALL, mergeClasses, throwWhenUnsupportedPropIsProvided, useForwardRef } from "@orbit-ui/react-components-shared";
import { DropdownContext } from "./context";
import { DropdownItem } from "./item";
import { Ref, Dropdown as SemanticDropdown } from "semantic-ui-react";
import { any, arrayOf, bool, element, func, number, object, oneOf, oneOfType, shape, string } from "prop-types";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
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
    onOpen: func,
    /**
     * @ignore
     */
    onClose: func,
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

const renderAction = ({ content, className, ...rest }, index) => {
    const classes = mergeClasses(
        className,
        "action bg-white o-100"
    );

    return { raw: content, className: classes, disabled: true, key: index, ...rest };
};

export function PureDropdown(props) {
    const { onOpen, onClose, onFocus, onBlur, size, autofocus, autofocusDelay, actions, options, disabled, className, forwardedRef, ...rest } = props;

    const dropdownRef = useRef(null);
    const [innerRef, setInnerRef] = useForwardRef(forwardedRef);
    const [isOpen, setIsOpen] = useState(false);
    const [isFocus, setIsFocus] = useState(false);

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-dropdown");
    useAutofocus(autofocus, autofocusDelay, disabled, innerRef);

    const handleOpen = useCallback((...args) => {
        setIsOpen(true);

        if (!isNil(onOpen)) {
            onOpen(...args);
        }
    }, [onOpen]);

    const handleClose = useCallback((...args) => {
        setIsOpen(false);

        if (!isNil(onClose)) {
            onClose(...args);
        }
    }, [onClose]);

    const handleFocus = useCallback((...args) => {
        setIsFocus(true);

        if (!isNil(onFocus)) {
            onFocus(...args);
        }
    }, [onFocus]);

    const handleBlur = useCallback((...args) => {
        setIsFocus(false);

        if (!isNil(onBlur)) {
            onBlur(...args);
        }
    }, [onBlur]);

    const handleDocumentKeyDown = useCallback(event => {
        const key = event.keyCode;

        if (key === KEYS.enter) {
            dropdownRef.current.open(event);
        }
    }, []);

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
        <>
            <Ref innerRef={setInnerRef}>
                <DropdownContext.Provider value={{ size: size }}>
                    <SemanticDropdown
                        options={renderOptions()}
                        onOpen={handleOpen}
                        onClose={handleClose}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        selectOnBlur={false}
                        selectOnNavigation={false}
                        openOnFocus={false}
                        disabled={disabled}
                        className={classes}
                        ref={dropdownRef}
                        data-testid="dropdown"
                        {...rest}
                    />
                </DropdownContext.Provider>
            </Ref>

            <If condition={!isOpen && isFocus}>
                <DOMEventListener name="keydown" on={handleDocumentKeyDown} />
            </If>
        </>
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
