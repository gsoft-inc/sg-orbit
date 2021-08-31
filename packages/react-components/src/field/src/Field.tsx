import "./Field.css";

import { Box } from "../../box";
import { ClearToolbar, useToolbarProps } from "../../toolbar";
import { ComponentProps, ReactNode, forwardRef } from "react";
import { FieldContext } from "./FieldContext";
import { InternalProps, OmitInternalProps, OrbitComponentProps, mergeProps } from "../../shared";
import { useField } from "./useField";
import { useFormField } from "../../form";

const DefaultElement = "div";

export interface InnerFieldProps extends InternalProps, OrbitComponentProps<typeof DefaultElement> {
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
    validationState?: "valid" | "invalid";
}

export function InnerField(props: InnerFieldProps) {
    const [formProps] = useFormField();
    const [toolbarProps] = useToolbarProps();

    const {
        id,
        validationState,
        required,
        fluid,
        disabled,
        as = DefaultElement,
        className,
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        formProps,
        toolbarProps
    );

    const { fieldProps, fieldContext } = useField({
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
