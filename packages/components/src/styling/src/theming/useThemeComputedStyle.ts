import { RefObject, useMemo } from "react";
import { isNil } from "../../../shared";

export function toPixelValue(value: string) {
    if (value.endsWith("rem")) {
        return (parseFloat(value) * parseFloat(getComputedStyle(document.documentElement).fontSize)).toString();
    }

    return value;
}

export class ThemeComputedStyle {
    private componentRef: RefObject<Element>;

    constructor(componentRef: RefObject<Element>) {
        this.componentRef = componentRef;
    }

    private getThemeElement() {
        const themeElement = this.componentRef.current.closest(".o-ui");

        if (isNil(themeElement)) {
            throw new Error("Cannot find a theme element, did you defined a ThemeProvider?");
        }

        return themeElement;
    }

    getPropertyValue(name: string) {
        return window.getComputedStyle(this.getThemeElement()).getPropertyValue(name);
    }

    getSpacingValue(name: string) {
        return toPixelValue(this.getPropertyValue(name));
    }
}

export function useThemeComputedStyle(componentRef: RefObject<Element>) {
    return useMemo(() => {
        return new ThemeComputedStyle(componentRef);
    }, [componentRef]);
}
