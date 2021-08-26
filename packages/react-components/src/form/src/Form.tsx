import "./Form.css";

import { Box } from "../../box";
import { ComponentProps, ReactNode, forwardRef } from "react";
import { FormContext } from "./FormContext";
import { InternalProps, OmitForwardedRefProp, cssModule, mergeProps } from "../../shared";

const DefaultElement = "form";

export interface InnerFormProps extends InternalProps, ComponentProps<typeof DefaultElement> {
    /**
     * Whether or not the form take up the width of its container.
     */
    fluid?: boolean;
    /**
    * @ignore
     */
    disabled?: boolean;
    /**
     * React children.
     */
    children: ReactNode;
}

export function InnerForm(props: InnerFormProps) {
    const {
        fluid,
        disabled,
        as = DefaultElement,
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

export const Form = forwardRef<any, OmitForwardedRefProp<InnerFormProps>>((props, ref) => (
    <InnerForm {...props} forwardedRef={ref} />
));

export type FormProps = ComponentProps<typeof Form>;

Form.displayName = "Form";
