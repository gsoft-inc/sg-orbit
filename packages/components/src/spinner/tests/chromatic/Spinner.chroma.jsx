import { Spinner } from "@components/spinner";
import { Inline, Stack } from "@components/layout";

export default {
    component: Spinner,
    title: "Chromatic/Spinner"
};

export const Default = () => (
    <Inline alignY="end" className="zoom-out">
        <Spinner active={false} size="sm" aria-label="Crawling in progress" />
        <Spinner active={false} size="md" aria-label="Crawling in progress" />
        <Spinner active={false} size="lg" aria-label="Crawling in progress" />
    </Inline>
);

Default.storyName = "default";

export const Styling = () => (
    <Inline>
        <Spinner active={false} color="red" >Crawling in progress</Spinner>
        <Spinner active={false} className="border-red" />
        <Spinner active={false} style={{ border: "1px solid red" }} />
    </Inline>
);

Styling.storyName = "styling";

export const Zoom = () => (
    <Stack>
        <Inline alignY="end" className="zoom-in">
            <Spinner active={false} size="sm">Crawling in progress</Spinner>
            <Spinner active={false} size="md">Crawling in progress</Spinner>
            <Spinner active={false} size="lg">Crawling in progress</Spinner>
        </Inline>
        <Inline alignY="end" className="zoom-out">
            <Spinner active={false} size="sm">Crawling in progress</Spinner>
            <Spinner active={false} size="md">Crawling in progress</Spinner>
            <Spinner active={false} size="lg">Crawling in progress</Spinner>
        </Inline>
    </Stack>
);

Zoom.storyName = "zoom";

export const Label = () => (
    <Inline alignY="end" >
        <Spinner active={false} size="sm">Crawling in progress</Spinner>
        <Spinner active={false} size="md">Crawling in progress</Spinner>
        <Spinner active={false} size="lg">Crawling in progress</Spinner>
    </Inline>
);

Label.storyName = "label";

export const Overflow = () => (
    <Stack width={10}>
        <Spinner active={false} size="sm">Crawling in progress</Spinner>
        <Spinner active={false} size="md">Crawling in progress</Spinner>
        <Spinner active={false} size="lg">Crawling in progress</Spinner>
    </Stack>
);

Overflow.storyName = "overflow";
