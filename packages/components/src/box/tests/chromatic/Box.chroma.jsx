import { Box } from "@components/box";
import { Inline } from "@components/layout";

export default {
    title: "Chromatic/Box",
    component: Box,
    parameters: {
        chromatic: { delay: 100 }
    }
};

export const Default = () =>(
    <Box>The Universe is under no obligation to make sense to you.</Box>
);

Default.storyName = "default";
Default.parameters = {
    chromatic: { delay: 100 }
};

export const Styling = () => (
    <Inline>
        <Box border="warning-7">The Universe is under no obligation to make sense to you.</Box>
        <Box className="bg-red">The Universe is under no obligation to make sense to you.</Box>
        <Box style={{ backgroundColor: "red" }}>The Universe is under no obligation to make sense to you.</Box>
    </Inline>
);

Styling.storyName = "styling";
