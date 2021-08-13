import { Box } from "@react-components/box";
import { Inline } from "@react-components/layout";
import { ThemeProvider, useThemeContext } from "@react-components/theme-provider";
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

function PrimaryAliasColors() {
    return (
        <Inline gap={0}>
            <Box padding={4} backgroundColor="alias-primary-1" />
            <Box padding={4} backgroundColor="alias-primary-2" />
        </Inline>
    );
}

stories()
    .add("nesting", () =>
        <ThemeProvider theme="apricot">
            <ThemeProvider theme="desktop">
                <PrimaryColors />
            </ThemeProvider>
        </ThemeProvider>
    )
    .add("theme inheritance", () =>
        <ThemeProvider theme="apricot">
            <ThemeProvider colorScheme="dark">
                <PrimaryAliasColors />
            </ThemeProvider>
        </ThemeProvider>
    )
    .add("color scheme inheritance", () =>
        <ThemeProvider colorScheme="dark">
            <ThemeProvider theme="desktop">
                <PrimaryAliasColors />
            </ThemeProvider>
        </ThemeProvider>
    )
    .add("apricot", () =>
        <ThemeProvider theme="apricot">
            <PrimaryColors />
        </ThemeProvider>
    )
    .add("desktop", () =>
        <ThemeProvider theme="desktop">
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
            <ThemeProvider theme="apricot" colorScheme="light">
                <SwitchColorScheme />
                <PrimaryColors />
            </ThemeProvider>
        );
    });
