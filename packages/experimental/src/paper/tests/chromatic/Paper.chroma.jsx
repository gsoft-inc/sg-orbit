import { Div } from "@components/html";
import { Paper } from "@experimental/paper";
import { Inline, Stack } from "@components/layout";

export default {
    title: "Chromatic/Paper",
    component: Paper
};

export const Default = () => (
    <Paper />
);

Default.storyName = "default";

export const Label = () => (
    <Paper padding={2}>Content</Paper>
);

Label.storyName = "label";

export const Zoom = () => (
    <Inline>
        <Div className="zoom-in">
            <Paper padding={2}>Content</Paper>
        </Div>
        <Div className="zoom-out">
            <Paper padding={2}>Content</Paper>
        </Div>
    </Inline>
);

Zoom.storyName = "zoom";

export const Styling = () => (
    <Stack>
        <Paper padding={4} color="alias-accent">Content</Paper>
        <Paper padding={4} borderRadius={4}>Content</Paper>
        <Paper padding={4} backgroundColor="alias-soft-break">Content</Paper>
    </Stack>
);

Styling.storyName = "styling";
