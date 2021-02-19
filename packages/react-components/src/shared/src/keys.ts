export enum Keys {
    backspace = 8,
    tab = 9,
    enter = 13,
    esc = 27,
    space = 32,
    end = 35,
    home = 36,
    left = 37,
    up = 38,
    right = 39,
    down = 40,
    delete = 46
}

export function isAlphanumeric(keyCode: number): boolean {
    return (keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90);
}

export function isTyping(keyCode: number): boolean {
    return isAlphanumeric(keyCode)
        || keyCode === Keys.space
        || keyCode === Keys.backspace;
}
