import "./RadioGroup.css";

import {
    CheckableProvider,
    KEYS,
    augmentElement,
    mergeProps,
    omitProps,
    useAutoFocusFirstTabbableElement,
    useControllableState,
    useEventCallback,
    useId,
    useKeyboardNavigation,
    useKeyedRovingFocus,
    useMergedRefs,
    useRenderProps
} from "../../shared";
import { Children, forwardRef } from "react";
import { Group } from "../../group";
import { any, bool, elementType, func, number, oneOf, oneOfType, string } from "prop-types";
import { isNil } from "lodash";
import { useFieldInputProps } from "../../field";
import { useGroupInput } from "../../input";
import { useToolbarProps } from "../../toolbar";

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
     * Called when any of the group elements is checked or unchecked.
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
     * The delay before trying to autofocus.
     */
    autoFocusDelay: number,
    /**
     * The orientation of the group elements.
     */
    orientation: oneOf(["horizontal", "vertical"]),
    /**
     * The space between the group elements.
     */
    gap: oneOfType([oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]), string]),
    /**
     * Whether the group elements are forced onto one line or can wrap onto multiple lines
     */
    wrap: bool,
    /**
     * Invert the order of the radio button and his label.
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

const NAV_KEY_BINDING = {
    default: {
        previous: [KEYS.left, KEYS.up],
        next: [KEYS.right, KEYS.down],
        first: [KEYS.home],
        last: [KEYS.end]
    },
    toolbar: {
        previous: [KEYS.up],
        next: [KEYS.down]
    }
};

export function InnerRadioGroup(props) {
    const [toolbarProps, isInToolbar] = useToolbarProps();
    const [fieldProps] = useFieldInputProps();

    const {
        value,
        defaultValue,
        required,
        validationState,
        name,
        onChange,
        autoFocus,
        autoFocusDelay,
        orientation = "vertical",
        gap,
        wrap,
        reverse,
        disabled,
        className,
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        toolbarProps,
        omitProps(fieldProps, ["fluid"])
    );

    const [checkedValue, setCheckedValue] = useControllableState(value, defaultValue, null);

    const ref = useMergedRefs(forwardedRef);

    useKeyedRovingFocus(ref, !isNil(checkedValue) ? checkedValue : checkedValue, { keyProp: "value" });
    useAutoFocusFirstTabbableElement(ref, autoFocus, { delay: autoFocusDelay });

    const handleArrowSelect = useEventCallback((event, element) => {
        // When a number value is provided it's converted to a string when a new value is selected using the keyboard arrows.
        const newValue = element.dataset.type === "number"
            ? parseInt(element.value)
            : element.value;

        setCheckedValue(newValue);
    });

    const navigationMode = isInToolbar ? "toolbar" : "default";
    const navigationProps = useKeyboardNavigation(NAV_KEY_BINDING[navigationMode], !isInToolbar ? handleArrowSelect : undefined);

    const { groupProps, itemProps } = useGroupInput({
        cssModule: "o-ui-radio-group",
        role: "radio-group",
        required,
        validationState,
        orientation,
        gap,
        wrap,
        reverse,
        disabled,
        className,
        ref
    });

    const handleCheck = useEventCallback((event, newValue) => {
        setCheckedValue(newValue);

        if (!isNil(onChange)) {
            onChange(event, newValue);
        }
    });

    const groupName = useId(name, "radio-group");

    const items = useRenderProps({ checkedValue }, props, children);

    return (
        <Group
            {...rest}
            {...navigationProps}
            {...groupProps}
        >
            <CheckableProvider
                value={{
                    onCheck: handleCheck,
                    checkedValue
                }}
            >
                {Children.map(items, x => {
                    return augmentElement(x, {
                        ...itemProps,
                        role: "radio",
                        name: groupName
                    });
                })}
            </CheckableProvider>
        </Group>
    );
}

InnerRadioGroup.propTypes = propTypes;

export const RadioGroup = forwardRef((props, ref) => (
    <InnerRadioGroup { ...props } forwardedRef={ref} />
));

