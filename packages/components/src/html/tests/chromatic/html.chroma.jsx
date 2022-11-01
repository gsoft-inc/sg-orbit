import { A } from "@components/html";
import { Inline } from "@components/layout";
import { StyleProvider } from "@components/styling";

export default {
    title: "Chromatic/Html",
    component: StyleProvider
};

const StyledAnchor = ({ children }) => {
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

export const Size = () => (
    <A href="#">Google</A>
);

Size.storyName = "size";

export const StyleContext = () => (
    <StyledAnchor>Google</StyledAnchor>
);

StyleContext.storyName = "support style context";

export const Styling = () => (
    <Inline>
        <A border="warning-7" href="#">Google</A>
        <A className="border-red" href="#">Google</A>
        <A style={{ border: "1px solid red" }} href="#">Google</A>
    </Inline>
);

Styling.storyName = "styling";
