import { Spinner } from "@components/spinner";
import { Inline, Stack } from "@components/layout";

export default {
    component: Spinner,
    title: "Chromatic/Spinner"
};

// We deactivate the animation to avoid flaky tests.
const InactiveSpinner = ({ ...props }) => (
    <Spinner active={false} {...props} />
);


export const Default = () => (
    <Inline alignY="end">
        <InactiveSpinner size="sm" aria-label="Crawling in progress" />
        <InactiveSpinner size="md" aria-label="Crawling in progress" />
        <InactiveSpinner size="lg" aria-label="Crawling in progress" />
    </Inline>
);

Default.storyName = "default";

export const Variant = () => (
    <Inline alignY="end" backgroundColor="alias-accent">
        <InactiveSpinner variant="overBackground" aria-label="Crawling in progress" />
        <InactiveSpinner variant="overBackground">Crawling in progress</InactiveSpinner>
    </Inline>
);

Variant.storyName = "variant";

export const Styling = () => (
    <Inline>
        <InactiveSpinner color="red">Crawling in progress</InactiveSpinner>
        <InactiveSpinner className="border-red" />
        <InactiveSpinner style={{ border: "1px solid red" }} />
    </Inline>
);

Styling.storyName = "styling";

export const Zoom = () => (
    <Stack>
        <Inline alignY="end" className="zoom-in">
            <InactiveSpinner size="sm">Crawling in progress</InactiveSpinner>
            <InactiveSpinner size="md">Crawling in progress</InactiveSpinner>
            <InactiveSpinner size="lg">Crawling in progress</InactiveSpinner>
        </Inline>
        <Inline alignY="end" className="zoom-out">
            <InactiveSpinner size="sm">Crawling in progress</InactiveSpinner>
            <InactiveSpinner size="md">Crawling in progress</InactiveSpinner>
            <InactiveSpinner size="lg">Crawling in progress</InactiveSpinner>
        </Inline>
    </Stack>
);

Zoom.storyName = "zoom";

export const Label = () => (
    <Inline alignY="end" >
        <InactiveSpinner size="sm">Crawling in progress</InactiveSpinner>
        <InactiveSpinner size="md">Crawling in progress</InactiveSpinner>
        <InactiveSpinner size="lg">Crawling in progress</InactiveSpinner>
    </Inline>
);

Label.storyName = "label";

export const Overflow = () => (
    <Stack width={10}>
        <InactiveSpinner size="sm">Crawling in progress</InactiveSpinner>
        <InactiveSpinner size="md">Crawling in progress</InactiveSpinner>
        <InactiveSpinner size="lg">Crawling in progress</InactiveSpinner>
    </Stack>
);

Overflow.storyName = "overflow";
