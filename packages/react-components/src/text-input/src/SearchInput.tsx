import "./SearchInput.css";

import { BoxProps as BoxPropsForDocumentation } from "../../box";
import { ChangeEvent, ChangeEventHandler, ComponentProps, KeyboardEvent, KeyboardEventHandler, ReactElement, SyntheticEvent, forwardRef, useCallback } from "react";
import { CrossButton } from "../../button";
import { InteractionStatesProps, InternalProps, Keys, OmitForwardedRefProp, isNil, isNilOrEmpty, isUndefined, mergeProps, useChainedEventCallback, useControllableState, useEventCallback, useMergedRefs } from "../../shared";
import { MagnifierIcon } from "../../icons";
import { TextInput } from "../../text-input";
import { useInputGroupTextInputProps } from "../../input-group";
import { wrappedInputPropsAdapter } from "../../input";

// Used to generate BoxProps instead of any in the auto-generated documentation
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BoxProps extends BoxPropsForDocumentation { }

const DefaultElement = "input";

export interface InnerSearchInputProps extends InternalProps, InteractionStatesProps, Omit<ComponentProps<typeof DefaultElement>, "autoFocus"> {
    /**
     * A controlled value.
     */
    value?: string | null;
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
     * @param {SyntheticEvent} event - React's original event.
     * @param {string} value - The new input value.
     * @returns {void}
     */
    onValueChange?: (event: SyntheticEvent, value: string) => void;
    /**
     * @ignore
     */
    onChange?: ChangeEventHandler;
    /**
     * @ignore
     */
    onKeyDown?: KeyboardEventHandler;
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
}

export function InnerSearchInput(props: InnerSearchInputProps) {
    const [inputGroupProps] = useInputGroupTextInputProps();

    const {
        value,
        defaultValue,
        onChange,
        onValueChange,
        onKeyDown,
        icon,
        wrapperProps,
        as = DefaultElement,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        wrappedInputPropsAdapter(inputGroupProps)
    );

    const [inputValue, setValue] = useControllableState(value, defaultValue, "");

    const inputRef = useMergedRefs(forwardedRef);

    const updateValue = useCallback((event: SyntheticEvent, newValue: string) => {
        setValue(newValue);

        if (!isNil(onValueChange)) {
            onValueChange(event, newValue);
        }
    }, [onValueChange, setValue]);

    const clear = useCallback((event: SyntheticEvent) => {
        updateValue(event, "");
    }, [updateValue]);

    const handleChange = useChainedEventCallback(onChange, (event: ChangeEvent<HTMLInputElement>) => {
        updateValue(event, event.target.value);
    });

    const handleKeyDown = useEventCallback((event: KeyboardEvent<HTMLInputElement>) => {
        if (!isNil(onKeyDown)) {
            onKeyDown(event);
        }

        // Can't change for now otherwise Autocomplete will break.
        if (!event.isPropagationStopped()) {
            if (event.key === Keys.esc) {
                event.preventDefault();
                clear(event);
            }
        }
    });

    const handleClear = useEventCallback((event: SyntheticEvent) => {
        clear(event);

        inputRef.current.focus();
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
            {...mergeProps(
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
                    ref: inputRef
                } as const
            )}
        />
    );
}

export const SearchInput = forwardRef<HTMLInputElement, OmitForwardedRefProp<InnerSearchInputProps>>((props, ref) => (
    <InnerSearchInput {...props} forwardedRef={ref} />
));

export type SearchInputProps = ComponentProps<typeof SearchInput>;

SearchInput.displayName = "SearchInput";
