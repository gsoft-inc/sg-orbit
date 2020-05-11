import { Popper } from "./popper";

export function createPopperFromShorthand({ content, ...props }) {
    return <Popper children={content} {...props} />;
}
