import { Alert, CriticalAlert, InfoAlert, SuccessAlert, WarningAlert } from "@react-components/alert";
import { Button, CloseButton } from "@react-components/button";
import { Content } from "@react-components/view";
import { Heading, Paragraph } from "@react-components/text";
import { InfoIcon } from "@react-components/icons";
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

stories()
    .add("text only", () =>
        <Stack>
            <Inline align="end">
                <Alert size="sm">Scheduled launch today at 1PM.</Alert>
                <Alert size="sm">Scheduled launch today at 1PM.<br />Please be cautious.</Alert>
            </Inline>
            <Inline align="end">
                <Alert>Scheduled launch today at 1PM.</Alert>
                <Alert>Scheduled launch today at 1PM.<br />Please be cautious.</Alert>
            </Inline>
            <Inline align="end">
                <Alert size="lg">Scheduled launch today at 1PM.</Alert>
                <Alert size="lg">Scheduled launch today at 1PM.<br />Please be cautious.</Alert>
            </Inline>
        </Stack>
    )
    .add("icon + text", () =>
        <Stack>
            <Inline align="end">
                <Alert size="sm">
                    <InfoIcon />
                    <Content>Scheduled launch today at 1PM.</Content>
                </Alert>
                <Alert size="sm">
                    <InfoIcon />
                    <Content>Scheduled launch today at 1PM.<br /><TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious.</TextLink></Content>
                </Alert>
            </Inline>
            <Inline align="end">
                <Alert>
                    <InfoIcon />
                    <Content>Scheduled launch today at 1PM.</Content>
                </Alert>
                <Alert>
                    <InfoIcon />
                    <Content>Scheduled launch today at 1PM.<br /><TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious.</TextLink></Content>
                </Alert>
            </Inline>
            <Inline align="end">
                <Alert size="lg">
                    <InfoIcon />
                    <Content>Scheduled launch today at 1PM.</Content>
                </Alert>
                <Alert size="lg">
                    <InfoIcon />
                    <Content>Scheduled launch today at 1PM.<br /><TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious.</TextLink></Content>
                </Alert>
            </Inline>
        </Stack>
    )
    .add("icon + text + close button", () =>
        <Stack>
            <Inline align="end">
                <Alert size="sm">
                    <InfoIcon />
                    <Content>Scheduled launch today at 1PM.</Content>
                    <CloseButton />
                </Alert>
                <Alert size="sm">
                    <InfoIcon />
                    <Content>Scheduled launch today at 1PM.<br /><TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious.</TextLink></Content>
                    <CloseButton />
                </Alert>
            </Inline>
            <Inline align="end">
                <Alert>
                    <InfoIcon />
                    <Content>Scheduled launch today at 1PM.</Content>
                    <CloseButton />
                </Alert>
                <Alert>
                    <InfoIcon />
                    <Content>Scheduled launch today at 1PM.<br /><TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious.</TextLink></Content>
                    <CloseButton />
                </Alert>
            </Inline>
            <Inline align="end">
                <Alert size="lg">
                    <InfoIcon />
                    <Content>Scheduled launch today at 1PM.</Content>
                    <CloseButton />
                </Alert>
                <Alert size="lg">
                    <InfoIcon />
                    <Content>Scheduled launch today at 1PM.<br /><TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious.</TextLink></Content>
                    <CloseButton />
                </Alert>
            </Inline>
        </Stack>
    )
    .add("icon + text + custom button", () =>
        <Stack>
            <Inline align="end">
                <Alert size="sm">
                    <InfoIcon />
                    <Content>Scheduled launch today at 1PM.</Content>
                    <Button>Undo</Button>
                </Alert>
                <Alert size="sm">
                    <InfoIcon />
                    <Content>Scheduled launch today at 1PM.<br /><TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious.</TextLink></Content>
                    <Button>Undo</Button>
                </Alert>
            </Inline>
            <Inline align="end">
                <Alert>
                    <InfoIcon />
                    <Content>Scheduled launch today at 1PM.</Content>
                    <Button>Undo</Button>
                </Alert>
                <Alert>
                    <InfoIcon />
                    <Content>Scheduled launch today at 1PM.<br /><TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious.</TextLink></Content>
                    <Button>Undo</Button>
                </Alert>
            </Inline>
            <Inline align="end">
                <Alert size="lg">
                    <InfoIcon />
                    <Content>Scheduled launch today at 1PM.</Content>
                    <Button>Undo</Button>
                </Alert>
                <Alert size="lg">
                    <InfoIcon />
                    <Content>Scheduled launch today at 1PM.<br /><TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious.</TextLink></Content>
                    <Button>Undo</Button>
                </Alert>
            </Inline>
        </Stack>
    )
    .add("rich content", () =>
        <Stack>
            <Alert size="sm">
                <InfoIcon />
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
                <InfoIcon />
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
                <InfoIcon />
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
                <InfoIcon />
                <Content>Scheduled launch today at 1PM.</Content>
                <CloseButton />
            </Alert>
        </div>
    )
    .add("info", () =>
        <Stack>
            <InfoAlert size="sm" onDismiss={() => {}}>
                <strong>Scheduled launch</strong> today at 1PM. <TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious.</TextLink>
            </InfoAlert>
            <InfoAlert onDismiss={() => {}}>
                <strong>Scheduled launch</strong> today at 1PM. <TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious.</TextLink>
            </InfoAlert>
            <InfoAlert size="lg" onDismiss={() => {}}>
                <strong>Scheduled launch</strong> today at 1PM. <TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious.</TextLink>
            </InfoAlert>
            <InfoAlert onDismiss={() => {}}>
                <Heading as="span">Scheduled launch</Heading>
                <Paragraph>A launch is scheduled today at 1PM. <TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious.</TextLink></Paragraph>
                <Button>Apply</Button>
            </InfoAlert>
        </Stack>
    )
    .add("success", () =>
        <Stack>
            <SuccessAlert onDismiss={() => {}}>
                <strong>Scheduled launch</strong> today at 1PM. <TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious.</TextLink>
            </SuccessAlert>
            <SuccessAlert onDismiss={() => {}}>
                <Heading as="span">Scheduled launch</Heading>
                <Paragraph>A launch is scheduled today at 1PM. <TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious.</TextLink></Paragraph>
                <Button variant="outline">Apply</Button>
            </SuccessAlert>
        </Stack>
    )
    .add("warning", () =>
        <Stack>
            <WarningAlert onDismiss={() => {}}>
                <strong>Scheduled launch</strong> today at 1PM. <TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious.</TextLink>
            </WarningAlert>
            <WarningAlert onDismiss={() => {}}>
                <Heading as="span">Scheduled launch</Heading>
                <Paragraph>A launch is scheduled today at 1PM. <TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious.</TextLink></Paragraph>
                <Button variant="outline">Apply</Button>
            </WarningAlert>
        </Stack>
    )
    .add("critical", () =>
        <Stack>
            <CriticalAlert onDismiss={() => {}}>
                <strong>Scheduled launch</strong> today at 1PM. <TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious.</TextLink>
            </CriticalAlert>
            <CriticalAlert onDismiss={() => {}}>
                <Heading as="span">Scheduled launch</Heading>
                <Paragraph>A launch is scheduled today at 1PM. <TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious.</TextLink></Paragraph>
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
    .add("controlled dimiss",
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
         paramsBuilder().chromaticIgnore().build()
    );
