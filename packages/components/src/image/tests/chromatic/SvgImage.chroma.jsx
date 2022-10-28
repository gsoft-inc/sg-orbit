import { Inline } from "@components/layout";
import { NoResults } from "./assets";
import { SvgImage } from "@components/image";

export default {
    title: "Chromatic/SvgImage",
    component: SvgImage
};

export const Stroke = () =>
    <SvgImage stroke="alias-secondary" src={NoResults} aria-label="No Results" />;

export const Fill = () =>
    <SvgImage fill="alias-secondary" src={NoResults} aria-label="No Results" />;

export const Width = () =>
    <SvgImage width="100px" src={NoResults} stroke="alias-secondary" aria-label="No Results" />;

export const Height = () =>
    <SvgImage height="100px" src={NoResults} stroke="alias-secondary" aria-label="No Results" />;

export const Size = () =>
    <SvgImage size="100px" src={NoResults} stroke="alias-secondary" aria-label="No Results" />;

export const Styling = () =>
    <Inline>
        <SvgImage className="stroke-red" src={NoResults} aria-label="No Results" />
        <SvgImage style={{ stroke: "red" }} src={NoResults} aria-label="No Results" />
    </Inline>;

Stroke.storyName = "stroke";
Fill.storyName = "fill";
Width.storyName = "width";
Height.storyName = "height";
Size.storyName = "size";
Styling.storyName = "styling";
