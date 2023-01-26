import { Box } from "@components/box";
import { Button } from "@components/button";
import { Content } from "@components/placeholders";
import { Div, LI, UL } from "@components/html";
import { Heading, Paragraph } from "@components/typography";
import { Inline, Stack } from "@components/layout";
import { Message } from "@components/message";
import { TextLink } from "@components/link";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
    title: "Chromatic/Message",
    component: Message,
    parameters: {
        chromatic: {
            delay: 100
        }
    }
} as ComponentMeta<typeof Message>;

type MessageStory = ComponentStoryObj<typeof Message>;

export const TextOnly: MessageStory = {
    storyName: "text only",
    render:  () => (
        <Inline alignY="end">
            <Message>Scheduled launch today at 1PM.</Message>
            <Message>Scheduled launch today at 1PM.<br />Please be cautious.</Message>
        </Inline>
    )
};

export const TextDismiss: MessageStory = {
    storyName: "text + dismiss",
    render:  () => (
        <Inline alignY="end">
            <Message onDismiss={() => {}}>Scheduled launch today at 1PM.</Message>
            <Message onDismiss={() => {}}>Scheduled launch today at 1PM.<br />Please be cautious.</Message>
        </Inline>
    )
};

export const TextAction: MessageStory = {
    storyName: "text + action",
    render:  () => (
        <Inline alignY="end">
            <Message>
                <Content>Scheduled launch today at 1PM.</Content>
                <Button>Undo</Button>
            </Message>
            <Message>
                <Content>Scheduled launch today at 1PM.<br /><TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious</TextLink>.</Content>
                <Button>Undo</Button>
            </Message>
        </Inline>
    )
};

export const TextActionDismiss: MessageStory = {
    storyName: "text + action + dismiss",
    render:  () => (
        <Inline alignY="end">
            <Message onDismiss={() => {}}>
                <Content>Scheduled launch today at 1PM.</Content>
                <Button>Undo</Button>
            </Message>
            <Message onDismiss={() => {}}>
                <Content>Scheduled launch today at 1PM.<br /><TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious</TextLink>.</Content>
                <Button>Undo</Button>
            </Message>
        </Inline>
    )
};

export const RichContent: MessageStory = {
    storyName: "rich content",
    render:  () => (
        <Message onDismiss={() => {}}>
            <Content>
                <Heading>Scheduled launch</Heading>
                <Paragraph>A launch is scheduled today at 1PM.</Paragraph>
                <UL>
                    <LI>Be cautious</LI>
                    <LI>Close your windows</LI>
                </UL>
            </Content>
            <Button>Undo</Button>
        </Message>
    )
};

export const Contained: MessageStory = {
    storyName: "contained",
    render:  () => (
        <Div width={16}>
            <Message>Scheduled launch today at 1PM.</Message>
        </Div>
    )
};

export const BoxAsContent: MessageStory = {
    storyName: "box as content",
    render:  () => (
        <Message>
            <Box slot="content">Scheduled launch today at 1PM.</Box>
            <Button>Undo</Button>
        </Message>
    )
};

export const Zoom: MessageStory = {
    storyName: "zoom",
    render:  () => (
        <Stack>
            <Div className="zoom-in">
                <Message>Scheduled launch today at 1PM.</Message>
            </Div>
            <Div className="zoom-out">
                <Message>Scheduled launch today at 1PM.</Message>
            </Div>
        </Stack>
    )
};

export const Styling: MessageStory = {
    storyName: "styling",
    render:  () => (
        <Stack>
            <Message border="warning-7"><strong>Scheduled launch</strong> today at 1PM. Please be cautious.</Message>
            <Message className="border-red"><strong>Scheduled launch</strong> today at 1PM. Please be cautious.</Message>
            <Message style={{ border: "1px solid red" }}><strong>Scheduled launch</strong> today at 1PM. Please be cautious.</Message>
        </Stack>
    )
};

