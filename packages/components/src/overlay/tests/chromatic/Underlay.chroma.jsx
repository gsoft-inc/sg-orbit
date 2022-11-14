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

Default.storyName = "default";

export const StyledSystem = () => (
    <Underlay border="warning-7" />
);

StyledSystem.storyName = "styled system";

export const ClassName = () => (
    <Underlay className="border-red" />
);

ClassName.storyName = "className";

export const Style = () => (
    <Underlay style={{ border: "1px solid red" }} />
);

Style.storyName = "style";
