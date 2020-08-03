import { EmbeddedIcon } from "../../icons";
import { KEYS, SIZE, SemanticRef, getSizeClass, mergeClasses, throwWhenUnsupportedPropIsProvided, useAutoFocus, useDocumentListener, useEventCallback } from "../../shared";
import { Label } from "semantic-ui-react";
import { MonkeyPatchSemanticDropdown } from "./MonkeyPatchSemanticDropdown";
import { SelectContext } from "./SelectContext";
import { SelectItem } from "./SelectItem";
import { any, arrayOf, bool, element, number, object, oneOf, string } from "prop-types";
import { forwardRef, useCallback, useRef, useState } from "react";
import { isArray, isNil } from "lodash";
import { renderAvatar } from "./renderAvatar";
import { renderIcons } from "./renderIcons";

const UNSUPPORTED_PROPS = [
    "additionLabel",
    "additionPosition",
    "allowAdditions",
    "basic",
    "button",
    "closeOnBlur",
    "closeOnChange",
    "closeOnEscape",
    "compact",
    "deburr",
    "direction",
    "floating",
    "header",
    "labeled",
    "item",
    "openOnFocus",
    "pointing",
    "selection",
    "selectOnBlur",
    "selectOnNavigation",
    "simple",
    "trigger",
    "wrapSelection"
];

const propTypes = {
    /**
     * [Icon](/?path=/docs/components-icon--default-story) component rendered before the content.
     */
    icon: element,
    /**
     * An array of items object shorthands.
     */
    options: arrayOf(any).isRequired,
    /**
     * A select can vary in size.
     */
    size: oneOf(["small", "large"]),
    /**
     * Whether or not the dropdown should autoFocus on render.
     */
    autoFocus: bool,
    /**
     * Delay before trying to autofocus.
     */
    autoFocusDelay: number,
    /**
     * A transparent select has no background.
     */
    transparent: bool,
    /**
     * Additional CSS classes to render on the wrapper element.
     */
    wrapperClassName: string,
    /**
     * Additional style to render on the wrapper element.
     */
    wrapperStyle: object
};

function throwWhenMutuallyExclusivePropsAreProvided({ inline, size }) {
    if (inline && !isNil(size)) {
        throw new Error("@orbit-ui/react-components/Select you cannot specify a size for an inline select.");
    }
}

function throwWhenMultipleAndValuesIsNotAnArray({ multiple, defaultValue, value }) {
    if (multiple) {
        if (!isNil(value) && !isArray(value)) {
            throw new Error("@orbit-ui/react-components/Select value must be an array when multiple is true.");
        }

        if (!isNil(defaultValue) && !isArray(defaultValue)) {
            throw new Error("@orbit-ui/react-components/Select defaultValue must be an array when multiple is true.");
        }
    }
}

const MULTIPLE_VALUES_LABEL_SIZE = {
    [SIZE.small]: SIZE.mini,
    [SIZE.medium]: SIZE.tiny,
    [SIZE.large]: SIZE.small
};

function useMultipleValuesLabelRenderer({ size }) {
    return ({ text, avatar, icons, iconsPosition }, index, { className, ...rest }) => {
        const avatarMarkup = !isNil(avatar) && renderAvatar(avatar);

        const iconsMarkup = !isNil(icons) && renderIcons(icons, size);

        const content = (
            <>
                {iconsPosition === "left" && iconsMarkup}{avatarMarkup}
                {text}
                {iconsPosition === "right" && iconsMarkup}
            </>
        );

        return (
            <Label
                {...rest}
                content={content}
                size={MULTIPLE_VALUES_LABEL_SIZE[size || SIZE.medium]}
                className={mergeClasses(
                    !isNil(avatar) && "with-avatar",
                    !isNil(icons) && iconsPosition === "left" && "with-icons-left",
                    !isNil(icons) && iconsPosition === "right" && "with-icons-right",
                    className
                )}
            />
        );
    };
}

