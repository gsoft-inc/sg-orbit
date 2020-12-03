import { DocsContainer } from "@storybook/addon-docs/blocks";
import { ThemeProvider } from "@react-components/theme-provider";

function ThemedDocsContainer({ context, children }) {
    const theme = context.globals.theme;

    return (
        <ThemeProvider theme={theme} colorScheme="light">
            {children}
        </ThemeProvider>
    );
}

export function withDocsContainer(context, children) {
    return (
        <DocsContainer context={context}>
            <ThemedDocsContainer context={context}>
                {children}
            </ThemedDocsContainer>
        </DocsContainer>
    );
}
