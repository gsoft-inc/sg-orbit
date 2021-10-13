import { ApricotTheme, DesktopTheme, ThemeProvider, useThemeContext } from "@react-components/styling";
import { Box } from "@react-components/box";
import { Inline } from "@react-components/layout";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";
import { useEffect } from "react";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/ThemeProvider")
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .build())
        .build();
}

function PrimaryColors() {
    return (
        <Inline gap={0}>
            <Box padding={4} backgroundColor="primary-1" />
            <Box padding={4} backgroundColor="primary-2" />
            <Box padding={4} backgroundColor="primary-3" />
            <Box padding={4} backgroundColor="primary-4" />
            <Box padding={4} backgroundColor="primary-5" />
            <Box padding={4} backgroundColor="primary-6" />
            <Box padding={4} backgroundColor="primary-7" />
            <Box padding={4} backgroundColor="primary-8" />
            <Box padding={4} backgroundColor="primary-9" />
            <Box padding={4} backgroundColor="primary-10" />
        </Inline>
    );
}

stories()
    .add("apricot", () =>
        <ThemeProvider theme={ApricotTheme}>
            <PrimaryColors />
        </ThemeProvider>
    )
    .add("desktop", () =>
        <ThemeProvider theme={DesktopTheme}>
            <PrimaryColors />
        </ThemeProvider>
    )
    .add("light", () =>
        <ThemeProvider colorScheme="light">
            <Box padding={4} backgroundColor="alias-2" />
        </ThemeProvider>
    )
    .add("dark", () =>
        <ThemeProvider colorScheme="dark">
            <Box padding={4} backgroundColor="alias-2" />
        </ThemeProvider>
    )
    .add("set color scheme with api", () => {
        const SwitchColorScheme = () => {
            const { setColorScheme } = useThemeContext();

            useEffect(() => {
                setColorScheme("dark");
            // eslint-disable-next-line react-hooks/exhaustive-deps
            }, []);

            return null;
        };

        return (
            <ThemeProvider colorScheme="light">
                <SwitchColorScheme />
                <Box padding={4} backgroundColor="alias-2" />
            </ThemeProvider>
        );
    });
