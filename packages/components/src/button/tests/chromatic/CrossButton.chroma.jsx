import { CrossButton } from "@components/button";
import { Inline } from "@components/layout";

export default {
    title: "Chromatic/CrossButton",
    component: CrossButton
};

export const Default = () =>
    <Inline alignY="end">
        <CrossButton size="2xs" aria-label="Clear" />
        <CrossButton size="xs" aria-label="Clear" />
        <CrossButton size="sm" aria-label="Clear" />
        <CrossButton aria-label="Clear" />
    </Inline>;

export const Condensed = () =>
    <Inline alignY="end">
        <CrossButton condensed size="2xs" aria-label="Clear" />
        <CrossButton condensed size="xs" aria-label="Clear" />
        <CrossButton condensed size="sm" aria-label="Clear" />
        <CrossButton condensed aria-label="Clear" />
    </Inline>;

Default.storyName = "default";
Condensed.storyName = "condensed";
