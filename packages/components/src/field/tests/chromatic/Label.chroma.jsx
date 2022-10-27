import { Inline } from "@components/layout";
import { Label } from "@components/field";
import { Span } from "@components/html";
import { TextLink } from "@components/link";

export default {
    title: "Chromatic/Label",
    component: Label
};

export const Default = () =>
    <Label>Where to?</Label>;

export const Complex = () =>
    <Label>
        <Span>Where to? (<TextLink variant="primary" size="inherit" href="https://www.google.com/sky">view destinations</TextLink>)</Span>
    </Label>;

export const AsSpan = () =>
    <Label as="span">Where to?</Label>;

export const Styling = () =>
    <Inline>
        <Label border="warning-7">Where to?</Label>
        <Label className="bg-red">Where to?</Label>
        <Label style={{ background: "red" }}>Where to?</Label>
    </Inline>;

Default.storyName = "default";
Complex.storyName = "complex";
AsSpan.storyName = "as span";
Styling.storyName = "styling";
