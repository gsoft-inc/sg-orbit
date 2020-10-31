import { omitProps } from "../../shared";
import { useFormContext } from "./FormContext";

export function useFormButton() {
    const [context, isInForm] = useFormContext();

    return [
        omitProps(context, ["fluid"]),
        isInForm
    ];
}
