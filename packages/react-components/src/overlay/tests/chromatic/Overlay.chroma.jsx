import { Box } from "@react-components/box";
import { Overlay } from "@react-components/overlay";
import { ThemeProvider } from "@react-components/theme-provider";
import { augmentElement, mergeProps, useMergedRefs } from "../../../shared";
import { forwardRef, useState } from "react";
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

const Boundary = forwardRef(({
    children,
    ...rest
},
ref) => {
    const [boundaryElement, setBoundaryElement] = useState();

    const containerRef = useMergedRefs(setBoundaryElement, ref);

    const content = augmentElement(children, {
        containerElement: boundaryElement
    });

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    // style: {
                    //     padding: "100px 250px",
                    //     position: "relative"
                    // },
                    ref: containerRef
                }
            )}
        >
            {content}
        </Box>
    );
});

stories()
    .add("inherit theme", () =>
        <ThemeProvider theme="desktop" colorScheme="light">
            <Boundary>
                <Overlay show>
                    <PrimaryBox />
                </Overlay>
            </Boundary>
        </ThemeProvider>
    )
    .add("className", () =>
        <Boundary>
            <Overlay className="border-red" show>
                <PrimaryBox />
            </Overlay>
        </Boundary>
    )
    .add("style", () =>
        <Boundary>
            <Overlay style={{ border: "1px solid red" }} show>
                <PrimaryBox />
            </Overlay>
        </Boundary>
    );

