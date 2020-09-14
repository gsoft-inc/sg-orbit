import {
    CheckableContext,
    KEYS,
    augmentElement,
    mergeProps,
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
import { useGroupInput } from "../../input";
import { useToolbarContext } from "../../toolbar";

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
     * Whether a user input is required before form submission.
     */
    required: bool,
    /**
     * Whether the group should display as "valid" or "invalid".
     */
    validationState: oneOf(["valid", "invalid"]),
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
     * Whether the radio group should autoFocus on render.
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
     * Whether elements are forced onto one line or can wrap onto multiple lines
     */
    wrap: bool,
    /**
     * Children size.
     */
    size: oneOf(["small", "medium", "large"]),
    /**
     * Invert the order of the button and the label of all children.
     */
    reverse: bool,
    /**
     * Whether the radio group is disabled.
     */
    disabled: bool,
    /**
   * An HTML element type or a custom React element type to render as.
   */
    as: oneOfType([string, elementType]),
    /**
     * Component children.
     */
    children: oneOfType([any, func]).isRequired
};

export function InnerRadioGroup(props) {
    const { isInToolbar, ...toolbarProps } = useToolbarContext();

    const {
        value,
        defaultValue,
        required,
        validationState,
        name,
        onChange,
        autoFocus,
        autoFocusDelay,
        orientation,
        gap,
        wrap,
        size,
        reverse,
        disabled,
        children,
        forwardedRef,
        ...rest
    } = mergeProps(props, toolbarProps);

    const [checkedValue, setCheckedValue] = useControllableState(value, defaultValue, null);

    const ref = useMergedRefs(forwardedRef);

    useRovingFocus(ref, checkedValue, { keyProp: "value" });
    useAutoFocusFirstTabbableElement(ref, autoFocus, { delay: autoFocusDelay });

    const handleArrowSelect = useEventCallback((event, element) => {
        setCheckedValue(element.value);
    });

    const navigationMode = isInToolbar ? "toolbar" : "default";
    const navigationProps = useArrowNavigation(ARROW_NAV_KEY_BINDING[navigationMode], !isInToolbar ? handleArrowSelect : undefined);

    const { groupProps, itemProps } = useGroupInput({
        role: "radio-group",
        required,
        validationState,
        orientation: orientation ?? "vertical",
        gap,
        wrap,
        size,
        reverse,
        disabled,
        ref
    });

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
            {...groupProps}
        >
            <CheckableContext.Provider
                value={{
                    onCheck: handleCheck,
                    checkedValue,
                    role: "radio"
                }}
            >
                {Children.map(items, x => {
                    return augmentElement(x, {
                        ...itemProps,
                        name: groupName
                    });
                })}
            </CheckableContext.Provider>
        </Flex>
    );
}

InnerRadioGroup.propTypes = propTypes;

export const RadioGroup = forwardRef((props, ref) => (
    <InnerRadioGroup { ...props } forwardedRef={ref} />
));

