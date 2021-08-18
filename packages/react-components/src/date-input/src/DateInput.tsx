import "./DateInput.css";

import {
    AriaLabelingProps,
    InteractionStatesProps,
    augmentElement,
    cssModule,
    isNil,
    mergeClasses,
    mergeProps,
    useControllableState,
    useEventCallback
} from "../../shared";
import { Box, BoxProps as BoxPropsForDocumentation } from "../../box";
import { ButtonPresets } from "./ButtonPresets";
import {
    CSSProperties,
    ChangeEvent,
    ChangeEventHandler,
    ComponentProps,
    ElementType,
    ForwardedRef,
    SyntheticEvent,
    forwardRef,
    useCallback,
    useImperativeHandle,
    useMemo,
    useRef
} from "react";
import { InputGroup, useInputGroupProps } from "../../input-group";
import { MenuPresets } from "./MenuPresets";
import { TextInput } from "../../text-input";
import { areEqualDates, toMidnightDate } from "./date-utils";
import { useDateInput } from "./useDateInput";
import { wrappedInputPropsAdapter } from "../../input";

// Used to generate BoxProps instead of any in the auto-generated documentation
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BoxProps extends BoxPropsForDocumentation { }

export interface DatePreset {
    text: string;
    date: Date;
}

export interface InnerDateInputProps extends InteractionStatesProps, AriaLabelingProps, Omit<ComponentProps<"input">, "autoFocus" | "defaultValue" | "max" | "min" | "value"> {
    /**
     * A controlled value.
     */
    value?: Date | null;
    /**
     * The default value of `value` when uncontrolled.
     */
    defaultValue?: Date;
    /**
     * Temporary text that occupies the input when it is empty.
     */
    placeholder?: string;
    /**
     * The minimum (inclusive) date.
     */
    min?: Date;
    /**
     * The maximum (inclusive) date.
     */
    max?: Date;
    /**
     * Whether or not a user input is required before form submission.
     */
    required?: boolean;
    /**
     * Whether or not the input should display as "valid" or "invalid".
     */
    validationState?: "valid" | "invalid";
    /**
     * @ignore
     */
    onChange?: ChangeEventHandler;
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
     * Whether or not the input should autofocus on render.
     */
    autoFocus?: boolean | number;
    /**
     * Whether or not the input take up the width of its container.
     */
    fluid?: boolean;
    /**
     * Additional props to render on the wrapper element.
     */
    wrapperProps?: Partial<BoxProps>;
    /**
     * @ignore
     */
    disabled?: boolean;
    /**
     * Whether or not the input is readonly.
     */
    readOnly?: boolean;
    /**
     * @ignore
     */
    className?: string;
    /**
     * @ignore
     */
    style?: CSSProperties;
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
    * @ignore
    */
    forwardedRef: ForwardedRef<any>;
}

const Input = forwardRef<any, any>((props, ref) => {
    const [inputGroupProps, isInGroup] = useInputGroupProps();

    const {
        value,
        min,
        max,
        onChange,
        onDateChange,
        wrapperProps,
        className,
        style,
        ...rest
    } = mergeProps(
        props,
        wrappedInputPropsAdapter(inputGroupProps)
    );

    const dateProps = useDateInput({
        value,
        min,
        max,
        onChange,
        onDateChange,
        forwardedRef: ref
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
    value: valueProp,
    defaultValue,
    placeholder = "dd/mm/yyyy",
    onDateChange,
    presets,
    presetsVariant = "compact",
    fluid,
    wrapperProps,
    disabled,
    readOnly,
    className,
    style,
    as,
    forwardedRef,
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
                values: presets.map(x => x.text),
                selectedIndex: selectedIndex !== -1 ? selectedIndex : undefined,
                onSelectionChange: handleSelectPreset
            };
        }

        return null;
    }, [presets, value, handleSelectPreset]);

    const inputMarkup = (
        <Input
            {...mergeProps(
                rest,
                {
                    value,
                    placeholder,
                    onDateChange: handleDateChange,
                    ref: inputRef
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
                            disabled,
                            readOnly,
                            fluid,
                            className,
                            style,
                            as,
                            ref: containerRef
                        } as const,
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
                            className: mergeClasses(
                                className,
                                cssModule(
                                    "o-ui-date-input-button-presets",
                                    fluid && "fluid"
                                )
                            ),
                            style,
                            as,
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

    // A fragment is wrapping the result to make this component work with react-docgen: https://github.com/reactjs/react-docgen/issues/336
    return (
        <>
            {augmentElement(inputMarkup, {
                disabled,
                readOnly,
                wrapperProps,
                fluid,
                className,
                style,
                as
            })}
        </>
    );
}

export const DateInput = forwardRef<HTMLInputElement, Omit<InnerDateInputProps, "forwardedRef">>((props, ref) => (
    <InnerDateInput {...props} forwardedRef={ref} />
));

export type DateInputProps = ComponentProps<typeof DateInput>;

DateInput.displayName = "DateInput";
