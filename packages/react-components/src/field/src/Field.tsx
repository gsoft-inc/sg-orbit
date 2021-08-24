import "./Field.css";

import { Box } from "../../box";
import { ClearToolbar, useToolbarProps } from "../../toolbar";
import { ComponentProps, ElementType, ForwardedRef, ReactNode, forwardRef } from "react";
import { DomProps, mergeProps } from "../../shared";
import { FieldContext } from "./FieldContext";
import { useField } from "./useField";
import { useFormField } from "../../form";

const DefaultElement = "div";

export interface InnerFieldProps extends DomProps, ComponentProps<typeof DefaultElement> {
    /**
     * Whether the field should display as "valid" or "invalid".
     */
    validationState?: "valid" | "invalid";
    /**
     * Whether or not the field show a required state.
     */
    required?: boolean;
    /**
     * Whether or not the field take up the width of its container.
     */
    fluid?: boolean;
    /**
     * @ignore
     */
    as?: ElementType;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<any>;
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
        id,
        validationState,
        required,
        fluid,
        disabled,
        className,
        forwardedRef
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

export const Field = forwardRef<any, Omit<InnerFieldProps, "forwardedRef">>((props, ref) => (
    <InnerField {...props} forwardedRef={ref} />
));

export type FieldProps = ComponentProps<typeof Field>;

Field.displayName = "Field";
