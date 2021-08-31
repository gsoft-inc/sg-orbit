import "./Form.css";

import { Box } from "../../box";
import { ComponentProps, ReactNode, forwardRef } from "react";
import { FormContext } from "./FormContext";
import { InternalProps, OmitInternalProps, OrbitComponentProps, cssModule, mergeProps } from "../../shared";

const DefaultElement = "form";

export interface InnerFormProps extends InternalProps, OrbitComponentProps<typeof DefaultElement> {
    /**
     * React children.
     */
    children: ReactNode;
    /**
    * @ignore
     */
    disabled?: boolean;
    /**
     * Whether or not the form take up the width of its container.
     */
    fluid?: boolean;
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
