import { Loader } from "@components/loader";
import { Inline, Stack } from "@components/layout";

export default {
    component: Loader,
    title: "Chromatic/Loader"
};

// We deactivate the animation to avoid flaky tests.
const InactiveLoader = ({ ...props }) => (
    <Loader active={false} {...props} />
);

export const Default = () => (
    <InactiveLoader aria-label="Loading..." />
);

Default.storyName = "default";

export const Styling = () => (
    <Inline alignY="end" >
        <InactiveLoader className="border-red" aria-label="Loading..." />
        <InactiveLoader style={{ border: "1px solid red" }} aria-label="Loading..." />
    </Inline>
);

Styling.storyName = "styling";

export const Zoom = () => (
    <Stack>
        <Inline alignY="end" className="zoom-in">
            <InactiveLoader size="sm" aria-label="Loading..." />
            <InactiveLoader size="md" aria-label="Loading..." />
            <InactiveLoader size="lg" aria-label="Loading..." />
        </Inline>
        <Inline alignY="end" className="zoom-out">
            <InactiveLoader size="sm" aria-label="Loading..." />
            <InactiveLoader size="md" aria-label="Loading..." />
            <InactiveLoader size="lg" aria-label="Loading..." />
        </Inline>
    </Stack>
);

Zoom.storyName = "zoom";
