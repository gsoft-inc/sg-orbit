import { PopperTrigger } from "./popper-trigger";

// TODO:
//  - support button shorthand

export function PopperButtonTrigger({ button, ...rest }) {
    return (
        <PopperTrigger
            {...rest}
            trigger={button}
            toggleHandler="onClick"
        />
    );
}
