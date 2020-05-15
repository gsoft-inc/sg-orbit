import { Popper } from "./popper";

export function createPopper({ content, ...props }) {
    return <Popper children={content} {...props} />;
}
