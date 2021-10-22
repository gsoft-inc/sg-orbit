import { RefObject } from "react";

export function isDevToolsBlurEvent(rootRef: RefObject<HTMLElement>) {
    // This is a fix to prevent an overlay from closing when the dev tools opens.
    // Opening the dev tools will cause a blur event since the overlay lose the focus in favor of the dev tools.
    // To prevent the overlay from closing we leverage the fact that opening the dev tools doesn't update document.activeElement.
    return rootRef.current?.contains(document.activeElement);
}
