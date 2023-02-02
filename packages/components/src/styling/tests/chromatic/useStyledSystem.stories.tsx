import { Box } from "@components/box";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

const viewports = [640, 768, 1024, 1280, 1536];

// eslint-disable-next-line storybook/csf-component
export default {
    title: "Chromatic/UseStyledSystem",
    parameters: {
        chromatic: {
            delay: 100,
            viewports: viewports
        }
    }
} as ComponentMeta<never>;

type UseStyledSystemStory = ComponentStoryObj<never>;

export const EverySingleBreakpoints: UseStyledSystemStory = {
    storyName: "every single breakpoints",
    render: () => (
        <Box
            backgroundColor={{ base: "purple-5", xs: "green-5", sm: "alert-5", md: "purple-5", lg: "neutral-5", xl: "green-5" }}
            color="alias-static-white"
            width={12}
        >
            Space X
        </Box>
    )
};

export const MatchHigherBreakpoint: UseStyledSystemStory = {
    storyName: "match higher breakpoint",
    render: () => (
        <Box
            backgroundColor={{ base: "purple-3", sm: "alert-3" }}
            color="alias-static-white"
            width={12}
        >
        Space X
        </Box>
    )
};

export const MatchBase: UseStyledSystemStory = {
    storyName: "match base",
    render: () => (
        <Box
            backgroundColor={{ base: "purple-8" }}
            color="alias-static-white"
            width={12}
        >
        Space X
        </Box>
    )
};
