import { Box } from "@components/box";
import { Inline } from "@components/layout";
import { ShareGateTheme, ThemeProvider, useThemeContext } from "@components/styling";
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
    .add("sharegate", () =>
        <ThemeProvider theme={ShareGateTheme}>
            <PrimaryColors />
        </ThemeProvider>
    )
    .add("light", () =>
        <ThemeProvider theme={ShareGateTheme} colorScheme="light">
            <Box padding={4} backgroundColor="alias-soft-break" />
        </ThemeProvider>
    )
    .add("dark", () =>
        <ThemeProvider theme={ShareGateTheme} colorScheme="dark">
            <Box padding={4} backgroundColor="alias-soft-break" />
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
            <ThemeProvider theme={ShareGateTheme} colorScheme="light">
                <SwitchColorScheme />
                <Box padding={4} backgroundColor="alias-soft-break" />
            </ThemeProvider>
        );
    });
