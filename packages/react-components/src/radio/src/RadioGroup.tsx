import "./RadioGroup.css";

import {
    CheckableContext,
    InternalProps,
    Keys,
    OmitInternalProps,
    OrbitComponentProps,
    SlotProps,
    augmentElement,
    isNil,
    isNumber,
    mergeProps,
    omitProps,
    useAutoFocusChild,
    useControllableState,
    useEventCallback,
    useFocusManager,
    useFocusScope,
    useId,
    useKeyboardNavigation,
    useKeyedRovingFocus,
    useMergedRefs
} from "../../shared";
import { Children, ComponentProps, ReactElement, ReactNode, SyntheticEvent, forwardRef } from "react";
import { Group } from "../../group";
import { useFieldInputProps } from "../../field";
import { useGroupInput } from "../../input";
import { useToolbarProps } from "../../toolbar";

const DefaultElement = "div";

export interface InnerRadioGroupProps extends SlotProps, InternalProps, Omit<OrbitComponentProps<typeof DefaultElement>, "onChange"> {
    /**
      * Whether or not the radio group should autoFocus on render.
      */
    autoFocus?: boolean | number;
    /**
      * React children.
      */
    children: ReactNode;
    /**
      * The initial value of `value`.
      */
    defaultValue?: string;
    /**
      * Whether or not the radio group is disabled.
      */
    disabled?: boolean;
    /**
      * The space between the group elements.
      */
    gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | string;
    /**
      * Radio group name.
      */
    name?: string;
    /**
      * Called when any of the group elements is checked or unchecked.
      * @param {SyntheticEvent} event - React's original event.
      * @param {string} value - The new value.
      * @returns {void}
      */
    onChange?: (event: SyntheticEvent, value: string) => void;
    /**
      * The orientation of the group elements.
      */
    orientation?: "horizontal" | "vertical";
    /**
      * Whether or not a user input is required before form submission.
      */
    required?: boolean;
    /**
      * Invert the order of the radio button and his label.
      */
    reverse?: boolean;
    /**
      * Whether the group should display as "valid" or "invalid".
      */
    validationState?: "valid" | "invalid";
    /**
     * The value of the radio group.
     */
    value?: string | null;
    /**
      * Whether the group elements are forced onto one line or can wrap onto multiple lines
      */
    wrap?: boolean;
}

const NavigationKeyBinding = {
    default: {
        first: [Keys.home],
        last: [Keys.end],
        next: [Keys.arrowRight, Keys.arrowDown],
        previous: [Keys.arrowLeft, Keys.arrowUp]
    },
    toolbar: {
        next: [Keys.arrowDown],
        previous: [Keys.arrowUp]
    }
};

const RadioKeyProp = "value";

export function InnerRadioGroup(props: InnerRadioGroupProps) {
    const [toolbarProps, isInToolbar] = useToolbarProps();
    const [fieldProps, isInField] = useFieldInputProps();

    const {
        autoFocus,
        children,
        defaultValue,
        disabled,
        forwardedRef,
        gap,
        name,
        onChange,
        orientation = "vertical",
        required,
        reverse,
        validationState,
        value,
        wrap,
        ...rest
    } = mergeProps(
        props,
        toolbarProps,
        omitProps(fieldProps, ["fluid", "size"])
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

    const focusManager = useFocusManager(focusScope, { keyProp: RadioKeyProp });

    useKeyedRovingFocus(focusScope, checkedValue, { keyProp: RadioKeyProp });

    useAutoFocusChild(focusManager, {
        delay: isNumber(autoFocus) ? autoFocus : undefined,
        isDisabled: !autoFocus,
        target: value ?? defaultValue
    });

    const navigationMode = isInToolbar ? "toolbar" : "default";
    const navigationProps = useKeyboardNavigation(focusManager, NavigationKeyBinding[navigationMode], !isInToolbar ? { onSelect: handleArrowSelect } : undefined);

    const { groupProps, itemProps } = useGroupInput({
        cssModule: "o-ui-radio-group",
        disabled,
        gap,
        groupRef,
        isInField,
        orientation,
        required,
        reverse,
        role: "radiogroup",
        validationState,
        wrap
    });

    const handleCheck = useEventCallback((event: SyntheticEvent, newValue: string) => {
        if (!isNil(onChange)) {
            onChange(event, newValue);
        }

        setCheckedValue(newValue);
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
                    checkedValue,
                    onCheck: handleCheck
                }}
            >
                {Children.toArray(children).filter(x => x).map((x: ReactElement, index) => {
                    return augmentElement(x, {
                        ...itemProps,
                        name: groupName,
                        role: "radio",
                        value: index.toString()
                    });
                })}
            </CheckableContext.Provider>
        </Group>
    );
}

export const RadioGroup = forwardRef<any, OmitInternalProps<InnerRadioGroupProps>>((props, ref) => (
    <InnerRadioGroup {...props} forwardedRef={ref} />
));

export type RadioGroupProps = ComponentProps<typeof RadioGroup>;

