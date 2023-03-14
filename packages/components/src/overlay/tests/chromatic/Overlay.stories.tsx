import { Box, BoxProps } from "@components/box";
import { Overlay } from "@components/overlay";
import { ShareGateTheme, ThemeProvider } from "@components/styling";
import { augmentElement, mergeProps, useMergedRefs } from "@components/shared";
import { forwardRef, ReactElement, useState } from "react";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
    title: "Chromatic/Overlay",
    component: Overlay,
    parameters: {
        chromatic: {
            delay: 100,
            chromaticPauseAnimationAtEnd: true
        }
    }
} as ComponentMeta<typeof Overlay>;

type OverlayStory = ComponentStoryObj<typeof Overlay>;

function PrimaryBox({ children, ...rest }: BoxProps) {
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

const Boundary = forwardRef<any, BoxProps>(({
    children,
    ...rest
},
ref) => {
    const [boundaryElement, setBoundaryElement] = useState();

    const containerRef = useMergedRefs(setBoundaryElement, ref);

    const content = augmentElement(children as ReactElement, {
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

export const InheritTheme: OverlayStory = {
    storyName: "inherit theme",
    render: () => (
        <ThemeProvider theme={ShareGateTheme} colorScheme="light">
            <Boundary>
                <Overlay show>
                    <PrimaryBox />
                </Overlay>
            </Boundary>
        </ThemeProvider>
    )
};

export const StyledSystem: OverlayStory = {
    storyName: "styled system",
    render: () => (
        <Boundary>
            <Overlay border="warning-7" show>
                <PrimaryBox />
            </Overlay>
        </Boundary>
    )
};

export const ClassName: OverlayStory = {
    storyName: "className",
    render: () => (
        <Boundary>
            <Overlay className="border-red" show>
                <PrimaryBox />
            </Overlay>
        </Boundary>
    )
};

export const Style: OverlayStory = {
    storyName: "style",
    render: () => (
        <Boundary>
            <Overlay style={{ border: "0.0625rem solid red" }} show>
                <PrimaryBox />
            </Overlay>
        </Boundary>
    )
};
