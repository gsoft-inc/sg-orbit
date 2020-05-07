import "./item-factory";

import { DropdownContext } from "./context";
import { DropdownItem } from "./item";
import { KEYS, LARGE, SMALL, SemanticRef, mergeClasses, useAutofocus, useCombinedRefs, useDomEventListener } from "../../shared";
import { Dropdown as SemanticDropdown } from "semantic-ui-react";
import { any, arrayOf, bool, element, elementType, func, number, object, oneOf, oneOfType, string } from "prop-types";
import { createIconForControl } from "../../icons";
import { forwardRef, useCallback, useRef, useState } from "react";
import { isNil } from "lodash";

// Sizes constants are duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise it will not render properly in the docs.
const SIZES = ["small", "medium", "large"];
const DEFAULT_SIZE = "medium";

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
     * @ignore
     */
    search: bool,
    /**
     * @ignore
     */
    inline: bool,
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
    onFocus: func,
    /**
     * @ignore
     */
    onBlur: func,
    /**
     * @ignore
     */
    onChange: func,
    /**
     * @ignore
     */
    options: arrayOf(any),
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
    forwardedRef: oneOfType([object, func]),
    /**
     * @ignore
     */
    __dropdownClasses: string,
    /**
     * @ignore
     */
    __semanticDropdown: elementType
};

const defaultProps = {
    autofocus: false,
    size: DEFAULT_SIZE,
    __semanticDropdown: SemanticDropdown
};

function useSetFocus({ search }, dropdownRef) {
    return useCallback(() => {
        if (!isNil(dropdownRef.current)) {
            if (search) {
                dropdownRef.current.querySelector("input.search").focus();
            } else {
                dropdownRef.current.focus();
            }
        }
    }, [search, dropdownRef]);
}

function useHandleOpen({ onOpen }, setIsOpen) {
    return useCallback((...args) => {
        setIsOpen(true);

        if (!isNil(onOpen)) {
            onOpen(...args);
        }
    }, [onOpen, setIsOpen]);
}

function useHandleClose({ onClose }, setIsOpen) {
    return useCallback((...args) => {
        setIsOpen(false);

        if (!isNil(onClose)) {
            onClose(...args);
        }
    }, [onClose, setIsOpen]);
}

function useHandleFocus({ onFocus }, setIsFocus) {
    return useCallback((...args) => {
        setIsFocus(true);

        if (!isNil(onFocus)) {
            onFocus(...args);
        }
    }, [onFocus, setIsFocus]);
}

function useHandleBlur({ onBlur }, setIsFocus) {
    return useCallback((...args) => {
        setIsFocus(false);

        if (!isNil(onBlur)) {
            onBlur(...args);
        }
    }, [onBlur, setIsFocus]);
}

function useHandleChange({ onChange }, hasValueChangeRef) {
    return useCallback((...args) => {
        hasValueChangeRef.current = true;

        if (!isNil(onChange)) {
            onChange(...args);
        }
    }, [onChange, hasValueChangeRef]);
}

function useHandleDocumentKeyDown(isOpen, isFocus, hasValueChangeRef, dropdownComponentRef) {
    const handleDocumentKeyDown = useCallback(() => {
        const key = event.keyCode;

        if (key === KEYS.enter) {
            if (!hasValueChangeRef.current) {
                dropdownComponentRef.current.open(event);
            }

            hasValueChangeRef.current = false;
        }
    }, [hasValueChangeRef, dropdownComponentRef]);

    useDomEventListener("keydown", handleDocumentKeyDown, !isOpen && isFocus);
}

function useDropdownRenderer(
    { search, inline, icon, size, fluid, trigger, disabled, __dropdownClasses, __semanticDropdown: ConcreteSemanticDropdown, rest },
    handleOpen,
    handleClose,
    handleFocus,
    handleBlur,
    handleChange,
    autofocusProps,
    dropdownComponentRef) {
    const sizeClasses = {
        [SMALL]: "small",
        [LARGE]: "large"
    };

    return () => {
        const classes = mergeClasses(
            sizeClasses[size],
            !isNil(icon) && "with-icon",
            __dropdownClasses
        );

        return (
            <ConcreteSemanticDropdown
                data-testid="dropdown"
                {...rest}
                {...autofocusProps}
                onOpen={handleOpen}
                onClose={handleClose}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
                inline={inline}
                search={search}
                openOnFocus={false}
                fluid={fluid}
                trigger={trigger}
                icon={isNil(trigger) ? undefined : null }
                disabled={disabled}
                className={classes}
                ref={dropdownComponentRef}
            />
        );
    };
}

function useIconRenderer({ inline, icon, size }) {
    return () => {
        if (!isNil(icon)) {
            const classes = mergeClasses(
                "ui dropdown-icon flex items-center",
                inline && "inline"
            );

            return (
                <div className={classes}>
                    {createIconForControl(icon, size)}
                </div>
            );
        }
    };
}

function useRenderer({ size, fluid, className }, innerRef, dropdown, icon) {
    return () => {
        const classes = mergeClasses(
            fluid ? "w-100" : "dib",
            "relative outline-0",
            className
        );

        return (
            <div
                className={classes}
                tabIndex={-1}
            >
                <SemanticRef innerRef={innerRef}>
                    <DropdownContext.Provider value={{ size }}>
                        {dropdown}
                    </DropdownContext.Provider>
                </SemanticRef>
                {icon}
            </div>
        );
    };
}

export function PureDropdown(props) {
    const {
        search,
        inline,
        icon,
        size,
        autofocus,
        autofocusDelay,
        fluid,
        trigger,
        disabled,
        className,
        forwardedRef,
        onOpen,
        onClose,
        onFocus,
        onBlur,
        onChange,
        __dropdownClasses,
        __semanticDropdown,
        ...rest
    } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [isFocus, setIsFocus] = useState(false);

    const hasValueChangeRef = useRef(false);
    const dropdownComponentRef = useRef();
    const innerRef = useCombinedRefs(forwardedRef);

    const setFocus = useSetFocus(innerRef);
    const autofocusProps = useAutofocus(autofocus, !isNil(autofocusDelay) ? autofocusDelay : 5, disabled, setFocus);

    const handleOpen = useHandleOpen({ onOpen }, setIsOpen);
    const handleClose = useHandleClose({ onClose }, setIsOpen);
    const handleFocus = useHandleFocus({ onFocus }, setIsFocus);
    const handleBlur = useHandleBlur({ onBlur }, setIsFocus);
    const handleChange = useHandleChange({ onChange }, hasValueChangeRef);

    useHandleDocumentKeyDown(isOpen, isFocus, hasValueChangeRef, dropdownComponentRef);

    const renderDropdown = useDropdownRenderer(
        { search, inline, icon, size, fluid, trigger, disabled, __dropdownClasses, __semanticDropdown, rest },
        handleOpen,
        handleClose,
        handleFocus,
        handleBlur,
        handleChange,
        autofocusProps,
        dropdownComponentRef
    );

    const renderIcon = useIconRenderer({ inline, icon, size });
    const render = useRenderer({ size, fluid, className }, innerRef, renderDropdown(), renderIcon());

    return render();
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
