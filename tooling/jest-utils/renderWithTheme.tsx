import { ColorScheme, ShareGateTheme, ThemeProvider } from "@components/styling";
import { ReactElement, ReactNode } from "react";
import { RenderHookOptions, renderHook, render } from "@testing-library/react";

export interface JestThemeOptions {
    colorScheme?: ColorScheme;
}

function withThemeProvider({ colorScheme = "light" }: JestThemeOptions = {}) {
    return {
        wrapper: ({ children }: { children?: ReactNode }) => {
            return (
                <ThemeProvider theme={ShareGateTheme} colorScheme={colorScheme}>
                    {children}
                </ThemeProvider>
            );
        }
    };
}

export function renderWithTheme(ui: ReactElement, testingLibraryOptions?: Record<any, any>, themeOptions?: JestThemeOptions) {
    return render(ui, {
        ...withThemeProvider(themeOptions),
        ...testingLibraryOptions
    });
}

export function renderHookWithTheme<TProps, TResult>(callback: (props: TProps) => TResult, renderHookOptions?: RenderHookOptions<TProps>, themeOptions?: JestThemeOptions) {
    return renderHook(callback, {
        ...withThemeProvider(themeOptions),
        ...renderHookOptions
    });
}
