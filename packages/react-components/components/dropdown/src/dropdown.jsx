import "./monkey-patch-dropdown-item";

import { DOMEventListener, KEYS, LARGE, SMALL, mergeClasses, throwWhenUnsupportedPropIsProvided, useForwardRef } from "@orbit-ui/react-components-shared";
import { DropdownContext } from "./context";
import { DropdownItem } from "./item";
import { Ref, Dropdown as SemanticDropdown } from "semantic-ui-react";
import { any, arrayOf, bool, element, func, number, object, oneOf, oneOfType, shape, string } from "prop-types";
import { createIconForControl } from "@orbit-ui/react-icons";
import { forwardRef, useEffect, useRef, useState } from "react";
import { isNil } from "lodash";

// Sizes constants are duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise it will not render properly in the docs.
const SIZES = ["small", "medium", "large"];

const SIZES_CLASSES = {
    [SMALL]: "small",
    [LARGE]: "large"
};

const UNSUPPORTED_PROPS = ["as", "basic", "button", "compact", "additionLabel", "additionPosition", "allowAdditions", "direction", "floating", "header", "item", "labeled", "multiple", "openOnFocus", "pointing", "searchInput", "selectOnBlur", "selectOnNavigation", "simple"];

const ACTION_SHAPE = {
    content: element,
    className: string
};

const propTypes = {
    /**
     * A dropdown can display an icon before it's content.
     */
    icon: element,
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
    fluid: bool,
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
    const { icon, size, autofocus, autofocusDelay, actions, options, fluid, disabled, className, forwardedRef, onOpen, onClose, onFocus, onBlur, ...rest } = props;

    const dropdownRef = useRef(null);
    const [innerRef, setInnerRef] = useForwardRef(forwardedRef);
    const [isOpen, setIsOpen] = useState(false);
    const [isFocus, setIsFocus] = useState(false);

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-dropdown");
    useAutofocus(autofocus, autofocusDelay, disabled, innerRef);

    const handleOpen = (...args) => {
        setIsOpen(true);

        if (!isNil(onOpen)) {
            onOpen(...args);
        }
    };

    const handleClose = (...args) => {
        setIsOpen(false);

        if (!isNil(onClose)) {
            onClose(...args);
        }
    };

    const handleFocus = (...args) => {
        setIsFocus(true);

        if (!isNil(onFocus)) {
            onFocus(...args);
        }
    };

    const handleBlur = (...args) => {
        setIsFocus(false);

        if (!isNil(onBlur)) {
            onBlur(...args);
        }
    };

    const handleDocumentKeyDown = event => {
        const key = event.keyCode;

        if (key === KEYS.enter) {
            dropdownRef.current.open(event);
        }
    };

    const dropdownClasses = mergeClasses(
        SIZES_CLASSES[size],
        !isNil(icon) && "with-icon"
    );

    const containerClasses = mergeClasses(
        fluid ? "w-100" : "dib",
        "relative",
        className
    );

    const renderIcon = () => {
        if (!isNil(icon)) {
            return (
                <div className="dropdown-icon">
                    {createIconForControl(icon, size)}

                    <style jsx>{`
                        .dropdown-icon {
                            position: absolute;
                            top: 50%;
                            transform: translateY(-50%);
                            left: var(--scale-bravo);
                            z-index: 12;
                        }
                    `}</style>
                </div>
            );
        }
    };

    const renderOptions = () => {
        if (!isNil(actions)) {
            return [...options, ...actions.map(renderAction)];
        }

        return options;
    };

    return (
        <>
            {/* <Ref innerRef={setInnerRef}>
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
            </Ref> */}

            <div ref={setInnerRef} className={containerClasses}>
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
                        fluid={fluid}
                        disabled={disabled}
                        className={dropdownClasses}
                        ref={dropdownRef}
                        data-testid="dropdown"
                        {...rest}
                    />
                </DropdownContext.Provider>
                {renderIcon()}
            </div>

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
