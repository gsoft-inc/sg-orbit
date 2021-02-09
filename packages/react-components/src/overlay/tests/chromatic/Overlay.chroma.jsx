import { Box } from "@react-components/box";
import { Overlay } from "@react-components/overlay";
import { ThemeProvider } from "@react-components/theme-provider";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Overlay")
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .chromaticPauseAnimationAtEnd()
            .build())
        .build();
}

function PrimaryBox({ children, ...rest }) {
    return (
        <Box
            {...rest}
            className="bg-primary-500"
            style={{
                width: "75px",
                height: "75px"
            }}
        >
            {children}
        </Box>
    );
}

stories()
    .add("inherit theme", () =>
        <ThemeProvider theme="desktop" colorScheme="light">
            <Overlay show>
                <PrimaryBox />
            </Overlay>
        </ThemeProvider>
    )
    .add("border offset", () =>
        <Overlay borderOffset="20px">
            <PrimaryBox />
        </Overlay>
    )
    .add("styling", () =>
        <>
            <Overlay className="border-red" show>
                <PrimaryBox />
            </Overlay>
            <Overlay style={{ border: "1px solid red" }} show>
                <PrimaryBox />
            </Overlay>
        </>
    );

