import { Box } from "@components/box";
import { Overlay } from "@components/overlay";
import { ShareGateTheme, ThemeProvider } from "@components/styling";
import { augmentElement, mergeProps, useMergedRefs } from "@components/shared";
import { forwardRef, useState } from "react";

export default {
    title: "Chromatic/Overlay",
    component: Overlay,
    parameters: {
        chromatic: {
            delay: 100,
            chromaticPauseAnimationAtEnd: true
        }
    }
};

function PrimaryBox({ children, ...rest }) {
    return (
        <Box
            {...rest}
            backgroundColor="accent-6"
            height={9}
            width={9}
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
                    ref: containerRef
                }
            )}
        >
            {content}
        </Box>
    );
});

export const InheritTheme = () =>
    <ThemeProvider theme={ShareGateTheme} colorScheme="light">
        <Boundary>
            <Overlay show>
                <PrimaryBox />
            </Overlay>
        </Boundary>
    </ThemeProvider>;

export const StyledSystem = () =>
    <Boundary>
        <Overlay border="warning-7" show>
            <PrimaryBox />
        </Overlay>
    </Boundary>;

export const ClassName = () =>
    <Boundary>
        <Overlay className="border-red" show>
            <PrimaryBox />
        </Overlay>
    </Boundary>;

export const Style = () =>
    <Boundary>
        <Overlay style={{ border: "1px solid red" }} show>
            <PrimaryBox />
        </Overlay>
    </Boundary>;

InheritTheme.storyName = "inherit theme";
StyledSystem.storyName = "styled system";
ClassName.storyName = "className";
Style.storyName = "style";
