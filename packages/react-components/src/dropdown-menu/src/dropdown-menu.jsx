import { Children, cloneElement, forwardRef, useCallback, useRef, useState } from "react";
import { Dropdown } from "../../dropdown";
import { DropdownMenuButtonItem } from "./button-item";
import { DropdownMenuHeader } from "./header";
import { DropdownMenuItem } from "./item";
import { DropdownMenuLinkItem } from "./link-item";
import { KEYS, mergeClasses, throwWhenUnsupportedPropIsProvided, useCombinedRefs, useDomEventListener } from "../../shared";
import { MonkeyPatchSemanticDropdown } from "./monkey-patch-semantic-dropdown";
import { bool, element, func, object, oneOf, oneOfType, string } from "prop-types";
import { isNil } from "lodash";

// TODO:
// - close on enter & spacebar keydown is not working.
// - tabulation on FF has problems

// Sizes constants are duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise it will not render properly in the docs.
const SIZES = ["small", "medium", "large"];
const DEFAULT_SIZE = "medium";

const UNSUPPORTED_PROPS = [
    "additionLabel",
    "additionPosition",
    "allowAdditions",
    "basic",
    "button",
    "clearable",
    "closeOnBlur",
    "closeOnChange",
    "closeOnEscape",
    "compact",
    "deburr",
    "floating",
    "inline",
    "labeled",
    "item",
    "minCharacters",
    "multiple",
    "noResultsMessage",
    "onAddItem",
    "onChange",
    "onLabelClick",
    "onSearchChange",
    "openOnFocus",
    "pointing",
    "renderLabel",
    "search",
    "searchInput",
    "searchQuery",
    "selectOnBlur",
    "selectOnNavigation",
    "selectedLabel",
    "selection",
    "simple",
    "wrapSelection"
];

const propTypes = {
    /**
     * A dropdown menu can vary in size.
     */
    size: oneOf(SIZES),
    /**
     * Whether or not to focus the first item when the dropdown opens.
     */
    focusFirstItemOnOpen: bool,
    /**
     * @ignore
     */
    active: bool,
    /**
     * @ignore
     */
    focus: bool,
    /**
     * @ignore
     */
    hover: bool,
    /**
     * @ignore
     */
    trigger: element,
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
    className: string,
    /**
     * @ignore
     */
    forwardedRef: oneOfType([object, func])
};

const defaultProps = {
    size: DEFAULT_SIZE,
    focusFirstItemOnOpen: true
};

function useHandleOpen({ focusFirstItemOnOpen, onOpen }, setIsOpen, dropdownRef) {
    return useCallback((...args) => {
        setIsOpen(true);

        if (!isNil(onOpen)) {
            onOpen(...args);
        }

        if (focusFirstItemOnOpen) {
            setTimeout(() => {
                if (!isNil(dropdownRef.current)) {
                    const firstItemNode = dropdownRef.current.querySelector(".item");

                    if (!isNil(firstItemNode)) {
                        firstItemNode.focus();
                    }
                }
            }, 0);
        }
    }, [focusFirstItemOnOpen, onOpen, setIsOpen, dropdownRef]);
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

function useHandleDocumentKeyDown({ trigger }, isOpen, isFocus, dropdownComponentRef) {
    const handleDocumentKeyDown = useCallback(event => {
        if (event.keyCode === KEYS.enter) {
            if (!isOpen) {
                dropdownComponentRef.current.open(event);
            }
        }
    }, [isOpen, dropdownComponentRef]);

    useDomEventListener("keydown", handleDocumentKeyDown, isNil(trigger) && isFocus);
}

function useTriggerRenderer({ trigger, focus }) {
    return useCallback(() => {
        if (!isNil(trigger)) {
            return cloneElement(trigger, {
                focus
            });
        }

        return trigger;
    }, [trigger, focus]);
}

function useRenderer(
    { active, focus, hover, className, forwardedRef, children, rest },
    handleOpen,
    handleClose,
    handleFocus,
    handleBlur,
    dropdownRef,
    dropdownComponentRef,
    trigger
) {
    const ref = useCombinedRefs(forwardedRef, dropdownRef);

    return () => {
        const hasChildren = Children.count(children) > 0;

        const classes = mergeClasses(
            "dropdown-menu",
            isNil(trigger) && active && "active",
            isNil(trigger) && focus && "focus",
            isNil(trigger) && hover && "hover",
            className
        );

        return (
            <Dropdown
                {...rest}
                trigger={trigger}
                selectOnBlur={false}
                selectOnNavigation={false}
                onOpen={handleOpen}
                onClose={handleClose}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={classes}
                ref={ref}
                tabIndex={isNil(trigger) ? "0" : "-1"}
                __dropdownComponentRef={dropdownComponentRef}
                __semanticDropdown={MonkeyPatchSemanticDropdown}
            >
                <Choose>
                    <When condition={hasChildren}>
                        <Dropdown.Menu>
                            {children}
                        </Dropdown.Menu>
                    </When>
                    <Otherwise>
                        {children}
                    </Otherwise>
                </Choose>
            </Dropdown>
        );
    };
}

export function InnerDropdownMenu(props) {
    const { trigger, focusFirstItemOnOpen, active, focus, hover, onOpen, onClose, onFocus, onBlur, className, forwardedRef, children, ...rest } = props;

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-components/dropdown-menu");

    const [isOpen, setIsOpen] = useState(false);
    const [isFocus, setIsFocus] = useState(false);

    const dropdownRef = useRef();
    const dropdownComponentRef = useRef();

    const handleOpen = useHandleOpen({ focusFirstItemOnOpen, onOpen }, setIsOpen, dropdownRef);
    const handleClose = useHandleClose({ onClose }, setIsOpen);
    const handleFocus = useHandleFocus({ onFocus }, setIsFocus);
    const handleBlur = useHandleBlur({ onBlur }, setIsFocus);

    useHandleDocumentKeyDown({ trigger }, isOpen, isFocus, dropdownComponentRef);

    const renderTrigger = useTriggerRenderer({ trigger, focus });

    const render = useRenderer(
        { active, focus, hover, className, forwardedRef, children, rest },
        handleOpen,
        handleClose,
        handleFocus,
        handleBlur,
        dropdownRef,
        dropdownComponentRef,
        renderTrigger()
    );

    // Without a fragment, react-docgen doesn't work.
    return <>{render()}</>;
}

InnerDropdownMenu.propTypes = propTypes;
InnerDropdownMenu.defaultProps = defaultProps;

export const DropdownMenu = forwardRef((props, ref) => (
    <InnerDropdownMenu { ...props } forwardedRef={ref} />
));

// DropdownMenu.Menu and DropdownMenu.SearchInput are not supported.
[InnerDropdownMenu, DropdownMenu].forEach(x => {
    x.Divider = Dropdown.Divider;
    x.Header = DropdownMenuHeader;
    x.Item = DropdownMenuItem;
    x.LinkItem = DropdownMenuLinkItem;
    x.ButtonItem = DropdownMenuButtonItem;
});
