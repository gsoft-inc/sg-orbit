import { Box } from "@react-components/box";
import { Button } from "@react-components/button";
import { Content } from "@react-components/placeholders";
import { Heading, Paragraph } from "@react-components/typography";
import { Inline, Stack } from "@react-components/layout";
import { ListItem, UnorderedList } from "@react-components/list";
import { Message } from "@react-components/message";
import { TextLink } from "@react-components/link";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Message")
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .build())
        .build();
}

stories()
    .add("text only", () =>
        <Inline alignY="end">
            <Message>Scheduled launch today at 1PM.</Message>
            <Message>Scheduled launch today at 1PM.<br />Please be cautious.</Message>
        </Inline>
    )
    .add("text + dismiss", () =>
        <Inline alignY="end">
            <Message onDismiss={() => {}}>Scheduled launch today at 1PM.</Message>
            <Message onDismiss={() => {}}>Scheduled launch today at 1PM.<br />Please be cautious.</Message>
        </Inline>
    )
    .add("text + action", () =>
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
    .add("text + action + dismiss", () =>
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
    .add("rich content", () =>
        <Message onDismiss={() => {}}>
            <Content>
                <Heading>Scheduled launch</Heading>
                <Paragraph>A launch is scheduled today at 1PM.</Paragraph>
                <UnorderedList>
                    <ListItem>Be cautious</ListItem>
                    <ListItem>Close your windows</ListItem>
                </UnorderedList>
            </Content>
            <Button>Undo</Button>
        </Message>
    )
    .add("contained", () =>
        <div style={{ width: "500px" }}>
            <Message>Scheduled launch today at 1PM.</Message>
        </div>
    )
    .add("box as content", () =>
        <Message>
            <Box slot="content">Scheduled launch today at 1PM.</Box>
            <Button>Undo</Button>
        </Message>
    )
    .add("styling", () =>
        <Stack>
            <Message className="border-red"><strong>Scheduled launch</strong> today at 1PM. Please be cautious.</Message>
            <Message style={{ border: "1px solid red" }}><strong>Scheduled launch</strong> today at 1PM. Please be cautious.</Message>
        </Stack>
    );

["informative", "warning", "positive", "negative"].forEach(variant => {
    stories()
        .add(variant, () =>
            <Stack>
                <Message variant={variant} onDismiss={() => {}}>
                    <Content>
                        <strong>Scheduled launch</strong> today at 1PM. <TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious</TextLink>.
                    </Content>
                </Message>
                <Message variant={variant} onDismiss={() => {}}>
                    A launch is scheduled today at 1PM.
                </Message>
                <Message variant={variant}>
                    A launch is scheduled today at 1PM.
                </Message>
                <Message variant={variant} onDismiss={() => {}}>
                    <Content>
                        <Heading>Scheduled launch</Heading>
                        <Paragraph>A launch is scheduled today at 1PM. <TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious</TextLink>.</Paragraph>
                    </Content>
                </Message>
                <Message variant={variant} onDismiss={() => {}}>
                    <Content>
                        <Heading>Scheduled launch</Heading>
                        <Paragraph>A launch is scheduled today at 1PM. <TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious</TextLink>.</Paragraph>
                    </Content>
                    <Button>Cancel</Button>
                </Message>
            </Stack>
        );
});
