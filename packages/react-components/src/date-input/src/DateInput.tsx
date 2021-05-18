import "./DateInput.css";

import { BoxProps as BoxPropsForDocumentation } from "../../box";
import { CalendarIcon } from "../../icons";
import { ChangeEvent, ComponentProps, ElementType, ForwardedRef } from "react";
import { TextInput } from "../../text-input";
import { forwardRef, mergeProps } from "../../shared";
import { useDateInput } from "./useDateInput";

// used to generate BoxProps instead of any in the auto-generated documentation
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BoxProps extends BoxPropsForDocumentation { }

export interface InnerDateInputProps {
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
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    /**
     * Called when the date change.
     * @param {ChangeEvent} event - React's original synthetic event.
     * @param {object} date - The new date value.
     * @returns {void}
     */
    onDateChange?: (event: ChangeEvent<HTMLInputElement>, date: Date) => void;
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
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
    * @ignore
    */
    forwardedRef: ForwardedRef<any>;
}

export function InnerDateInput({
    value,
    defaultValue,
    placeholder = "dd/mm/yyyy",
    min,
    max,
    onChange,
    onDateChange,
    wrapperProps,
    as = "input",
    forwardedRef,
    ...rest
}: InnerDateInputProps) {

    const dateProps = useDateInput({
        value,
        defaultValue,
        min,
        max,
        onChange,
        onDateChange,
        forwardedRef
    });

    return (
        <TextInput
            {...mergeProps(
                rest,
                {
                    placeholder,
                    icon: <CalendarIcon />,
                    wrapperProps: mergeProps(
                        wrapperProps ?? {},
                        {
                            className: "o-ui-date-input"
                        }
                    ),
                    as
                },
                dateProps
            )}
        />
    );
}

export const DateInput = forwardRef<InnerDateInputProps, "input">((props, ref) => (
    <InnerDateInput {...props} forwardedRef={ref} />
));

export type DateInputProps = ComponentProps<typeof DateInput>;

DateInput.displayName = "DateInput";
