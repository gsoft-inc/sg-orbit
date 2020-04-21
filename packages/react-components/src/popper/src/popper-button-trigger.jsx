import { PopperTrigger } from "./popper-trigger";

export function PopperButtonTrigger({ button, ...rest }) {
    return (
        <PopperTrigger
            {...rest}
            trigger={button}
            toggleHandler="onClick"
        />
    );
}
