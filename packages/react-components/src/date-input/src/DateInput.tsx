import "./DateInput.css";

import { AbstractInputProps, wrappedInputPropsAdapter } from "../../input";
import { Box, BoxProps } from "../../box";
import { ButtonPresets } from "./ButtonPresets";
import {
    ChangeEvent,
    ComponentProps,
    SyntheticEvent,
    forwardRef,
    useCallback,
    useImperativeHandle,
    useMemo,
    useRef
} from "react";
import { InputGroup, useInputGroupProps } from "../../input-group";
import { MenuPresets } from "./MenuPresets";
import { OmitInternalProps, augmentElement, cssModule, isNil, mergeClasses, mergeProps, useControllableState, useEventCallback } from "../../shared";
import { TextInput } from "../../text-input";
import { areEqualDates, toMidnightDate } from "./dateUtils";
import { useDateInput } from "./useDateInput";

export interface DatePreset {
    date: Date;
    text: string;
}

export interface InnerDateInputProps extends Omit<AbstractInputProps<"input">, "defaultValue" | "max" | "min" | "value"> {
    /**
     * The default value of `value` when uncontrolled.
     */
    defaultValue?: Date;
    /**
     * Whether or not the input take up the width of its container.
     */
    fluid?: boolean;
    /**
     * The maximum (inclusive) date.
     */
    max?: Date;
    /**
     * The minimum (inclusive) date.
     */
    min?: Date;
    /**
     * Called when the date change.
     * @param {ChangeEvent} event - React's original synthetic event.
     * @param {object} date - The new date value.
     * @returns {void}
     */
    onDateChange?: (event: ChangeEvent<HTMLInputElement>, date: Date) => void;
    /**
     * Array of pre-determined dates.
     */
    presets?: DatePreset[];
    /**
     * The presets style to use.
     */
    presetsVariant?: "compact" | "expanded";
    /**
     * A controlled value.
     */
    value?: Date | null;
    /**
     * Additional props to render on the wrapper element.
     */
    wrapperProps?: Partial<BoxProps>;
}

const Input = forwardRef<any, any>((props, ref) => {
    const [inputGroupProps, isInGroup] = useInputGroupProps();

    const {
        className,
        max,
        min,
        onChange,
        onDateChange,
        style,
        value,
        wrapperProps,
        ...rest
    } = mergeProps(
        props,
        wrappedInputPropsAdapter(inputGroupProps)
    );

    const dateProps = useDateInput({
        forwardedRef: ref,
        max,
        min,
        onChange,
        onDateChange,
        value
    });

    return (
        <TextInput
            {...mergeProps(
                rest,
                {
                    wrapperProps: mergeProps(
                        wrapperProps ?? {},
                        {
                            className: mergeClasses(
                                className,
                                cssModule(
                                    "o-ui-date-input",
                                    isInGroup && "in-group"
                                )
                            ),
                            style
                        }
                    )
                },
                dateProps
            )}
        />
    );
});

export function InnerDateInput({
    as,
    defaultValue,
    disabled,
    fluid,
    forwardedRef,
    onDateChange,
    placeholder = "dd/mm/yyyy",
    presets,
    presetsVariant = "compact",
    readOnly,
    value: valueProp,
    wrapperProps,
    ...rest
}: InnerDateInputProps) {
    const [value, setValue] = useControllableState(valueProp, defaultValue, null);

    const containerRef = useRef<HTMLElement>();
    const inputRef = useRef<HTMLInputElement>();

    useImperativeHandle(forwardedRef, () => {
        // For presets, used the group container as the ref element.
        if (!isNil(presets)) {
            const element = containerRef.current;

            element.focus = () => {
                inputRef.current?.focus();
            };

            return element;
        }

        return inputRef.current;
    });

    const applyDate = useCallback((event, newDate) => {
        if (!areEqualDates(value, newDate)) {
            setValue(newDate);

            if (!isNil(onDateChange)) {
                onDateChange(event, newDate);
            }
        }
    }, [onDateChange, value, setValue]);

    const handleDateChange = useEventCallback((event, newDate) => {
        applyDate(event, newDate);
    });

    const handleSelectPreset = useEventCallback((event: SyntheticEvent, newIndex: number) => {
        const preset = presets[newIndex];

        if (!isNil(preset)) {
            applyDate(event, preset.date);
        }
    });

    const presetsProps = useMemo(() => {
        if (!isNil(presets)) {
            const selectedIndex = presets.findIndex(x => areEqualDates(toMidnightDate(x.date), toMidnightDate(value)));

            return {
                onSelectionChange: handleSelectPreset,
                selectedIndex: selectedIndex !== -1 ? selectedIndex : undefined,
                values: presets.map(x => x.text)
            };
        }

        return null;
    }, [presets, value, handleSelectPreset]);

    const inputMarkup = (
        <Input
            {...mergeProps(
                rest,
                {
                    onDateChange: handleDateChange,
                    placeholder,
                    ref: inputRef,
                    value
                }
            )}
        />
    );

    if (!isNil(presetsProps)) {
        return presetsVariant === "compact"
            ?
            (
                <InputGroup
                    {...mergeProps(
                        {
                            as,
                            disabled,
                            fluid,
                            readOnly,
                            ref: containerRef
                        },
                        wrapperProps ?? {}
                    )}
                >
                    {inputMarkup}
                    <MenuPresets {...presetsProps} />
                </InputGroup>
            )
            : (
                <Box
                    {...mergeProps(
                        {
                            as,
                            className: cssModule(
                                "o-ui-date-input-button-presets",
                                fluid && "fluid"
                            ),
                            ref: containerRef
                        },
                        wrapperProps ?? {}
                    )}
                >
                    {inputMarkup}
                    {!disabled && !readOnly && (
                        <ButtonPresets {...presetsProps} />
                    )}
                </Box>
            );
    }

    return augmentElement(inputMarkup, {
        as,
        disabled,
        fluid,
        readOnly,
        wrapperProps
    });
}

export const DateInput = forwardRef<HTMLInputElement, OmitInternalProps<InnerDateInputProps>>((props, ref) => (
    <InnerDateInput {...props} forwardedRef={ref} />
));

export type DateInputProps = ComponentProps<typeof DateInput>;
