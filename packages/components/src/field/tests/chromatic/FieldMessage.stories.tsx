import { Div, LI, OL, UL } from "@components/html";
import { ErrorMessage, HelpMessage, ValidMessage } from "@components/field";
import { HelpIcon, InfoIcon, WarningIcon } from "@components/icons";
import { Inline, Stack } from "@components/layout";
import { Paragraph } from "@components/typography";
import { TextLink } from "@components/link";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { ReactNode } from "react";

export default {
    title: "Chromatic/FieldMessage",
    component: HelpMessage
} as ComponentMeta<typeof HelpMessage>;

type HelpMessageStory = ComponentStoryObj<typeof HelpMessage>;

function Align({ children }: { children: ReactNode }) {
    return (
        <Inline alignY="center" gap={0} whiteSpace="pre-wrap">
            {children}
        </Inline>
    );
}

export const Default: HelpMessageStory = {
    storyName: "default",
    render: () => (
        <HelpMessage>
        Enter your final destination. Here's a <TextLink href="https://www.google.com/sky" external>space map</TextLink>.
        </HelpMessage>
    )
};

export const Icon: HelpMessageStory = {
    storyName: "icon",
    render: () => (
        <HelpMessage>
            <Align>
                <HelpIcon /> Enter your final destination. Here's a <TextLink href="https://www.google.com/sky" external>space map</TextLink>.
            </Align>
        </HelpMessage>
    )
};


export const FieldMessageParagraph: HelpMessageStory = {
    storyName: "paragraph",
    render: () => (
        <HelpMessage>
            <Paragraph>
            If two pieces of the same type of <TextLink href="#">metal touch</TextLink> in space they <TextLink href="https://www.sharegate.com" external>will permanently</TextLink> bond.
            </Paragraph>
        </HelpMessage>
    )
};

export const List: HelpMessageStory = {
    storyName: "list",
    render: () => (
        <Inline>
            <HelpMessage>
                <UL>
                    <LI>Celestial</LI>
                    <LI>Dark matter</LI>
                    <LI>Eclipse</LI>
                </UL>
            </HelpMessage>
            <HelpMessage>
                <OL>
                    <LI>Celestial</LI>
                    <LI>Dark matter</LI>
                    <LI>Eclipse</LI>
                </OL>
            </HelpMessage>
        </Inline>
    )
};

export const Wrappers: HelpMessageStory = {
    storyName: "wrappers",
    render: () => (
        <HelpMessage>
            <Div>
                <Div>
                Enter your final destination. Here's a <TextLink href="https://www.google.com/sky" external>space map</TextLink>.
                </Div>
            </Div>
        </HelpMessage>
    )
};

export const Complex: HelpMessageStory = {
    storyName: "complex",
    render: () => (
        <HelpMessage>
            <Align>
                <HelpIcon /> Enter your final destination. Here's a <TextLink href="https://www.google.com/sky" external>space map</TextLink>.
            </Align>
            <Paragraph>
            If two pieces of the same type of <TextLink href="#">metal touch</TextLink> in space they <TextLink href="https://www.sharegate.com" external>will permanently</TextLink> bond.
            </Paragraph>
            <UL>
                <LI>Celestial</LI>
                <LI>Dark matter</LI>
                <LI>Eclipse</LI>
            </UL>
        </HelpMessage>
    )
};

export const Fluid: HelpMessageStory = {
    storyName: "fluid",
    render: () => (
        <HelpMessage fluid>
        If two pieces of the same type of <TextLink href="#">metal touch</TextLink> in space they <TextLink href="https://www.sharegate.com" external>will permanently</TextLink> bond.
        </HelpMessage>
    )
};

export const Help: HelpMessageStory = {
    storyName: "help",
    render: () => (
        <HelpMessage>
            <Align>
                <HelpIcon /> Enter your final destination. Here's a <TextLink href="https://www.google.com/sky" external>space map</TextLink>.
            </Align>
        </HelpMessage>
    )
};

export const Error: HelpMessageStory = {
    storyName: "error",
    render: () => (
        <ErrorMessage>
            <Align>
                <WarningIcon /> This is not a valid destination. Here's a <TextLink href="https://www.google.com/sky" external>space map</TextLink>.
            </Align>
        </ErrorMessage>
    )
};

export const Valid: HelpMessageStory = {
    storyName: "valid",
    render: () => (
        <ValidMessage>
            <Align>
                <InfoIcon /> Thank you! Here's your <TextLink href="https://www.sharegate.com" external>receipt</TextLink>.
            </Align>
        </ValidMessage>
    )
};

export const Zoom: HelpMessageStory = {
    storyName: "zoom",
    render: () => (
        <Stack>
            <Div className="zoom-in">
                <HelpMessage>
                Enter your final destination. Here's a <TextLink href="https://www.google.com/sky" external>space map</TextLink>.
                </HelpMessage>
            </Div>
            <Div className="zoom-out">
                <HelpMessage>
                Enter your final destination. Here's a <TextLink href="https://www.google.com/sky" external>space map</TextLink>.
                </HelpMessage>
            </Div>
        </Stack>
    )
};

export const Styling: HelpMessageStory = {
    storyName: "styling",
    render: () => (
        <Inline>
            <ValidMessage border="warning-7">Thank you!</ValidMessage>
            <ValidMessage className="bg-red">Thank you!</ValidMessage>
            <ValidMessage style={{ background: "red" }}>Thank you!</ValidMessage>
        </Inline>
    )
};
