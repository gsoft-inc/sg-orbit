import { Alert, CriticalAlert, InfoAlert, SuccessAlert, WarningAlert } from "@react-components/alert";
import { Button, IconButton } from "@react-components/button";
import { Content } from "@react-components/view";
import { CrossIcon, FlagIcon } from "@react-components/icons";
import { Heading, Paragraph } from "@react-components/text";
import { Inline, Stack } from "@react-components/layout";
import { ListItem, UnorderedList } from "@react-components/list";
import { TextLink } from "@react-components/link";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { useEventCallback } from "@react-components/shared";
import { useState } from "react";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Alert"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

function CloseButton(props) {
    return (
        <IconButton
            {...props}
            variant="ghost"
            color="secondary"
            shape="circular"
            aria-label="Close"
        >
            <CrossIcon />
        </IconButton>
    );
}

stories()
    .add("text only", () =>
        <Inline gap={13}>
            <Stack>
                <Alert size="sm">Scheduled launch today at 1PM.</Alert>
                <Alert>Scheduled launch today at 1PM.</Alert>
                <Alert size="lg">Scheduled launch today at 1PM.</Alert>
            </Stack>
            <Stack>
                <Alert size="sm">Scheduled launch today at 1PM.<br />Please be cautious.</Alert>
                <Alert>Scheduled launch today at 1PM.<br />Please be cautious.</Alert>
                <Alert size="lg">Scheduled launch today at 1PM.<br />Please be cautious.</Alert>
            </Stack>
        </Inline>
    )
    .add("icon + text", () =>
        <Inline gap={13}>
            <Stack>
                <Alert size="sm">
                    <FlagIcon />
                    <Content>Scheduled launch today at 1PM.</Content>
                </Alert>
                <Alert>
                    <FlagIcon />
                    <Content>Scheduled launch today at 1PM.</Content>
                </Alert>
                <Alert size="lg">
                    <FlagIcon />
                    <Content>Scheduled launch today at 1PM.</Content>
                </Alert>
            </Stack>
            <Stack>
                <Alert size="sm">
                    <FlagIcon />
                    <Content>Scheduled launch today at 1PM.<br /><TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious.</TextLink></Content>
                </Alert>
                <Alert>
                    <FlagIcon />
                    <Content>Scheduled launch today at 1PM.<br /><TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious.</TextLink></Content>
                </Alert>
                <Alert size="lg">
                    <FlagIcon />
                    <Content>Scheduled launch today at 1PM.<br /><TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious.</TextLink></Content>
                </Alert>
            </Stack>
        </Inline>
    )
    .add("icon + text + close button", () =>
        <Inline>
            <Stack>
                <Alert size="sm">
                    <FlagIcon />
                    <Content>Scheduled launch today at 1PM.</Content>
                    <CloseButton />
                </Alert>
                <Alert>
                    <FlagIcon />
                    <Content>Scheduled launch today at 1PM.</Content>
                    <CloseButton />
                </Alert>
                <Alert size="lg">
                    <FlagIcon />
                    <Content>Scheduled launch today at 1PM.</Content>
                    <CloseButton />
                </Alert>
            </Stack>
            <Stack>
                <Alert size="sm">
                    <FlagIcon />
                    <Content>Scheduled launch today at 1PM.<br />Please be cautious.</Content>
                    <CloseButton />
                </Alert>
                <Alert>
                    <FlagIcon />
                    <Content>Scheduled launch today at 1PM.<br />Please be cautious.</Content>
                    <CloseButton />
                </Alert>
                <Alert size="lg">
                    <FlagIcon />
                    <Content>Scheduled launch today at 1PM.<br />Please be cautious.</Content>
                    <CloseButton />
                </Alert>
            </Stack>
        </Inline>
    )
    .add("icon + text + custom button", () =>
        <Inline>
            <Stack>
                <Alert size="sm">
                    <FlagIcon />
                    <Content>Scheduled launch today at 1PM.</Content>
                    <Button>Undo</Button>
                </Alert>
                <Alert>
                    <FlagIcon />
                    <Content>Scheduled launch today at 1PM.</Content>
                    <Button>Undo</Button>
                </Alert>
                <Alert size="lg">
                    <FlagIcon />
                    <Content>Scheduled launch today at 1PM.</Content>
                    <Button>Undo</Button>
                </Alert>
            </Stack>
            <Stack>
                <Alert size="sm">
                    <FlagIcon />
                    <Content>Scheduled launch today at 1PM.<br />Please be cautious.</Content>
                    <Button>Undo</Button>
                </Alert>
                <Alert>
                    <FlagIcon />
                    <Content>Scheduled launch today at 1PM.<br />Please be cautious.</Content>
                    <Button>Undo</Button>
                </Alert>
                <Alert size="lg">
                    <FlagIcon />
                    <Content>Scheduled launch today at 1PM.<br />Please be cautious.</Content>
                    <Button>Undo</Button>
                </Alert>
            </Stack>
        </Inline>
    )
    .add("rich content", () =>
        <Stack>
            <Alert size="sm">
                <FlagIcon />
                <Content>
                    <Heading as="span">Scheduled launch</Heading>
                    <Paragraph>A launch is scheduled today at 1PM.</Paragraph>
                    <UnorderedList>
                        <ListItem>Be cautious</ListItem>
                        <ListItem>Close your windows</ListItem>
                    </UnorderedList>
                    <Button>Apply</Button>
                </Content>
                <CloseButton />
            </Alert>
            <Alert>
                <FlagIcon />
                <Content>
                    <Heading as="span">Scheduled launch</Heading>
                    <Paragraph>A launch is scheduled today at 1PM.</Paragraph>
                    <UnorderedList>
                        <ListItem>Be cautious</ListItem>
                        <ListItem>Close your windows</ListItem>
                    </UnorderedList>
                    <Button>Apply</Button>
                </Content>
                <CloseButton />
            </Alert>
            <Alert size="lg">
                <FlagIcon />
                <Content>
                    <Heading as="span">Scheduled launch</Heading>
                    <Paragraph>A launch is scheduled today at 1PM.</Paragraph>
                    <UnorderedList>
                        <ListItem>Be cautious</ListItem>
                        <ListItem>Close your windows</ListItem>
                    </UnorderedList>
                    <Button>Apply</Button>
                </Content>
                <CloseButton />
            </Alert>
        </Stack>
    )
    .add("boxed", () =>
        <div style={{ width: "500px" }}>
            <Alert size="sm">
                <FlagIcon />
                <Content>Scheduled launch today at 1PM.</Content>
                <CloseButton />
            </Alert>
        </div>
    )
    .add("info", () =>
        <Stack>
            <InfoAlert onDismiss={() => {}}>
                <strong>Scheduled launch</strong> today at 1PM. Please be cautious.
            </InfoAlert>
            <InfoAlert onDismiss={() => {}}>
                <Heading as="span">Scheduled launch</Heading>
                <Paragraph>A launch is scheduled today at 1PM. Please be cautious.</Paragraph>
                <Button>Apply</Button>
            </InfoAlert>
        </Stack>
    )
    .add("success", () =>
        <Stack>
            <SuccessAlert onDismiss={() => {}}>
                <strong>Scheduled launch</strong> today at 1PM. Please be cautious.
            </SuccessAlert>
            <SuccessAlert onDismiss={() => {}}>
                <Heading as="span">Scheduled launch</Heading>
                <Paragraph>A launch is scheduled today at 1PM. Please be cautious.</Paragraph>
                <Button>Apply</Button>
            </SuccessAlert>
        </Stack>
    )
    .add("warning", () =>
        <Stack>
            <WarningAlert onDismiss={() => {}}>
                <strong>Scheduled launch</strong> today at 1PM. Please be cautious.
            </WarningAlert>
            <WarningAlert onDismiss={() => {}}>
                <Heading as="span">Scheduled launch</Heading>
                <Paragraph>A launch is scheduled today at 1PM. Please be cautious.</Paragraph>
                <Button>Apply</Button>
            </WarningAlert>
        </Stack>
    )
    .add("critical", () =>
        <Stack>
            <CriticalAlert onDismiss={() => {}}>
                <strong>Scheduled launch</strong> today at 1PM. Please be cautious.
            </CriticalAlert>
            <CriticalAlert onDismiss={() => {}}>
                <Heading as="span">Scheduled launch</Heading>
                <Paragraph>A launch is scheduled today at 1PM. Please be cautious.</Paragraph>
                <Button>Apply</Button>
            </CriticalAlert>
        </Stack>
    )
    .add("variation without dismiss", () =>
        <InfoAlert><strong>Scheduled launch</strong> today at 1PM. Please be cautious.</InfoAlert>
    )
    .add("styling", () =>
        <Stack>
            <Alert className="border-red"><strong>Scheduled launch</strong> today at 1PM. Please be cautious.</Alert>
            <Alert style={{ border: "1px solid red" }}><strong>Scheduled launch</strong> today at 1PM. Please be cautious.</Alert>
        </Stack>
    )
    .add(
        "controlled dimiss",
        () => {
            const [show, setShow] = useState(true);

            const handleDismiss = useEventCallback(() => {
                setShow(x => !x);
            });

            return (
                <InfoAlert show={show} onDismiss={handleDismiss}>
                    <strong>Scheduled launch</strong> today at 1PM. Please be cautious.
                </InfoAlert>
            );
        },
        {
            ...paramsBuilder()
                .chromaticIgnore()
                .build()
        }
    );
