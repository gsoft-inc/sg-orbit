import { Spinner } from "@components/spinner";
import { Inline, Stack } from "@components/layout";

export default {
    component: Spinner,
    title: "Chromatic/Spinner"
};

export const Default = () => (
    <Inline alignY="end" className="zoom-out">
        <Spinner size="sm" aria-label="Crawling in progress" />
        <Spinner size="md" aria-label="Crawling in progress" />
        <Spinner size="lg" aria-label="Crawling in progress" />
    </Inline>
);

Default.storyName = "default";

export const Styling = () => (
    <Inline>
        <Spinner color="red" >Crawling in progress</Spinner>
        <Spinner className="border-red" />
        <Spinner style={{ border: "1px solid red" }} />
    </Inline>
);

Styling.storyName = "styling";

export const Zoom = () => (
    <Stack>
        <Inline alignY="end" className="zoom-in">
            <Spinner size="sm">Crawling in progress</Spinner>
            <Spinner size="md">Crawling in progress</Spinner>
            <Spinner size="lg">Crawling in progress</Spinner>
        </Inline>
        <Inline alignY="end" className="zoom-out">
            <Spinner size="sm">Crawling in progress</Spinner>
            <Spinner size="md">Crawling in progress</Spinner>
            <Spinner size="lg">Crawling in progress</Spinner>
        </Inline>
    </Stack>
);

Zoom.storyName = "zoom";

export const Label = () => (
    <Inline alignY="end" >
        <Spinner size="sm">Crawling in progress</Spinner>
        <Spinner size="md">Crawling in progress</Spinner>
        <Spinner size="lg">Crawling in progress</Spinner>
    </Inline>
);

Label.storyName = "label";

export const Overflow = () => (
    <Stack width={10}>
        <Spinner size="sm">Crawling in progress</Spinner>
        <Spinner size="md">Crawling in progress</Spinner>
        <Spinner size="lg">Crawling in progress</Spinner>
    </Stack>
);

Overflow.storyName = "overflow";
