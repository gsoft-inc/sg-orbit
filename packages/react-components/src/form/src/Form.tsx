import "./Form.css";

import { Box } from "../../box";
import { ComponentProps, ReactNode, forwardRef } from "react";
import { FormContext } from "./FormContext";
import { InternalProps, OmitInternalProps, StyledComponentProps, cssModule, mergeProps } from "../../shared";
import { ResponsiveProp, useResponsiveValue } from "../../styling";

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
    fluid?: ResponsiveProp<boolean>;
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

    const fluidValue = useResponsiveValue(fluid);

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    as,
                    className: cssModule(
                        "o-ui-form",
                        fluidValue && "fluid"
                    ),
                    ref: forwardedRef
                }
            )}
        >
            <FormContext.Provider
                value={{
                    disabled,
                    fluid: fluidValue
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
