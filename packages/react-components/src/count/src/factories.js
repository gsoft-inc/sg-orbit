import { Count } from "./count";

export function createCountFromShorthand({ content, ...props }) {
    return <Count {...props}>{content}</Count>;
}
