import "./SearchInput.css";

import { BoxProps as BoxPropsForDocumentation } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, ReactElement, SyntheticEvent, useCallback } from "react";
import { CrossButton } from "../../button";
import { InteractionStatesProps, Keys, forwardRef, isNilOrEmpty, mergeProps, useControllableState, useEventCallback } from "../../shared";
import { MagnifierIcon } from "../../icons";
import { TextInput } from "../../text-input";
import { TextInputProps } from "./TextInput";
import { isNil, isUndefined } from "lodash";

// used to generate BoxProps instead of any in the auto-generated documentation
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BoxProps extends BoxPropsForDocumentation { }

export interface InnerSearchInputProps extends InteractionStatesProps {
    /**
     * A controlled value.
     */
    value?: string;
    /**
     * The default value of `value` when uncontrolled.
     */
    defaultValue?: string;
    /**
     * Temporary text that occupies the input when it is empty.
     */
    placeholder?: string;
    /**
     * Whether or not a user input is required before form submission.
     */
    required?: boolean;
    /**
     * Whether or not the input should display as "valid" or "invalid".
     */
    validationState?: "valid" | "invalid";
    /**
     * Called when the input value change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {string} value - The new input value.
     * @returns {void}
     */
    onChange?(event: SyntheticEvent, value: string): void;
    /**
     * @ignore
     */
    onKeyDown?(event: SyntheticEvent): void;
    /**
     * Whether or not the input should autofocus on render.
     */
    autoFocus?: boolean | number;
    /**
     * [Icon](/?path=/docs/icon--default-story) component rendered before the value.
     */
    icon?: ReactElement;
    /**
     * Whether or not the input take up the width of its container.
     */
    fluid?: boolean;
    /**
     * Whether or not to render a loader.
     */
    loading?: boolean;
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

export function InnerSearchInput({
    value,
    defaultValue,
    onChange,
    onKeyDown,
    icon,
    wrapperProps,
    as = "input",
    forwardedRef,
    ...rest
}: InnerSearchInputProps) {
    const [inputValue, setValue] = useControllableState(value, defaultValue, "");

    const updateValue = useCallback((event, newValue) => {
        if (!isNil(onChange)) {
            onChange(event, newValue);
        }

        setValue(newValue);
    }, [onChange, setValue]);

    const clear = useCallback(event => {
        updateValue(event, "");
    }, [updateValue]);

    const handleChange = useEventCallback(event => {
        updateValue(event, event.target.value);
    });

    const handleKeyDown = useEventCallback(event => {
        if (!isNil(onKeyDown)) {
            onKeyDown(event);
        }

        if (!event.isPropagationStopped()) {
            if (event.key === Keys.esc) {
                event.preventDefault();
                clear(event);
            }
        }
    });

    const handleClear = useEventCallback(event => {
        clear(event);
    });

    const clearButtonMarkup = !isNilOrEmpty(inputValue) && (
        <CrossButton
            onClick={handleClear}
            size="xs"
            condensed
            className="o-ui-search-input-clear-button"
            title="Clear value"
            aria-label="Clear value"
        />
    );

    return (
        <TextInput
            {...mergeProps<Partial<TextInputProps>[]>(
                rest,
                {
                    value: inputValue,
                    button: clearButtonMarkup || undefined,
                    onChange: handleChange,
                    onKeyDown: handleKeyDown,
                    icon: isUndefined(icon) ? <MagnifierIcon /> : icon,
                    wrapperProps: mergeProps(wrapperProps ?? {}, {
                        className: "o-ui-search-input"
                    }),
                    type: "search",
                    autoCorrect: "off",
                    spellCheck: "false",
                    autoComplete: "off",
                    as,
                    ref: forwardedRef
                }
            )}
        />
    );
}

export const SearchInput = forwardRef<InnerSearchInputProps, "input">((props, ref) => (
    <InnerSearchInput {...props} forwardedRef={ref} />
));

export type SearchInputProps = ComponentProps<typeof SearchInput>

SearchInput.displayName = "SearchInput";
