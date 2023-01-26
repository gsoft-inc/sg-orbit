import { ShareGateTheme, ThemeProvider, useColorSchemeContext } from "@components/styling";

import { Box } from "@components/box";
import { Inline } from "@components/layout";
import { useEffect } from "react";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
    title: "Chromatic/ThemeProvider",
    component: ThemeProvider,
    parameters: {
        chromatic: {
            delay: 100
        }
    }
} as ComponentMeta<typeof ThemeProvider>;

type ThemeProviderStory = ComponentStoryObj<typeof ThemeProvider>;

function PrimaryColors() {
    return (
        <Inline gap={0}>
            <Box padding={4} backgroundColor="accent-1" />
            <Box padding={4} backgroundColor="accent-2" />
            <Box padding={4} backgroundColor="accent-3" />
            <Box padding={4} backgroundColor="accent-4" />
            <Box padding={4} backgroundColor="accent-5" />
            <Box padding={4} backgroundColor="accent-6" />
            <Box padding={4} backgroundColor="accent-7" />
            <Box padding={4} backgroundColor="accent-8" />
            <Box padding={4} backgroundColor="accent-9" />
            <Box padding={4} backgroundColor="accent-10" />
        </Inline>
    );
}

export const Sharegate: ThemeProviderStory = {
    storyName: "sharegate",
    render: () => (
        <ThemeProvider theme={ShareGateTheme} colorScheme="light">
            <PrimaryColors />
        </ThemeProvider>
    )
};

export const Light: ThemeProviderStory = {
    storyName: "light",
    render: () => (
        <ThemeProvider theme={ShareGateTheme} colorScheme="light">
            <Box padding={4} backgroundColor="alias-mid-break" />
        </ThemeProvider>
    )
};

export const Dark: ThemeProviderStory = {
    storyName: "dark",
    render: () => (
        <ThemeProvider theme={ShareGateTheme} colorScheme="dark">
            <Box padding={4} backgroundColor="alias-mid-break" />
        </ThemeProvider>
    )
};

const SwitchColorScheme = () => {
    const { setColorScheme } = useColorSchemeContext();

    useEffect(() => {
        setColorScheme("dark");
    }, [setColorScheme]);

    return null;
};

export const SetColorSchemeWithApi: ThemeProviderStory = {
    storyName: "set color scheme with api",
    render: () => (
        <ThemeProvider theme={ShareGateTheme} colorScheme="light">
            <SwitchColorScheme />
            <Box padding={4} backgroundColor="alias-mid-break" />
        </ThemeProvider>
    )
};
