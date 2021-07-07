import { Box } from "@react-components/box";
import { Button } from "@react-components/button";
import { Content } from "@react-components/placeholders";
import { ErrorMessage, InfoMessage, Message, PositiveMessage, WarningMessage } from "@react-components/message";
import { Heading } from "@react-components/heading";
import { InfoIcon } from "@react-components/icons";
import { Inline, Stack } from "@react-components/layout";
import { ListItem, UnorderedList } from "@react-components/list";
import { Paragraph } from "@react-components/paragraph";
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
        <Inline verticalAlign="end">
            <Message>Scheduled launch today at 1PM.</Message>
            <Message>Scheduled launch today at 1PM.<br />Please be cautious.</Message>
        </Inline>
    )
    .add("text + dismiss", () =>
        <Inline verticalAlign="end">
            <Message onDismiss={() => {}}>Scheduled launch today at 1PM.</Message>
            <Message onDismiss={() => {}}>Scheduled launch today at 1PM.<br />Please be cautious.</Message>
        </Inline>
    )
    .add("icon + text", () =>
        <Inline verticalAlign="end">
            <Message>
                <InfoIcon />
                <Content>Scheduled launch today at 1PM.</Content>
            </Message>
            <Message>
                <InfoIcon />
                <Content>Scheduled launch today at 1PM.<br /><TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious</TextLink>.</Content>
            </Message>
        </Inline>
    )
    .add("icon + text + dismiss", () =>
        <Inline verticalAlign="end">
            <Message onDismiss={() => {}}>
                <InfoIcon />
                <Content>Scheduled launch today at 1PM.</Content>
            </Message>
            <Message onDismiss={() => {}}>
                <InfoIcon />
                <Content>Scheduled launch today at 1PM.<br /><TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious</TextLink>.</Content>
            </Message>
        </Inline>
    )
    .add("icon + text + action", () =>
        <Inline verticalAlign="end">
            <Message>
                <InfoIcon />
                <Content>Scheduled launch today at 1PM.</Content>
                <Button>Undo</Button>
            </Message>
            <Message>
                <InfoIcon />
                <Content>Scheduled launch today at 1PM.<br /><TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious</TextLink>.</Content>
                <Button>Undo</Button>
            </Message>
        </Inline>
    )
    .add("icon + text + action + dismiss", () =>
        <Inline verticalAlign="end">
            <Message onDismiss={() => {}}>
                <InfoIcon />
                <Content>Scheduled launch today at 1PM.</Content>
                <Button>Undo</Button>
            </Message>
            <Message onDismiss={() => {}}>
                <InfoIcon />
                <Content>Scheduled launch today at 1PM.<br /><TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious</TextLink>.</Content>
                <Button>Undo</Button>
            </Message>
        </Inline>
    )
    .add("rich content", () =>
        <Message onDismiss={() => {}}>
            <InfoIcon />
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
            <Message>
                <InfoIcon />
                <Content>Scheduled launch today at 1PM.</Content>
            </Message>
        </div>
    )
    .add("box as content", () =>
        <Message>
            <InfoIcon />
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

[
    { name: "info", ElementType: InfoMessage },
    { name: "success", ElementType: PositiveMessage },
    { name: "warning", ElementType: WarningMessage },
    { name: "error", ElementType: ErrorMessage }
]
    .forEach(({ name, ElementType }) => {
        stories()
            .add(name, () =>
                <Stack>
                    <ElementType onDismiss={() => {}}>
                        <Content>
                            <strong>Scheduled launch</strong> today at 1PM. <TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious</TextLink>.
                        </Content>
                    </ElementType>
                    <ElementType onDismiss={() => {}}>
                        A launch is scheduled today at 1PM.
                    </ElementType>
                    <ElementType>
                        A launch is scheduled today at 1PM.
                    </ElementType>
                    <ElementType onDismiss={() => {}}>
                        <Content>
                            <Heading>Scheduled launch</Heading>
                            <Paragraph>A launch is scheduled today at 1PM. <TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious</TextLink>.</Paragraph>
                        </Content>
                    </ElementType>
                    <ElementType onDismiss={() => {}}>
                        <Content>
                            <Heading>Scheduled launch</Heading>
                            <Paragraph>A launch is scheduled today at 1PM. <TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious</TextLink>.</Paragraph>
                        </Content>
                        <Button>Cancel</Button>
                    </ElementType>
                </Stack>
            );
    });
