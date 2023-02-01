import { A } from "@components/html";
import { Inline } from "@components/layout";
import { StyleProvider } from "@components/styling";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { PropsWithChildren } from "react";

export default {
    title: "Chromatic/Html",
    component: StyleProvider
} as ComponentMeta<typeof StyleProvider>;

type StyleProviderStory = ComponentStoryObj<typeof StyleProvider>;

const StyledAnchor = ({ children }: PropsWithChildren) => {
    return (
        <StyleProvider
            value={{
                "html-a": {
                    color: "red"
                }
            }}
        >
            <A href="#">{children}</A>
        </StyleProvider>
    );
};

export const Size: StyleProviderStory = {
    storyName: "size",
    render: () => (
        <A href="#">Google</A>
    )
};

export const StyleContext: StyleProviderStory = {
    storyName: "support style context",
    render: () => (
        <StyledAnchor>Google</StyledAnchor>
    )
};

export const Styling: StyleProviderStory = {
    storyName: "styling",
    render: () => (
        <Inline>
            <A border="warning-7" href="#">Google</A>
            <A className="border-red" href="#">Google</A>
            <A style={{ border: "0.0625rem solid red" }} href="#">Google</A>
        </Inline>
    )
};
