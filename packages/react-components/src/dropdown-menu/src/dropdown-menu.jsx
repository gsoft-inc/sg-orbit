import { Children, forwardRef, useCallback, useRef, useState } from "react";
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
     * Additional CSS classes to render on the dropdown wrapper element.
     */
    wrapperClassName: string,
    /**
     * Additional style to render on the dropdown wrapper element.
     */
    wrapperStyle: object,
    /**
     * Whether or not to focus the first item when the dropdown opens.
     */
    focusFirstItemOnOpen: bool,
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
        const key = event.keyCode;

        if (key === KEYS.enter) {
            if (!isOpen) {
                dropdownComponentRef.current.open(event);
            }
        }
    }, [isOpen, dropdownComponentRef]);

    useDomEventListener("keydown", handleDocumentKeyDown, isNil(trigger) && isFocus);
}

function useRenderer(
    { trigger, className, forwardedRef, children, rest },
    handleOpen,
    handleClose,
    handleFocus,
    handleBlur,
    dropdownRef,
    dropdownComponentRef
) {
    const ref = useCombinedRefs(forwardedRef, dropdownRef);

    return () => {
        const hasChildren = Children.count(children) > 0;

        const classes = mergeClasses(
            "dropdown-menu",
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
    const { trigger, focusFirstItemOnOpen, onOpen, onClose, onFocus, onBlur, className, forwardedRef, children, ...rest } = props;

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

    const render = useRenderer(
        { trigger, className, forwardedRef, children, rest },
        handleOpen,
        handleClose,
        handleFocus,
        handleBlur,
        dropdownRef,
        dropdownComponentRef
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
