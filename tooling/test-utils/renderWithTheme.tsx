import { ShareGateTheme, ThemeProvider } from "@components/styling";
import { ReactElement, ReactNode } from "react";
import { RenderHookOptions, renderHook, render, RenderOptions } from "@testing-library/react";

const ThemeProviderWrapper = ({ children }: { children?: ReactNode }) => {
    return (
        <ThemeProvider theme={ShareGateTheme} colorScheme="light">
            {children}
        </ThemeProvider>
    );
};

export function renderWithTheme(ui: ReactElement, testingLibraryOptions?: Omit<RenderOptions, "wrapper">) {
    return render(ui, {
        wrapper: ThemeProviderWrapper,
        ...testingLibraryOptions
    });
}

export function renderHookWithTheme<TProps, TResult>(callback: (props: TProps) => TResult, renderHookOptions?: Omit<RenderHookOptions<TProps>, "wrapper">) {
    return renderHook(callback, {
        wrapper: ThemeProviderWrapper,
        ...renderHookOptions
    });
}

export * from "@testing-library/react";
export { renderWithTheme as render };
export { renderHookWithTheme as renderHook };