export function InnerSelect(props) {
    const {
        icon,
        options,
        search,
        inline,
        transparent,
        size,
        autoFocus,
        autoFocusDelay,
        fluid,
        disabled,
        onOpen,
        onClose,
        onFocus,
        onBlur,
        onChange,
        active,
        focus,
        hover,
        className,
        wrapperClassName,
        wrapperStyle,
        forwardedRef,
        ...rest
    } = props;
    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-components/Select");
    throwWhenMutuallyExclusivePropsAreProvided(props);
    throwWhenMultipleAndValuesIsNotAnArray(props);

    const [isOpen, setIsOpen] = useState(false);
    const [isFocus, setIsFocus] = useState(false);

    const hasValueChangeRef = useRef(false);
    const dropdownInnerRef = useRef();
    const dropdownComponentRef = useRef();

    // A select doesn't support children.
    // eslint-disable-next-line react/destructuring-assignment
    delete props["children"];

    const handleOpen = useEventCallback((...args) => {
        setIsOpen(true);

        if (!isNil(onOpen)) {
            onOpen(...args);
        }
    });

    const handleClose = useEventCallback((...args) => {
        setIsOpen(false);

        if (!isNil(onClose)) {
            onClose(...args);
        }
    });

    const handleFocus = useEventCallback((...args) => {
        setIsFocus(true);

        if (!isNil(onFocus)) {
            onFocus(...args);
        }
    });

    const handleBlur = useEventCallback((...args) => {
        setIsFocus(false);

        if (!isNil(onBlur)) {
            onBlur(...args);
        }
    });

    const handleChange = useEventCallback((...args) => {
        hasValueChangeRef.current = true;

        if (!isNil(onChange)) {
            onChange(...args);
        }
    });

    const handleDocumentKeyDown = useEventCallback(event => {
        if (event.keyCode === KEYS.enter) {
            if (!hasValueChangeRef.current) {
                dropdownComponentRef.current.open(event);
            }

            hasValueChangeRef.current = false;
        }
    });

    useDocumentListener("keydown", handleDocumentKeyDown, !isOpen && isFocus);

    const setFocusWhenSearch = useCallback(() => {
        if (!isNil(dropdownInnerRef.current)) {
            if (search) {
                dropdownInnerRef.current.querySelector("input.search").focus();
            }
        }
    }, [search, dropdownInnerRef]);

    useAutoFocus(dropdownInnerRef, autoFocus, {
        delay: !isNil(autoFocusDelay) ? autoFocusDelay : 5,
        setFocusWhenSearch
    });

    const renderMultipleValuesLabel = useMultipleValuesLabelRenderer({ size });

    return (
        <div
            className={mergeClasses(
                fluid ? "w-100" : "dib",
                // fixes the weird case where a parent element will be too high when it's children containes an empty inline-block element
                inline ? "v-middle" : "v-top",
                "relative outline-0",
                wrapperClassName
            )}
            style={wrapperStyle}
            tabIndex="-1"
            ref={forwardedRef}
            data-testid="dropdown-wrapper"
        >
            <SelectContext.Provider value={{ size }}>
                <SemanticRef innerRef={dropdownInnerRef}>
                    <MonkeyPatchSemanticDropdown
                        data-testid="dropdown"
                        {...rest}
                        options={options}
                        selectOnBlur={false}
                        selectOnNavigation={false}
                        openOnFocus={false}
                        selection={!inline}
                        inline={inline}
                        search={search}
                        size={size}
                        fluid={fluid}
                        disabled={disabled}
                        renderLabel={renderMultipleValuesLabel}
                        onOpen={handleOpen}
                        onClose={handleClose}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className={mergeClasses(
                            !isNil(icon) && "with-icon",
                            transparent && "transparent",
                            active && "active",
                            focus && "focus",
                            hover && "hover",
                            getSizeClass(size),
                            className
                        )}
                        ref={dropdownComponentRef}
                    />
                </SemanticRef>
            </SelectContext.Provider>
            <If condition={!isNil(icon)}>
                <div
                    className={mergeClasses(
                        "ui dropdown-icon flex items-center",
                        inline && "inline"
                    )}
                >
                    <EmbeddedIcon size={size}>{icon}</EmbeddedIcon>
                </div>
            </If>
        </div>
    );
}

InnerSelect.propTypes = propTypes;

export const Select = forwardRef((props, ref) => (
    <InnerSelect { ...props } forwardedRef={ref} />
));

// Divider, Header, Menu and SearchInput are not supported.
[InnerSelect, Select].forEach(x => {
    x.Item = SelectItem;
});
