import { FormContextType, useFormContext } from "./FormContext";
import { omitProps } from "../../shared";

export type FormButtonProps = Omit<FormContextType, "fluid">;

export function useFormButton(): [FormButtonProps, boolean] {
    const [context, isInForm] = useFormContext();

    return [
        omitProps(context, ["fluid"]),
        isInForm
    ];
}
