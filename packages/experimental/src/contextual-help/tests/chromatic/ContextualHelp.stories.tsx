import { ContextualHelp } from "@experimental/contextual-help";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
    title: "Chromatic/ContextualHelp",
    component: ContextualHelp,
    decorators: [
        Story => (
            <div style={{ padding: "150px 250px" }}>
                <Story />
            </div>
        )
    ]
} as ComponentMeta<typeof ContextualHelp>;

type ContextualHelpStory = ComponentStoryObj<typeof ContextualHelp>;

export const Default: ContextualHelpStory = {
    args: {
        children: "Help message"

    },
    storyName: "default"
};

export const Open: ContextualHelpStory = {
    args: {
        ...Default.args,
        tooltipTriggerProps: {
            open: true
        }
    },
    storyName: "open"
};


export const Variant: ContextualHelpStory = {
    args: {
        ...Default.args,
        variant:"help",
        tooltipTriggerProps: {
            open: true
        }
    },
    storyName: "variant"
};
