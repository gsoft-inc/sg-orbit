import { Button } from "@react-components/button";
import { LightbulbIcon } from "@react-components/icons";
import { Text } from "@react-components/text";
import { ThemeProvider } from "@react-components/theme-provider";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/ThemeProvider")
        .segment(segment)
        .build();
}

stories()
    .add("nesting", () =>
        <ThemeProvider theme="apricot" colorScheme="light">
            <ThemeProvider theme="desktop" colorScheme="dark">
                <Button color="primary">
                    <LightbulbIcon />
                    <Text>Cutoff</Text>
                </Button>
            </ThemeProvider>
        </ThemeProvider>
    );

stories("/apricot")
    .add("light", () =>
        <ThemeProvider theme="apricot" colorScheme="light">
            <Button color="primary">
                <LightbulbIcon />
                <Text>Cutoff</Text>
            </Button>
        </ThemeProvider>
    )
    .add("dark", () =>
        <ThemeProvider theme="apricot" colorScheme="dark">
            <Button color="primary">
                <LightbulbIcon />
                <Text>Cutoff</Text>
            </Button>
        </ThemeProvider>
    );

stories("/overcast")
    .add("light", () =>
        <ThemeProvider theme="overcast" colorScheme="light">
            <Button color="primary">
                <LightbulbIcon />
                <Text>Cutoff</Text>
            </Button>
        </ThemeProvider>
    )
    .add("dark", () =>
        <ThemeProvider theme="overcast" colorScheme="dark">
            <Button color="primary">
                <LightbulbIcon />
                <Text>Cutoff</Text>
            </Button>
        </ThemeProvider>
    );

stories("/desktop")
    .add("light", () =>
        <ThemeProvider theme="desktop" colorScheme="light">
            <Button color="primary">
                <LightbulbIcon />
                <Text>Cutoff</Text>
            </Button>
        </ThemeProvider>
    )
    .add("dark", () =>
        <ThemeProvider theme="desktop" colorScheme="dark">
            <Button color="primary">
                <LightbulbIcon />
                <Text>Cutoff</Text>
            </Button>
        </ThemeProvider>
    );
