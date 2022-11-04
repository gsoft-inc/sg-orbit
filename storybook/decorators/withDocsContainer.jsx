import { DocsContainer } from "@storybook/addon-docs";
import { ShareGateTheme, ThemeProvider } from "@components/styling";
import { createContext } from "react";
import { useContext } from "react";

const GlobalsContext = createContext();

function GlobalsProvider({ globals, children }) {
    return <GlobalsContext.Provider value={globals}>{children}</GlobalsContext.Provider>;
}

function ThemedDocsContainer({ context, children }) {
    const theme = context.globals.theme === "sharegate" ? ShareGateTheme : ShareGateTheme;

    return (
        <ThemeProvider theme={theme} colorScheme="light">
            {children}
        </ThemeProvider>
    );
}

export function withDocsContainer(context, children) {
    // The following line might not work on storybook@7.0.0
    // If it still works, remove this comment.
    // See https://github.com/storybookjs/storybook/issues/18477#issuecomment-1198852168
    const story = context.storyById(context.id);
    const { globals } = context.getStoryContext(story);

    return (
        <DocsContainer context={context}>
            <ThemedDocsContainer context={context}>
                <GlobalsProvider globals={globals}>
                    {children}
                </GlobalsProvider>
            </ThemedDocsContainer>
        </DocsContainer>
    );
}

export const useGlobals = () => useContext(GlobalsContext);
