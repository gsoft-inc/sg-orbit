import "./Form.css";

import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, ReactNode, forwardRef } from "react";
import { FormContext } from "./FormContext";
import { cssModule, mergeProps } from "../../shared";

export interface InnerFormProps {
    /**
     * Whether or not the form take up the width of its container.
     */
    fluid?: boolean;
    /**
    * @ignore
     */
    disabled?: boolean;
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

export function InnerForm(props: InnerFormProps) {
    const {
        fluid,
        disabled,
        as = "form",
        children,
        forwardedRef,
        ...rest
    } = props;

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    className: cssModule(
                        "o-ui-form",
                        fluid && "fluid"
                    ),
                    as,
                    ref: forwardedRef
                }
            )}
        >
            <FormContext.Provider
                value={{
                    fluid,
                    disabled
                }}
            >
                {children}
            </FormContext.Provider>
        </Box>
    );
}

export const Form = forwardRef<any, Omit<InnerFormProps, "forwardedRef">>((props, ref) => (
    <InnerForm {...props} forwardedRef={ref} />
));

export type FormProps = ComponentProps<typeof Form>;

Form.displayName = "Form";
