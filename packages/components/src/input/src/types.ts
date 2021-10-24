import { AbstractGroupProps } from "../../group";
import { ElementType, SyntheticEvent } from "react";
import { InteractionProps, InternalProps, StyledComponentProps } from "../../shared";

export type ValidationState = "valid" | "invalid";

export type AbstractInputProps<T extends ElementType> = InternalProps & InteractionProps & Omit<StyledComponentProps<T>, "autoFocus" | "type"> & {
    /**
    * Whether or not the input should autoFocus on render.
    */
    autoFocus?: boolean | number;
    /**
     * Whether or not a user input is required before form submission.
     */
    required?: boolean;
    /**
     * Whether or not the input should display as "valid" or "invalid".
     */
    validationState?: ValidationState;
};

export type AbstractGroupInputProps<T extends ElementType, V> = Omit<AbstractGroupProps<T>, "onChange"> & {
    /**
     * Whether or not the first input of the group should autoFocus on render.
     */
    autoFocus?: boolean | number;
    /**
     * The initial value of `value`.
     */
    defaultValue?: V;
    /**
     * Whether or not the inputs of the group are disabled.
     */
    disabled?: boolean;
    /**
     * Called when an input of the group change.
     * @param {SyntheticEvent} event - React's original event.
     * @param {V} value - The new value.
     * @returns {void}
     */
    onChange?: (event: SyntheticEvent, value: V) => void;
    /**
     * Whether a user input is required before form submission.
     */
    required?: boolean;
    /**
     * Whether the group should display as "valid" or "invalid".
     */
    validationState?: ValidationState;
    /**
     * The value of the group.
     */
    value?: V | null;
};
