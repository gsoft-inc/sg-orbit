import { isNilOrEmpty } from "./assertion";

// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
export enum Keys {
    arrowDown = "ArrowDown",
    arrowLeft = "ArrowLeft",
    arrowRight = "ArrowRight",
    arrowUp = "ArrowUp",
    backspace = "Backspace",
    delete = "Delete",
    enter = "Enter",
    end = "End",
    esc = "Escape",
    home = "Home",
    tab = "Tab",
    space = " "
}

export function appendEventKey(str: string, key: string) {
    switch (key) {
        case Keys.backspace:
            // Backspace is already handled by browser.
            return str;
        case Keys.delete:
            return !isNilOrEmpty(str) ? str.slice(0, -1) : str;
        default:
            return `${str}${key}`;
    }
}
