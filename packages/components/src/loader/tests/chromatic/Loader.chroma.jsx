import { Loader } from "@components/loader";
import { Inline, Stack } from "@components/layout";

export default {
    component: Loader,
    title: "Chromatic/Loader"
};

export const Default = () => (
    <Loader aria-label="Loading..." />
);

Default.storyName = "default";

export const Styling = () => (
    <Inline alignY="end" >
        <Loader className="border-red" aria-label="Loading..." />
        <Loader style={{ border: "1px solid red" }} aria-label="Loading..." />
    </Inline>
);

Styling.storyName = "styling";

export const Zoom = () => (
    <Stack>
        <Inline alignY="end" className="zoom-in">
            <Loader size="sm" aria-label="Loading..." />
            <Loader size="md" aria-label="Loading..." />
            <Loader size="lg" aria-label="Loading..." />
        </Inline>
        <Inline alignY="end" className="zoom-out">
            <Loader size="sm" aria-label="Loading..." />
            <Loader size="md" aria-label="Loading..." />
            <Loader size="lg" aria-label="Loading..." />
        </Inline>
    </Stack>
);

Zoom.storyName = "zoom";
