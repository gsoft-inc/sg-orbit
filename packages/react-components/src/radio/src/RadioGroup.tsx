import "./RadioGroup.css";

import {
    CheckableContext,
    DomProps,
    Keys,
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
import { Children, ComponentProps, ElementType, ForwardedRef, ReactElement, ReactNode, SyntheticEvent,forwardRef } from "react";
import { Group } from "../../group";
import { useFieldInputProps } from "../../field";
import { useGroupInput } from "../../input";
import { useToolbarProps } from "../../toolbar";

export interface InnerRadioGroupProps extends DomProps{
    /**
     * The value of the radio group.
     */
    value?: string | null;
    /**
     * The initial value of `value`.
     */
    defaultValue?: string;
    /**
     * Whether or not a user input is required before form submission.
     */
    required?: boolean;
    /**
     * Whether the group should display as "valid" or "invalid".
     */
    validationState?: "valid" | "invalid";
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
     * Whether or not the radio group should autoFocus on render.
     */
    autoFocus?: boolean | number;
    /**
     * The orientation of the group elements.
     */
    orientation?: "horizontal" | "vertical";
    /**
     * The space between the group elements.
     */
    gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | string;
    /**
     * Whether the group elements are forced onto one line or can wrap onto multiple lines
     */
    wrap?: boolean;
    /**
     * Invert the order of the radio button and his label.
     */
    reverse?: boolean;
    /**
     * Whether or not the radio group is disabled.
     */
    disabled?: boolean;
    /**
     * @ignore
     */
    as?: ElementType;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * @ignore
     */
    className?: string;
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<any>;
}

const NavigationKeyBinding = {
    default: {
        previous: [Keys.arrowLeft, Keys.arrowUp],
        next: [Keys.arrowRight, Keys.arrowDown],
        first: [Keys.home],
        last: [Keys.end]
    },
    toolbar: {
        previous: [Keys.arrowUp],
        next: [Keys.arrowDown]
    }
};

const RadioKeyProp = "value";

export function InnerRadioGroup(props: InnerRadioGroupProps) {
    const [toolbarProps, isInToolbar] = useToolbarProps();
    const [fieldProps, isInField] = useFieldInputProps();

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
        omitProps(fieldProps, ["fluid", "size"])
    );

    const [checkedValue, setCheckedValue] = useControllableState(value, defaultValue, null);

    const [focusScope, setFocusRef] = useFocusScope();

    const groupRef = useMergedRefs(setFocusRef, forwardedRef);

    const handleArrowSelect = useEventCallback((_event, element) => {
        // When a number value is provided it's converted to a string when a new value is selected using the keyboard arrows.
        const newValue = element.dataset.type === "number"
            ? parseInt(element.value)
            : element.value;

        setCheckedValue(newValue);
    });

    const focusManager = useFocusManager(focusScope, { keyProp: RadioKeyProp });

    useKeyedRovingFocus(focusScope, checkedValue, { keyProp: RadioKeyProp });

    useAutoFocusChild(focusManager, {
        target: value ?? defaultValue,
        isDisabled: !autoFocus,
        delay: isNumber(autoFocus) ? autoFocus : undefined
    });

    const navigationMode = isInToolbar ? "toolbar" : "default";
    const navigationProps = useKeyboardNavigation(focusManager, NavigationKeyBinding[navigationMode], !isInToolbar ? { onSelect: handleArrowSelect } : undefined);

    const { groupProps, itemProps } = useGroupInput({
        cssModule: "o-ui-radio-group",
        role: "radiogroup",
        required,
        validationState,
        orientation,
        gap,
        wrap,
        reverse,
        disabled,
        isInField,
        groupRef
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
                    onCheck: handleCheck,
                    checkedValue
                }}
            >
                {Children.toArray(children).filter(x => x).map((x: ReactElement, index) => {
                    return augmentElement(x, {
                        ...itemProps,
                        value: index.toString(),
                        role: "radio",
                        name: groupName
                    });
                })}
            </CheckableContext.Provider>
        </Group>
    );
}

export const RadioGroup = forwardRef<any, Omit<InnerRadioGroupProps, "forwardedRef">>((props, ref) => (
    <InnerRadioGroup {...props} forwardedRef={ref} />
));

export type RadioGroupProps = ComponentProps<typeof RadioGroup>;

RadioGroup.displayName = "RadioGroup";

