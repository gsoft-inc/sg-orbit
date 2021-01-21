import "./RadioGroup.css";

import {
    CheckableContext,
    Keys,
    augmentElement,
    mergeProps,
    omitProps,
    useAutoFocusChild,
    useBasicKeyboardNavigation,
    useControllableState,
    useEventCallback,
    useFocusManager,
    useFocusScope,
    useId,
    useKeyedRovingFocus,
    useMergedRefs
} from "../../shared";
import { Children, forwardRef } from "react";
import { Group } from "../../group";
import { any, bool, elementType, func, number, oneOf, oneOfType, string } from "prop-types";
import { isNil, isNumber } from "lodash";
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
     * Whether or not a user input is required before form submission.
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
     * Whether or not the radio group should autoFocus on render.
     */
    autoFocus: oneOfType([bool, number]),
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
     * Whether or not the radio group is disabled.
     */
    disabled: bool,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * React children.
     */
    children: oneOfType([any, func]).isRequired
};

const NavigationKeyBinding = {
    default: {
        previous: [Keys.left, Keys.up],
        next: [Keys.right, Keys.down],
        first: [Keys.home],
        last: [Keys.end]
    },
    toolbar: {
        previous: [Keys.up],
        next: [Keys.down]
    }
};

const KeyProp = "value";

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
        orientation = "vertical",
        gap,
        wrap,
        reverse,
        disabled,
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        toolbarProps,
        omitProps(fieldProps, ["fluid"])
    );

    const [checkedValue, setCheckedValue] = useControllableState(value, defaultValue, null);

    const [focusScope, setFocusRef] = useFocusScope();

    const groupRef = useMergedRefs(setFocusRef, forwardedRef);

    const handleArrowSelect = useEventCallback((event, element) => {
        // When a number value is provided it's converted to a string when a new value is selected using the keyboard arrows.
        const newValue = element.dataset.type === "number"
            ? parseInt(element.value)
            : element.value;

        setCheckedValue(newValue);
    });

    const focusManager = useFocusManager(focusScope, { keyProp: KeyProp });

    useKeyedRovingFocus(focusScope, checkedValue, { keyProp: KeyProp });

    useAutoFocusChild(focusManager, {
        target: value ?? defaultValue,
        isDisabled: !autoFocus,
        delay: isNumber(autoFocus) ? autoFocus : undefined
    });

    const navigationMode = isInToolbar ? "toolbar" : "default";
    const navigationProps = useBasicKeyboardNavigation(focusManager, NavigationKeyBinding[navigationMode], !isInToolbar ? { onSelect: handleArrowSelect } : undefined);

    const { groupProps, itemProps } = useGroupInput({
        cssModule: "o-ui-radio-group",
        role: "radio-group",
        keyProp: KeyProp,
        value,
        defaultValue,
        required,
        validationState,
        autoFocus,
        orientation,
        gap,
        wrap,
        reverse,
        disabled,
        groupRef
    });

    const handleCheck = useEventCallback((event, newValue) => {
        setCheckedValue(newValue);

        if (!isNil(onChange)) {
            onChange(event, newValue);
        }
    });

    const groupName = useId(name, "radio-group");

    return (
        <Group
            {...mergeProps(
                rest,
                navigationProps,
                groupProps
            )}
        >
            <CheckableContext.Provider
                value={{
                    onCheck: handleCheck,
                    checkedValue
                }}
            >
                {Children.map(children, x => {
                    return augmentElement(x, {
                        ...itemProps,
                        role: "radio",
                        name: groupName
                    });
                })}
            </CheckableContext.Provider>
        </Group>
    );
}

InnerRadioGroup.propTypes = propTypes;

export const RadioGroup = forwardRef((props, ref) => (
    <InnerRadioGroup { ...props } forwardedRef={ref} />
));

RadioGroup.displayName = "RadioGroup";

