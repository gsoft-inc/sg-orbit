import { Popper } from "./Popper";

export function createPopper({ content, ...props }) {
    return <Popper children={content} {...props} />;
}
