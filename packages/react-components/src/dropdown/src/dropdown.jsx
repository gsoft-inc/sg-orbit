import "./item-factory";

import { DropdownContext } from "./context";
import { DropdownItem } from "./item";
import { LARGE, SMALL, SemanticRef, mergeClasses, useAutofocus } from "../../shared";
import { Dropdown as SemanticDropdown } from "semantic-ui-react";
import { any, arrayOf, bool, element, elementType, func, number, object, oneOf, oneOfType, string } from "prop-types";
import { createContentIcon } from "../../icons";
import { forwardRef, useCallback, useRef } from "react";
import { isNil } from "lodash";

// Sizes constants are duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise it will not render properly in the docs.
const SIZES = ["small", "medium", "large"];
const DEFAULT_SIZE = "medium";

const SIZE_CLASS = {
    [SMALL]: "small",
    [LARGE]: "large"
};

const propTypes = {
    /**
     * [Shorthand](/?path=/docs/getting-started-shorthand-props--page) to display an [icon](/?path=/docs/components-icon--default-story before the content.
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
     * Additional CSS classes to render on the dropdown wrapper element.
     */
    wrapperClassName: string,
    /**
     * Additional style to render on the dropdown wrapper element.
     */
    wrapperStyle: object,
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
    __dropdownComponentRef: object,
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

function useDropdownRenderer(
    { search, inline, icon, size, fluid, trigger, disabled, className, __dropdownComponentRef, __semanticDropdown: ConcreteSemanticDropdown, rest },
    dropdownInnerRef,
    autofocusProps
) {
    return () => {
        const classes = mergeClasses(
            SIZE_CLASS[size],
            !isNil(icon) && "with-icon",
            className
        );

        return (
            <SemanticRef innerRef={dropdownInnerRef}>
                <ConcreteSemanticDropdown
                    data-testid="dropdown"
                    {...rest}
                    {...autofocusProps}
                    inline={inline}
                    search={search}
                    openOnFocus={false}
                    fluid={fluid}
                    trigger={trigger}
                    icon={isNil(trigger) ? undefined : null }
                    disabled={disabled}
                    className={classes}
                    ref={__dropdownComponentRef}
                />
            </SemanticRef>
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
                    {createContentIcon(icon, size)}
                </div>
            );
        }
    };
}

function useRenderer({ size, fluid, wrapperClassName, wrapperStyle, forwardedRef }, dropdown, icon) {
    return () => {
        const classes = mergeClasses(
            fluid ? "w-100" : "dib",
            "relative outline-0",
            wrapperClassName
        );

        return (
            <div
                className={classes}
                style={wrapperStyle}
                tabIndex="-1"
                ref={forwardedRef}
                data-testid="dropdown-wrapper"
            >
                <DropdownContext.Provider value={{ size }}>
                    {dropdown}
                </DropdownContext.Provider>
                {icon}
            </div>
        );
    };
}

export function InnerDropdown(props) {
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
        wrapperClassName,
        wrapperStyle,
        forwardedRef,
        __dropdownComponentRef,
        __semanticDropdown,
        ...rest
    } = props;
    const dropdownInnerRef = useRef();

    const setFocus = useSetFocus({ search }, dropdownInnerRef);
    const autofocusProps = useAutofocus(autofocus, !isNil(autofocusDelay) ? autofocusDelay : 5, disabled, setFocus);

    const renderDropdown = useDropdownRenderer(
        { search, inline, icon, size, fluid, trigger, disabled, className, __dropdownComponentRef, __semanticDropdown, rest },
        dropdownInnerRef,
        autofocusProps
    );

    const renderIcon = useIconRenderer({ inline, icon, size });
    const render = useRenderer({ size, fluid, wrapperClassName, wrapperStyle, forwardedRef }, renderDropdown(), renderIcon());

    // Without a fragment, react-docgen doesn't work.
    return <>{render()}</>;
}

InnerDropdown.propTypes = propTypes;
InnerDropdown.defaultProps = defaultProps;

export const Dropdown = forwardRef((props, ref) => (
    <InnerDropdown {...props} forwardedRef={ref} />
));

[InnerDropdown, Dropdown].forEach(x => {
    x.Divider = SemanticDropdown.Divider;
    x.Header = SemanticDropdown.Header;
    x.Item = DropdownItem;
    x.Menu = SemanticDropdown.Menu;
    x.SearchInput = SemanticDropdown.SearchInput;
});
