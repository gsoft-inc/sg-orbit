import { PopperTrigger } from "./popper-trigger";

export function PopperTextInputTrigger({ input, ...rest }) {
    return (
        <PopperTrigger
            {...rest}
            trigger={input}
            toggleHandler="onClick"
        />
    );
}
