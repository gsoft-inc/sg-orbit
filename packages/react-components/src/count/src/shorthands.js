import { Count } from "./count";

export function createCount({ content, ...props }) {
    return <Count {...props}>{content}</Count>;
}
