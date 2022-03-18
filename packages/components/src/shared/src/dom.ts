import { isNil } from "./assertions";

export function canUseDOM(): boolean {
    return (
        typeof window !== "undefined" &&
        !isNil(window.document) &&
        !isNil(window.document.createElement)
    );
}

export const isBrowser = canUseDOM();

export function getBodyElement() {
    return isBrowser ? document.body : undefined;
}
