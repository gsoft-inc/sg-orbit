import "./RadioGroup.css";

import { AbstractGroupInputProps, useGroupInput } from "../../input";
import {
    CheckableContext,
    Keys,
    OmitInternalProps,
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
import { Children, ComponentProps, ReactElement, SyntheticEvent, forwardRef } from "react";
import { Group } from "../../group";
import { useFieldInputProps } from "../../field";
import { useToolbarProps } from "../../toolbar";

const DefaultElement = "div";

export interface InnerRadioGroupProps extends AbstractGroupInputProps<typeof DefaultElement, string> {
    /**
      * Radio group name.
      */
    name?: string;
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
        as = DefaultElement,
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
        wrap = true,
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
                {
                    as
                },
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
