import { ThemeProvider, ApricotTheme } from "@components/styling";
import { ReactNode, ReactElement } from "react";
import { render } from "@testing-library/react";

function withThemeProvider() {
    return {
        wrapper: ({ children }: { children?: ReactNode }) => {
            return (
                <ThemeProvider theme={ApricotTheme} colorScheme="light">
                    {children}
                </ThemeProvider>
            )
        }
    };
}

export function renderWithTheme(ui: ReactElement, options?: Record<any, any>) {
    return render(ui, {
        ...withThemeProvider(),
        ...options
    })
}
