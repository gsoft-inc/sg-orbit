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

export function renderWithTheme(ui: ReactElement, testingLibraryOptions?: RenderOptions, themeOptions?: ThemeProviderWrapperOptions) {
    const { wrapper, ...rest } = testingLibraryOptions;

    return render(ui, {
        wrapper: wrapper ?? createThemeProviderWrapper(themeOptions),
        ...rest
    });
}

export function renderHookWithTheme<TProps, TResult>(callback: (props: TProps) => TResult, renderHookOptions?: RenderHookOptions<TProps>, themeOptions?: ThemeProviderWrapperOptions) {
    const { wrapper, ...rest } = renderHookOptions;

    return renderHook(callback, {
        wrapper: wrapper ?? createThemeProviderWrapper(themeOptions),
        ...rest
    });
}

export * from "@testing-library/react";
export { renderWithTheme as render };
export { renderHookWithTheme as renderHook };
