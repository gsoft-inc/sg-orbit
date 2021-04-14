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
            <div className="pa4 bg-primary-50" />
            <div className="pa4 bg-primary-100" />
            <div className="pa4 bg-primary-200" />
            <div className="pa4 bg-primary-300" />
            <div className="pa4 bg-primary-400" />
            <div className="pa4 bg-primary-500" />
            <div className="pa4 bg-primary-600" />
            <div className="pa4 bg-primary-700" />
            <div className="pa4 bg-primary-800" />
            <div className="pa4 bg-primary-900" />
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
            <div className="pa4 background-2"></div>
        </ThemeProvider>
    )
    .add("dark", () =>
        <ThemeProvider colorScheme="dark">
            <div className="pa4 background-2"></div>
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
    })
    .add("styling", () =>
        <Inline>
            <ThemeProvider className="border-red" theme="apricot" colorScheme="light">className</ThemeProvider>
            <ThemeProvider style={{ border: "1px solid red" }} theme="apricot" colorScheme="light">style</ThemeProvider>
        </Inline>
    );
