import { ShareGateTheme, ThemeProvider, ColorScheme } from "@components/styling";
import { ReactElement, ReactNode } from "react";
import { RenderHookOptions, renderHook, render, RenderOptions } from "@testing-library/react";

export interface ThemeProviderWrapperOptions {
    colorScheme?: ColorScheme;
}

function createThemeProviderWrapper({ colorScheme = "light" }: ThemeProviderWrapperOptions = {}) {
    return ({ children }: { children?: ReactNode }) => {
        return (
            <ThemeProvider theme={ShareGateTheme} colorScheme={colorScheme}>
                {children}
            </ThemeProvider>
        );
    };
}

export function renderWithTheme(ui: ReactElement, testingLibraryOptions: RenderOptions = {}, themeOptions?: ThemeProviderWrapperOptions) {
    return render(ui, {
        wrapper: createThemeProviderWrapper(themeOptions),
        ...testingLibraryOptions
    });
}

export function renderHookWithTheme<TProps, TResult>(callback: (props: TProps) => TResult, renderHookOptions: RenderHookOptions<TProps> = {}, themeOptions?: ThemeProviderWrapperOptions) {
    return renderHook(callback, {
        wrapper: createThemeProviderWrapper(themeOptions),
        ...renderHookOptions
    });
}

export * from "@testing-library/react";
export { renderWithTheme as render };
export { renderHookWithTheme as renderHook };
