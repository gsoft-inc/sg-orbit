import { ContextualHelp } from "@experimental/contextual-help";
import { Inline } from "@components/layout";

export default {
    title: "Chromatic/ContextualHelp",
    component: ContextualHelp
};

export const Default = () => (
    <ContextualHelp>
        Help message
    </ContextualHelp>
);

Default.storyName = "default";

export const Open = () => (
    <Inline>
        <ContextualHelp open>
        Help message
        </ContextualHelp>
    </Inline>
);

Open.storyName = "open";

export const Variant = () => (
    <Inline>
        <ContextualHelp variant="help" open>
        Help message
        </ContextualHelp>
    </Inline>
);

Variant.storyName = "variant";
