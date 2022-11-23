import { Loader } from "@components/loader";
import { Inline, Stack } from "@components/layout";

export default {
    component: Loader,
    title: "Chromatic/Loader"
};

export const Default = () => (
    <Loader active={false} aria-label="Loading..." />
);

Default.storyName = "default";

export const Styling = () => (
    <Inline alignY="end" >
        <Loader active={false} className="border-red" aria-label="Loading..." />
        <Loader active={false} style={{ border: "1px solid red" }} aria-label="Loading..." />
    </Inline>
);

Styling.storyName = "styling";

export const Zoom = () => (
    <Stack>
        <Inline alignY="end" className="zoom-in">
            <Loader active={false} size="sm" aria-label="Loading..." />
            <Loader active={false} size="md" aria-label="Loading..." />
            <Loader active={false} size="lg" aria-label="Loading..." />
        </Inline>
        <Inline alignY="end" className="zoom-out">
            <Loader active={false} size="sm" aria-label="Loading..." />
            <Loader active={false} size="md" aria-label="Loading..." />
            <Loader active={false} size="lg" aria-label="Loading..." />
        </Inline>
    </Stack>
);

Zoom.storyName = "zoom";
