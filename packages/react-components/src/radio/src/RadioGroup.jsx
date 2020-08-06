import {
    CheckableContext,
    KEYS,
    SIZE,
    augmentElement,
    useArrowNavigation,
    useAutoFocusFirstTabbableElement,
    useControllableState,
    useEventCallback,
    useId,
    useMergedRefs,
    useRovingFocus
} from "../../shared";
import { Children, forwardRef } from "react";
import { Flex } from "../../layout";
import { any, bool, elementType, func, number, oneOf, oneOfType, string } from "prop-types";
import { isFunction, isNil } from "lodash";
import { useToolbarProps } from "../../toolbar/src/ToolbarContext";

const ARROW_NAV_KEY_BINDING = {
    "default": {
        previous: [KEYS.left, KEYS.up],
        next: [KEYS.right, KEYS.down],
        first: [KEYS.home],
        last: [KEYS.end]
    },
    "toolbar": {
        previous: [KEYS.up],
        next: [KEYS.down]
    }
};

const SIZE_GAP = {
    "horizontal": {
        [SIZE.small]: 4,
        [SIZE.medium]: 5,
        [SIZE.large]: 6
    },
    "vertical": {
        [SIZE.small]: 2,
        [SIZE.medium]: 3,
        [SIZE.large]: 4
    }
};

const propTypes = {
    /**
     * The value of the radio group.
     */
    value: oneOfType([string, number]),
    /**
     * The initial value of `value`.
     */
    defaultValue: oneOfType([string, number]),
    /**
     * Radio group name.
     */
    name: string,
    /**
     * Called when any of the children is checked or unchecked.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {string | number} value - The new value.
     * @returns {void}
     */
    onChange: func,
    /**
     * Whether or not the radio group should autoFocus on render.
     */
    autoFocus: bool,
    /**
     * Delay before trying to autofocus.
     */
    autoFocusDelay: number,
    /**
     * Orientation of the children.
     */
    orientation: oneOf(["horizontal", "vertical"]),
    /**
     * The space between elements.
     */
    gap: oneOfType([oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]), string]),
    /**
     * Whether or not elements are forced onto one line or can wrap onto multiple lines
     */
    wrap: bool,
    /**
     * Children size.
     */
    size: oneOf(["small", "medium", "large"]),
    /**
     * Whether or not the radio group is disabled.
     */
    disabled: bool,
    /**
     * Whether or not the radio group is read only.
     */
    readOnly: bool,
    /**
   * An HTML element type or a custom React element type to render as.
   */
    as: oneOfType([string, elementType]),
    /**
     * Component children.
     */
    children: oneOfType([any, func]).isRequired
};

const defaultProps = {
    as: "div"
};

export function InnerRadioGroup(props) {
    const {
        value,
        defaultValue,
        name,
        onChange,
        autoFocus,
        autoFocusDelay,
        orientation = "vertical",
        gap,
        wrap,
        size,
        disabled,
        readOnly,
        navigationMode,
        children,
        forwardedRef,
        ...rest
    } = useToolbarProps(props);

    const [checkedValue, setCheckedValue] = useControllableState(value, defaultValue, null);

    const ref = useMergedRefs(forwardedRef);

    useRovingFocus(ref, checkedValue, { keyProp: "value" });
    useAutoFocusFirstTabbableElement(ref, autoFocus, { delay: autoFocusDelay });

    const handleArrowSelect = useEventCallback((event, element) => {
        setCheckedValue(element.value);
    });

    const navigationProps = useArrowNavigation(ARROW_NAV_KEY_BINDING[navigationMode], navigationMode !== "toolbar" ? handleArrowSelect : undefined);

    const handleCheck = useEventCallback((event, newValue) => {
        setCheckedValue(newValue);

        if (!isNil(onChange)) {
            onChange(event, newValue);
        }
    });

    const groupName = useId(name, "radio-group");

    const items = isFunction(children)
        ? children({ checkedValue })
        : children;

    return (
        <Flex
            {...rest}
            {...navigationProps}
            direction={orientation === "horizontal" ? "row" : "column"}
            alignItems="start"
            gap={gap ?? SIZE_GAP[orientation][size ?? SIZE.medium]}
            wrap={!isNil(wrap) ? "wrap" : undefined}
            role="radiogroup"
            aria-readonly={readOnly}
            aria-disabled={disabled}
            aria-orientation={orientation}
            ref={ref}
        >
            <CheckableContext.Provider
                value={{
                    onCheck: handleCheck,
                    checkedValue
                }}
            >
                {Children.map(items, x => {
                    return augmentElement(x, {
                        name: groupName,
                        size,
                        disabled,
                        readOnly,
                        role: "radio"
                    });
                })}
            </CheckableContext.Provider>
        </Flex>
    );
}

InnerRadioGroup.propTypes = propTypes;
InnerRadioGroup.defaultProps = defaultProps;

export const RadioGroup = forwardRef((props, ref) => (
    <InnerRadioGroup { ...props } forwardedRef={ref} />
));
