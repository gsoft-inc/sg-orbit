import { Box } from "@components/box";

const viewports = [640, 768, 1024, 1280, 1536];

export default {
    title: "Chromatic/UseStyledSystem",
    parameters: {
        chromatic: {
            delay: 100,
            viewports: viewports
        }
    }
};

export const EverySingleBreakpoints = () => (
    <Box
        backgroundColor={{ base: "purple-5", xs: "green-5", sm: "alert-5", md: "purple-5", lg: "neutral-5", xl: "green-5" }}
        color="alias-static-white"
        width={12}
    >
            Space X
    </Box>
);

EverySingleBreakpoints.storyName = "every single breakpoints";

export const MatchHigherBreakpoint = () => (
    <Box
        backgroundColor={{ base: "purple-3", sm: "alert-3" }}
        color="alias-static-white"
        width={12}
    >
        Space X
    </Box>
);

MatchHigherBreakpoint.storyName = "match higher breakpoint";

export const MatchBase = () => (
    <Box
        backgroundColor={{ base: "purple-8" }}
        color="alias-static-white"
        width={12}
    >
        Space X
    </Box>
);

MatchBase.storyName = "match base";
