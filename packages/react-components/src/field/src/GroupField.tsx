import "./Field.css";

import { Box } from "../../box";
import { ClearToolbar, useToolbarProps } from "../../toolbar";
import { ComponentProps, ReactNode, forwardRef } from "react";
import { FieldContext } from "./FieldContext";
import { HtmlElements } from "../../html";
import { InternalProps, OmitInternalProps, StyledComponentProps, mergeProps } from "../../shared";
import { ValidationState } from "../../input";
import { useFormField } from "../../form";
import { useGroupField } from "./useGroupField";

const DefaultElement = "div";

export interface InnerGroupFieldProps extends InternalProps, StyledComponentProps<typeof DefaultElement> {
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

export function InnerGroupField(props: InnerGroupFieldProps) {
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

    const { fieldContext, fieldProps } = useGroupField({
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

export const GroupField = forwardRef<any, OmitInternalProps<InnerGroupFieldProps>>((props, ref) => (
    <InnerGroupField {...props} forwardedRef={ref} />
));

export type GroupFieldProps = ComponentProps<typeof GroupField>;
