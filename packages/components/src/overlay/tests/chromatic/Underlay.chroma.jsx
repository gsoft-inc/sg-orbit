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

export const Default = () =>
    <Underlay />;

export const StyledRystem = () =>
    <Underlay border="warning-7" />;

export const ClassName = () =>
    <Underlay className="border-red" />;

export const Style = () =>
    <Underlay style={{ border: "1px solid red" }} />;

Default.storyName = "Default.storyName";
StyledRystem.storyName = "StyledRystem.storyName";
ClassName.storyName = "ClassName.storyName";
Style.storyName = "Style.storyName";
