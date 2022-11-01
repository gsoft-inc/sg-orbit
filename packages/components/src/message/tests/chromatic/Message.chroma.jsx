import { Box } from "@components/box";
import { Button } from "@components/button";
import { Content } from "@components/placeholders";
import { Div, LI, UL } from "@components/html";
import { Heading, Paragraph } from "@components/typography";
import { Inline, Stack } from "@components/layout";
import { Message } from "@components/message";
import { TextLink } from "@components/link";

export default {
    title: "Chromatic/Message",
    component: Message,
    parameters: {
        chromatic: {
            delay: 100
        }
    }
};

export const TextOnly = () => (
    <Inline alignY="end">
        <Message>Scheduled launch today at 1PM.</Message>
        <Message>Scheduled launch today at 1PM.<br />Please be cautious.</Message>
    </Inline>
);

TextOnly.storyName = "text only";

export const TextDismiss = () => (
    <Inline alignY="end">
        <Message onDismiss={() => {}}>Scheduled launch today at 1PM.</Message>
        <Message onDismiss={() => {}}>Scheduled launch today at 1PM.<br />Please be cautious.</Message>
    </Inline>
);

TextDismiss.storyName = "text + dismiss";

export const TextAction = () => (
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
);

TextAction.storyName = "text + action";

export const TextActionDismiss = () => (
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
);

TextActionDismiss.storyName = "text + action + dismiss";

export const RichContent = () => (
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
);

RichContent.storyName = "rich content";

export const Contained = () => (
    <Div width={16}>
        <Message>Scheduled launch today at 1PM.</Message>
    </Div>
);

Contained.storyName = "contained";

export const BoxAsContent = () => (
    <Message>
        <Box slot="content">Scheduled launch today at 1PM.</Box>
        <Button>Undo</Button>
    </Message>
);

BoxAsContent.storyName = "box as content";

export const Zoom = () => (
    <Stack>
        <Div className="zoom-in">
            <Message>Scheduled launch today at 1PM.</Message>
        </Div>
        <Div className="zoom-out">
            <Message>Scheduled launch today at 1PM.</Message>
        </Div>
    </Stack>
);

Zoom.storyName = "zoom";

export const Styling = () => (
    <Stack>
        <Message border="warning-7"><strong>Scheduled launch</strong> today at 1PM. Please be cautious.</Message>
        <Message className="border-red"><strong>Scheduled launch</strong> today at 1PM. Please be cautious.</Message>
        <Message style={{ border: "1px solid red" }}><strong>Scheduled launch</strong> today at 1PM. Please be cautious.</Message>
    </Stack>
);

Styling.storyName = "styling";

export const Informative = () => (
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
);

Informative.storyName = "informative";

export const Warning = () => (
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
);

Warning.storyName = "warning";

export const Positive = () => (
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
);

Positive.storyName = "positive";

export const Negative = () => (
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
);

Negative.storyName = "negative";
