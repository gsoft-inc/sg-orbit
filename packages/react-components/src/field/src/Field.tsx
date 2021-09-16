import "./Field.css";

import { Box } from "../../box";
import { ClearToolbar, useToolbarProps } from "../../toolbar";
import { ComponentProps, ReactNode, forwardRef } from "react";
import { FieldContext } from "./FieldContext";
import { HtmlElements } from "../../html";
import { InternalProps, OmitInternalProps, StyledComponentProps, mergeProps } from "../../shared";
import { ValidationState } from "../../input";
import { useField } from "./useField";
import { useFormField } from "../../form";

const DefaultElement = "div";

export interface InnerFieldProps extends InternalProps, StyledComponentProps<typeof DefaultElement> {
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * Whether or not the field take up the width of its container.
     */
    fluid?: boolean;
    /**
     * Whether or not the field show a required state.
     */
    required?: boolean;
    /**
     * Whether the field should display as "valid" or "invalid".
     */
    validationState?: ValidationState;
}

export function InnerField(props: InnerFieldProps) {
    const [formProps] = useFormField();
    const [toolbarProps] = useToolbarProps();

    const {
        as = HtmlElements[DefaultElement],
        children,
        className,
        disabled,
        fluid,
        forwardedRef,
        id,
        required,
        validationState,
        ...rest
    } = mergeProps(
        props,
        formProps,
        toolbarProps
    );

    const { fieldContext, fieldProps } = useField({
        className,
        disabled,
        fluid,
        forwardedRef,
        id,
        required,
        validationState
    });

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    as
                },
                fieldProps
            )}
        >
            <ClearToolbar>
                <FieldContext.Provider value={fieldContext}>
                    {children}
                </FieldContext.Provider>
            </ClearToolbar>
        </Box>
    );
}

export const Field = forwardRef<any, OmitInternalProps<InnerFieldProps>>((props, ref) => (
    <InnerField {...props} forwardedRef={ref} />
));

export type FieldProps = ComponentProps<typeof Field>;
