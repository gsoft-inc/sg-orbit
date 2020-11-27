import { Inline } from "@react-components/layout";
import { ThemeProvider } from "@react-components/theme-provider";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/ThemeProvider")
        .segment(segment)
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
        <ThemeProvider theme="apricot" colorScheme="light">
            <ThemeProvider theme="desktop" colorScheme="dark">
                <PrimaryColors />
            </ThemeProvider>
        </ThemeProvider>
    )
    .add("apricot light", () =>
        <ThemeProvider theme="apricot" colorScheme="light">
            <PrimaryColors />
        </ThemeProvider>
    )
    .add("apricot dark", () =>
        <ThemeProvider theme="apricot" colorScheme="dark">
            <PrimaryColors />
        </ThemeProvider>
    )
    .add("overcast light", () =>
        <ThemeProvider theme="overcast" colorScheme="light">
            <PrimaryColors />
        </ThemeProvider>
    )
    .add("overcast dark", () =>
        <ThemeProvider theme="overcast" colorScheme="dark">
            <PrimaryColors />
        </ThemeProvider>
    )
    .add("desktop light", () =>
        <ThemeProvider theme="desktop" colorScheme="light">
            <PrimaryColors />
        </ThemeProvider>
    )
    .add("desktop dark", () =>
        <ThemeProvider theme="desktop" colorScheme="dark">
            <PrimaryColors />
        </ThemeProvider>
    );
