import "./Form.css";

import { Box } from "../../box";
import { ComponentProps, ReactNode, forwardRef } from "react";
import { FormContext } from "./FormContext";
import { InternalProps, OmitInternalProps, StyledComponentProps, cssModule, mergeProps } from "../../shared";

const DefaultElement = "form";

export interface InnerFormProps extends InternalProps, StyledComponentProps<typeof DefaultElement> {
    /**
     * React children.
     */
    children: ReactNode;
    /**
    * Whether or not the form elements are disabled.
     */
    disabled?: boolean;
    /**
     * Whether or not the form take up the width of its container.
     */
    fluid?: boolean;
}

export function InnerForm(props: InnerFormProps) {
    const {
        as = DefaultElement,
        children,
        disabled,
        fluid,
        forwardedRef,
        ...rest
    } = props;

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    as,
                    className: cssModule(
                        "o-ui-form",
                        fluid && "fluid"
                    ),
                    ref: forwardedRef
                }
            )}
        >
            <FormContext.Provider
                value={{
                    disabled,
                    fluid
                }}
            >
                {children}
            </FormContext.Provider>
        </Box>
    );
}

export const Form = forwardRef<any, OmitInternalProps<InnerFormProps>>((props, ref) => (
    <InnerForm {...props} forwardedRef={ref} />
));

export type FormProps = ComponentProps<typeof Form>;
