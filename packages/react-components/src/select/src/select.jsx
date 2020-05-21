import { ArgumentError, KEYS, LARGE, MEDIUM, MINI, SMALL, TINY, mergeClasses, throwWhenUnsupportedPropIsProvided, useDomEventListener } from "../../shared";
import { Dropdown } from "../../dropdown";
import { Label } from "semantic-ui-react";
import { MonkeyPatchSemanticDropdown } from "./monkey-patch-semantic-dropdown";
import { SelectItem, createSelectItem } from "./item";
import { any, arrayOf, bool, element, func, object, oneOf, oneOfType, shape, string } from "prop-types";
import { forwardRef, useCallback, useRef, useState } from "react";
import { isArray, isNil } from "lodash";
import { renderAvatar } from "./render-avatar";
import { renderIcons } from "./render-icons";

// Sizes constants are duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise it will not render properly in the docs.
const SIZES = ["small", "medium", "large"];
const DEFAULT_SIZE = "medium";

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
    "wrapSelection"
];

const ACTION_SHAPE = {
    content: element,
    className: string
};

const MULTIPLE_VALUES_LABEL_SIZE = {
    [SMALL]: MINI,
    [MEDIUM]: TINY,
    [LARGE]: SMALL
};

const propTypes = {
    /**
     * An array of items object shorthands.
     */
    options: arrayOf(any).isRequired,
    /**
     * A select can have a list of actions after his items.
     */
    actions: arrayOf(shape(ACTION_SHAPE)),
    /**
     * A select can vary in size.
     */
    size: oneOf(SIZES),
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
    wrapperStyle: object,
    /**
     * @ignore
     */
    inline: bool,
    /**
     * @ignore
     */
    multiple: bool,
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
    forwardedRef: oneOfType([object, func])
};

const defaultProps = {
    size: DEFAULT_SIZE,
    transparent: false,
    inline: false,
    multiple: false
};

function throwWhenMutuallyExclusivePropsAreProvided({ inline, size }) {
    if (inline && size !== DEFAULT_SIZE) {
        throw new ArgumentError("@orbit-ui/react-components/select you cannot specify a size for an inline select.");
    }
}

function throwWhenMultipleAndValuesIsNotAnArray({ multiple, defaultValue, value }) {
    if (multiple) {
        if (!isNil(defaultValue) && !isArray(defaultValue)) {
            throw new ArgumentError("@orbit-ui/react-components/select defaultValues must be an array when multiple is true.");
        }

        if (!isNil(value) && !isArray(value)) {
            throw new ArgumentError("@orbit-ui/react-components/select values must be an array when multiple is true.");
        }
    }
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

function useMultipleValuesLabelRenderer({ size }) {
    return ({ text, avatar, icons, iconsPosition }, index, { className, ...rest }) => {
        let content = text;
        let additionalClasses = "";

        if (!isNil(avatar)) {
            content = (
                <>
                    {renderAvatar(avatar)}
                    {text}
                </>
            );

            additionalClasses = "with-avatar";
        } else if (!isNil(icons)) {
            let left = null;
            let right = null;

            if (iconsPosition === "right") {
                right = renderIcons(icons, size);
            } else {
                left = renderIcons(icons, size);
            }

            content = (
                <>
                    {!isNil(left) && left}
                    <span className="mr1">{text}</span>
                    {!isNil(right) && right}
                </>
            );

            additionalClasses = mergeClasses(
                "with-icons",
                iconsPosition === "right" ? "with-icons-right" : "with-icons-left"
            );
        }

        const classes = mergeClasses(
            additionalClasses,
            className
        );

        return (
            <Label
                {...rest}
                content={content}
                size={MULTIPLE_VALUES_LABEL_SIZE[size]}
                className={classes}
            />
        );
    };
}

function useActionRenderer() {
    return ({ content, key, className, ...props }, index) => {
        const classes = mergeClasses(
            className,
            "action bg-white o-100"
        );

        return { ...props, content, className: classes, disabled: true, key: key || index };
    };
}

function useOptionsRenderer({ options, actions }) {
    const renderAction = useActionRenderer();

    return () => {
        const selectOptions = options.map(x => {
            return {
                ...x,
                factory: createSelectItem
            };
        });

        if (!isNil(actions)) {
            return [...selectOptions, ...actions.map(renderAction)];
        }

        return selectOptions;
    };
}

function useRenderer(
    { size, transparent, inline, className, forwardedRef, rest },
    handleOpen,
    handleClose,
    handleFocus,
    handleBlur,
    handleChange,
    dropdownComponentRef,
    options
) {
    const renderMultipleValuesLabel = useMultipleValuesLabelRenderer({ size });

    return () => {
        const classes = mergeClasses(
            transparent && "transparent",
            className
        );

        return (
            <Dropdown
                {...rest}
                options={options}
                selectOnBlur={false}
                selectOnNavigation={false}
                selection={!inline}
                inline={inline}
                size={size}
                renderLabel={renderMultipleValuesLabel}
                onOpen={handleOpen}
                onClose={handleClose}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
                className={classes}
                ref={forwardedRef}
                __dropdownComponentRef={dropdownComponentRef}
                __semanticDropdown={MonkeyPatchSemanticDropdown}
            />
        );
    };
}

export function InnerSelect(props) {
    const { options, actions, size, transparent, inline, onOpen, onClose, onFocus, onBlur, onChange, className, forwardedRef, ...rest } = props;

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-components/select");
    throwWhenMutuallyExclusivePropsAreProvided(props);
    throwWhenMultipleAndValuesIsNotAnArray(props);

    const [isOpen, setIsOpen] = useState(false);
    const [isFocus, setIsFocus] = useState(false);

    const hasValueChangeRef = useRef(false);
    const dropdownComponentRef = useRef();

    // A select doesn't support children.
    // eslint-disable-next-line react/destructuring-assignment
    delete props["children"];

    const handleOpen = useHandleOpen({ onOpen }, setIsOpen);
    const handleClose = useHandleClose({ onClose }, setIsOpen);
    const handleFocus = useHandleFocus({ onFocus }, setIsFocus);
    const handleBlur = useHandleBlur({ onBlur }, setIsFocus);
    const handleChange = useHandleChange({ onChange }, hasValueChangeRef);

    useHandleDocumentKeyDown(isOpen, isFocus, hasValueChangeRef, dropdownComponentRef);

    const renderOptions = useOptionsRenderer({ options, actions });

    const render = useRenderer(
        { size, transparent, inline, className, forwardedRef, rest },
        handleOpen,
        handleClose,
        handleFocus,
        handleBlur,
        handleChange,
        dropdownComponentRef,
        renderOptions()
    );

    // Without a fragment, react-docgen doesn't work.
    return <>{render()}</>;
}

InnerSelect.propTypes = propTypes;
InnerSelect.defaultProps = defaultProps;

export const Select = forwardRef((props, ref) => (
    <InnerSelect { ...props } forwardedRef={ref} />
));

// Select.Divider, Select.Header, Select.Menu and Select.SearchInput are not supported.
[InnerSelect, Select].forEach(x => {
    x.Item = SelectItem;
});
