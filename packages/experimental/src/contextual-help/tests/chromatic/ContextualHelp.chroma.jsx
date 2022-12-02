import { Div } from "@components/html";
import { ContextualHelp } from "@experimental/contextual-help";
import { Inline } from "@components/layout";

export default {
    title: "Chromatic/Paper",
    component: ContextualHelp
};

export const Default = () => (
    <ContextualHelp>
        Help message
    </ContextualHelp>
);

Default.storyName = "default";

export const Zoom = () => (
    <Inline>
        <Div className="zoom-in">
            <ContextualHelp>
                Help message
            </ContextualHelp>
        </Div>
        <Div className="zoom-out">
            <ContextualHelp>
                Help message
            </ContextualHelp>
        </Div>
    </Inline>
);

Zoom.storyName = "zoom";
