import { Inline } from "@components/layout";
import { NoResults } from "./assets";
import { SvgImage } from "@components/image";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
    title: "Chromatic/SvgImage",
    component: SvgImage
} as ComponentMeta<typeof SvgImage>;

type SvgImageStory = ComponentStoryObj<typeof SvgImage>;

export const Stroke: SvgImageStory = {
    storyName: "stroke",
    render: () => (
        <SvgImage stroke="alias-secondary" src={NoResults} aria-label="No Results" />
    )
};

export const Fill: SvgImageStory = {
    storyName: "fill",
    render: () => (
        <SvgImage fill="alias-secondary" src={NoResults} aria-label="No Results" />
    )
};

export const Width: SvgImageStory = {
    storyName: "width",
    render: () => (
        <SvgImage width="100px" src={NoResults} stroke="alias-secondary" aria-label="No Results" />
    )
};

export const Height: SvgImageStory = {
    storyName: "height",
    render: () => (
        <SvgImage height="100px" src={NoResults} stroke="alias-secondary" aria-label="No Results" />
    )
};

export const Styling: SvgImageStory = {
    storyName: "styling",
    render: () => (
        <Inline>
            <SvgImage className="stroke-red" src={NoResults} aria-label="No Results" />
            <SvgImage style={{ stroke: "red" }} src={NoResults} aria-label="No Results" />
        </Inline>
    )
};
