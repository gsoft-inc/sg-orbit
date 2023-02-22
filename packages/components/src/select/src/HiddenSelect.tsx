import { HtmlInput } from "../../html";
import { StyledComponentProps, isNil, mergeProps, InternalProps, OmitInternalProps } from "../../shared";
import { ValidationState } from "../../input";
import { ComponentProps, forwardRef } from "react";

const DefaultElement = "input";

export interface InnerHiddenSelectProps extends InternalProps, StyledComponentProps<typeof DefaultElement> {
    /**
     * Whether or not a user input is required before form submission.
     */
    required?: boolean;
    /**
     * A controlled selected key.
     */
    selectedKey?: string;
    /**
     * Whether or not the select should display as "valid" or "invalid".
     */
    validationState?: ValidationState;
}

export function InnerHiddenSelect({ forwardedRef, name, required, selectedKey, validationState, ...rest }: InnerHiddenSelectProps) {
    if (isNil(name)) {
        return null;
    }

    return (
        <HtmlInput
            {...mergeProps(
                rest,
                {
                    "aria-invalid": validationState === "invalid" ? true : undefined,
                    "aria-required": required ? true : undefined,
                    ref: forwardedRef,
                    type: "hidden",
                    value: selectedKey ?? ""
                }
            )}
        />
    );
}

InnerHiddenSelect.defaultElement = DefaultElement;

export const HiddenSelect = forwardRef<any, OmitInternalProps<InnerHiddenSelectProps>>((props, ref) => (
    <InnerHiddenSelect {...props} forwardedRef={ref} />
));

export type ThemeProviderProps = ComponentProps<typeof InnerHiddenSelect>;
