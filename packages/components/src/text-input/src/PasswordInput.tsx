import { AbstractTextInputProps, TextInput } from "./TextInput";
import { useState, ChangeEvent, ComponentProps, forwardRef } from "react";
import { EyeMajorIcon, EyeSlashMajorIcon } from "../../icons";
import { OmitInternalProps, mergeProps, useControllableState, useEventCallback } from "../../shared";

import { IconButton } from "../../button";
import { useInputGroupTextInputProps } from "../../input-group";

const DefaultElement = "input";

export type InnerPasswordInputProps = AbstractTextInputProps<typeof DefaultElement>;

export function InnerPasswordInput(props: InnerPasswordInputProps) {
    const [inputGroupProps] = useInputGroupTextInputProps();

    const {
        as = DefaultElement,
        defaultValue,
        forwardedRef,
        value,
        wrapperProps,
        ...rest
    } = mergeProps(
        props,
        inputGroupProps
    );

    const [inputValue, setValue] = useControllableState(value, defaultValue, "");
    const [isHidden, setIsHidden] = useState(true);

    const handleChange = useEventCallback((event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    });

    const handleShowValue = useEventCallback(() => {
        setIsHidden(x => !x);
    });

    // Always show the button to play nice with password managers.
    const showButtonMarkup = (
        <IconButton
            aria-label="Toggle password visibility"
            className="o-ui-password-input-show-button"
            onClick={handleShowValue}
            title="Toggle password visibility"
            variant="tertiary"
        >
            {isHidden ? <EyeMajorIcon /> : <EyeSlashMajorIcon />}
        </IconButton>
    );

    return (
        <TextInput
            {...mergeProps(
                rest,
                {
                    as,
                    button: showButtonMarkup,
                    onChange: handleChange,
                    ref: forwardedRef,
                    type: isHidden ? "password" as const : "text" as const,
                    value: inputValue,
                    wrapperProps: mergeProps(wrapperProps ?? {}, {
                        className: "o-ui-password-input"
                    })
                }
            )}
        />
    );
}

InnerPasswordInput.defaultElement = DefaultElement;

export const PasswordInput = forwardRef<HTMLInputElement, OmitInternalProps<InnerPasswordInputProps>>((props, ref) => (
    <InnerPasswordInput {...props} forwardedRef={ref} />
));

export type PasswordInputProps = ComponentProps<typeof PasswordInput>;
