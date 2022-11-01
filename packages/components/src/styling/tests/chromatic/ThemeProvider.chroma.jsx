import { ShareGateTheme, ThemeProvider, useColorSchemeContext } from "@components/styling";

import { Box } from "@components/box";
import { Inline } from "@components/layout";
import { useEffect } from "react";

export default {
    title: "Chromatic/ThemeProvider",
    component: ThemeProvider,
    parameters: {
        chromatic: {
            delay: 100,
            chromaticPauseAnimationAtEnd: true
        }
    }
};

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

export const Sharegate = () =>(
    <ThemeProvider theme={ShareGateTheme}>
        <PrimaryColors />
    </ThemeProvider>
);

Sharegate.storyName = "sharegate";

export const Light = () =>(
    <ThemeProvider theme={ShareGateTheme} colorScheme="light">
        <Box padding={4} backgroundColor="alias-mid-break" />
    </ThemeProvider>
);

Light.storyName = "light";

export const Dark = () =>(
    <ThemeProvider theme={ShareGateTheme} colorScheme="dark">
        <Box padding={4} backgroundColor="alias-mid-break" />
    </ThemeProvider>
);

Dark.storyName = "dark";

const SwitchColorScheme = () => {
    const { setColorScheme } = useColorSchemeContext();

    useEffect(() => {
        setColorScheme("dark");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
};

export const SetColorSchemeWithApi = () =>(
    <ThemeProvider theme={ShareGateTheme} colorScheme="light">
        <SwitchColorScheme />
        <Box padding={4} backgroundColor="alias-mid-break" />
    </ThemeProvider>
);

SetColorSchemeWithApi.storyName = "set color scheme with api";
