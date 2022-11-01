import { Underlay } from "@components/overlay";

export default {
    title: "Chromatic/Underlay",
    component: Underlay,
    parameters: {
        chromatic: {
            delay: 100,
            chromaticPauseAnimationAtEnd: true
        }
    }
};

export const Default = () => (
    <Underlay />
);

Default.storyName = "Default.storyName";

export const StyledRystem = () => (
    <Underlay border="warning-7" />
);

StyledRystem.storyName = "StyledRystem.storyName";

export const ClassName = () => (
    <Underlay className="border-red" />
);

ClassName.storyName = "ClassName.storyName";

export const Style = () => (
    <Underlay style={{ border: "1px solid red" }} />
);

Style.storyName = "Style.storyName";