export const Informative: MessageStory = {
    storyName: "informative",
    render:  () => (
        <Stack>
            <Message variant="informative" onDismiss={() => {}}>
                <Content>
                    <strong>Scheduled launch</strong> today at 1PM. <TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious</TextLink>.
                </Content>
            </Message>
            <Message variant="informative" onDismiss={() => {}}>
    A launch is scheduled today at 1PM.
            </Message>
            <Message variant="informative">
    A launch is scheduled today at 1PM.
            </Message>
            <Message variant="informative" onDismiss={() => {}}>
                <Content>
                    <Heading>Scheduled launch</Heading>
                    <Paragraph>A launch is scheduled today at 1PM. <TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious</TextLink>.</Paragraph>
                </Content>
            </Message>
            <Message variant="informative" onDismiss={() => {}}>
                <Content>
                    <Heading>Scheduled launch</Heading>
                    <Paragraph>A launch is scheduled today at 1PM. <TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious</TextLink>.</Paragraph>
                </Content>
                <Button>Cancel</Button>
            </Message>
        </Stack>
    )
};

export const Warning: MessageStory = {
    storyName: "warning",
    render:  () => (
        <Stack>
            <Message variant="warning" onDismiss={() => {}}>
                <Content>
                    <strong>Scheduled launch</strong> today at 1PM. <TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious</TextLink>.
                </Content>
            </Message>
            <Message variant="warning" onDismiss={() => {}}>
    A launch is scheduled today at 1PM.
            </Message>
            <Message variant="warning">
    A launch is scheduled today at 1PM.
            </Message>
            <Message variant="warning" onDismiss={() => {}}>
                <Content>
                    <Heading>Scheduled launch</Heading>
                    <Paragraph>A launch is scheduled today at 1PM. <TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious</TextLink>.</Paragraph>
                </Content>
            </Message>
            <Message variant="warning" onDismiss={() => {}}>
                <Content>
                    <Heading>Scheduled launch</Heading>
                    <Paragraph>A launch is scheduled today at 1PM. <TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious</TextLink>.</Paragraph>
                </Content>
                <Button>Cancel</Button>
            </Message>
        </Stack>
    )
};

export const Positive: MessageStory = {
    storyName: "positive",
    render:  () => (
        <Stack>
            <Message variant="positive" onDismiss={() => {}}>
                <Content>
                    <strong>Scheduled launch</strong> today at 1PM. <TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious</TextLink>.
                </Content>
            </Message>
            <Message variant="positive" onDismiss={() => {}}>
    A launch is scheduled today at 1PM.
            </Message>
            <Message variant="positive">
    A launch is scheduled today at 1PM.
            </Message>
            <Message variant="positive" onDismiss={() => {}}>
                <Content>
                    <Heading>Scheduled launch</Heading>
                    <Paragraph>A launch is scheduled today at 1PM. <TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious</TextLink>.</Paragraph>
                </Content>
            </Message>
            <Message variant="positive" onDismiss={() => {}}>
                <Content>
                    <Heading>Scheduled launch</Heading>
                    <Paragraph>A launch is scheduled today at 1PM. <TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious</TextLink>.</Paragraph>
                </Content>
                <Button>Cancel</Button>
            </Message>
        </Stack>
    )
};

export const Negative: MessageStory = {
    storyName: "negative",
    render:  () => (
        <Stack>
            <Message variant="negative" onDismiss={() => {}}>
                <Content>
                    <strong>Scheduled launch</strong> today at 1PM. <TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious</TextLink>.
                </Content>
            </Message>
            <Message variant="negative" onDismiss={() => {}}>
    A launch is scheduled today at 1PM.
            </Message>
            <Message variant="negative">
    A launch is scheduled today at 1PM.
            </Message>
            <Message variant="negative" onDismiss={() => {}}>
                <Content>
                    <Heading>Scheduled launch</Heading>
                    <Paragraph>A launch is scheduled today at 1PM. <TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious</TextLink>.</Paragraph>
                </Content>
            </Message>
            <Message variant="negative" onDismiss={() => {}}>
                <Content>
                    <Heading>Scheduled launch</Heading>
                    <Paragraph>A launch is scheduled today at 1PM. <TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious</TextLink>.</Paragraph>
                </Content>
                <Button>Cancel</Button>
            </Message>
        </Stack>
    )
};
