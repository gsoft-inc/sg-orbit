import { DisclosureArrow, DisclosureContext } from "@components/disclosure";
import { Inline } from "@components/layout";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
    title: "Chromatic/DisclosureArrow",
    component: DisclosureArrow,
    parameters: {
        chromatic: {
            delay: 100
        }
    }
} as ComponentMeta<typeof DisclosureArrow>;

type DisclosureArrowStory = ComponentStoryObj<typeof DisclosureArrow>;

export const Default:DisclosureArrowStory = {
    storyName: "default",
    render: () => (
        <DisclosureArrow open />
    )
};

export const Controlled:DisclosureArrowStory = {
    storyName: "controlled",
    render: () => (
        <Inline>
            <DisclosureArrow open={false} />
            <DisclosureArrow open />
        </Inline>
    )
};

export const Context:DisclosureArrowStory = {
    storyName: "context",
    render: () => (
        <Inline>
            <DisclosureContext.Provider value={{ isOpen: false }}>
                <DisclosureArrow />
            </DisclosureContext.Provider>
            <DisclosureContext.Provider value={{ isOpen: true }}>
                <DisclosureArrow />
            </DisclosureContext.Provider>
        </Inline>
    )
};

export const Styling:DisclosureArrowStory = {
    storyName: "styling",
    render: () => (
        <Inline>
            <DisclosureArrow open className="border-red" />
            <DisclosureArrow open style={{ border: "0.0625rem solid red" }} />
        </Inline>
    )
};

