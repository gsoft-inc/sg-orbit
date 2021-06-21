import { RefObject, useMemo } from "react";
import { isNil, isNilOrEmpty } from "../../shared";

export class ThemeComputedStyle {
    private componentRef: RefObject<Element>;

    constructor(componentRef: RefObject<Element>) {
        this.componentRef = componentRef;
    }

    private getThemeElement() {
        const themeElement = this.componentRef.current.closest(".o-ui");

        if (isNil(themeElement)) {
            throw new Error("Cannot find a theme element, did you defined a ThemeProvider.");
        }

        return themeElement;
    }

    private toPixelValue(value: string) {
        if (value.endsWith("rem")) {
            return (parseFloat(value) * parseFloat(getComputedStyle(document.documentElement).fontSize)).toString();
        }

        return value;
    }

    getPropertyValue(name: string) {
        return window.getComputedStyle(this.getThemeElement()).getPropertyValue(name);
    }

    getRequiredPropertyValue(name: string) {
        const value = this.getPropertyValue(name);

        if (isNilOrEmpty(value)) {
            throw new Error(`Cannot find required CSS property "${name}"`);
        }

        return value;
    }

    getSpacingValue(name: string) {
        return this.toPixelValue(this.getPropertyValue(name));
    }

    getRequiredSpacingValue(name: string) {
        return this.toPixelValue(this.getRequiredPropertyValue(name));
    }
}

export function useThemeComputedStyle(componentRef: RefObject<Element>) {
    return useMemo(() => {
        return new ThemeComputedStyle(componentRef);
    }, [componentRef]);
}
