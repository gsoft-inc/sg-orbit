import "./Field.css";

import { Box } from "../../box";
import { ClearToolbar, useToolbarProps } from "../../toolbar";
import { ComponentProps, ElementType, ForwardedRef, ReactNode } from "react";
import { DomProps, forwardRef, mergeProps } from "../../shared";
import { FieldContext } from "./FieldContext";
import { useField } from "./useField";
import { useFormField } from "../../form";

interface InnerGroupFieldProps extends DomProps {
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
     * A field can vary in size.
     */
    size?: "sm" | "md";
    /**
     * An HTML element type or a custom React element type to render as.
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

export function InnerGroupField(props: InnerGroupFieldProps) {
    const [formProps] = useFormField();
    const [toolbarProps] = useToolbarProps();

    const {
        id,
        validationState,
        required,
        fluid,
        size,
        disabled,
        as = "div",
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
        size,
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
                <FieldContext.Provider
                    value={{
                        ...fieldContext,
                        isGroup: true
                    }}
                >
                    {children}
                </FieldContext.Provider>
            </ClearToolbar>
        </Box>
    );
}

export const GroupField = forwardRef<InnerGroupFieldProps>((props, ref) => (
    <InnerGroupField {...props} forwardedRef={ref} />
));

export type GroupFieldProps = ComponentProps<typeof GroupField>;

GroupField.displayName = "GroupField";
