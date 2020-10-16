import { Alert, CriticalAlert, InfoAlert, SuccessAlert, WarningAlert } from "@react-components/alert";
import { Box } from "@react-components/box";
import { Button } from "@react-components/button";
import { Content } from "@react-components/view";
import { Heading } from "@react-components/heading";
import { InfoIcon } from "@react-components/icons";
import { Inline, Stack } from "@react-components/layout";
import { ListItem, UnorderedList } from "@react-components/list";
import { Paragraph } from "@react-components/paragraph";
import { TextLink } from "@react-components/link";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { useEventCallback } from "@react-components/shared";
import { useState } from "react";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Alert"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .chromaticDelay(100)
            .build())
        .build();
}

stories()
    .add("text only", () =>
        <Stack>
            <Inline verticalAlign="end">
                <Alert size="sm">Scheduled launch today at 1PM.</Alert>
                <Alert size="sm">Scheduled launch today at 1PM.<br />Please be cautious.</Alert>
            </Inline>
            <Inline verticalAlign="end">
                <Alert>Scheduled launch today at 1PM.</Alert>
                <Alert>Scheduled launch today at 1PM.<br />Please be cautious.</Alert>
            </Inline>
            <Inline verticalAlign="end">
                <Alert size="lg">Scheduled launch today at 1PM.</Alert>
                <Alert size="lg">Scheduled launch today at 1PM.<br />Please be cautious.</Alert>
            </Inline>
        </Stack>
    )
    .add("text + dismiss", () =>
        <Stack>
            <Inline verticalAlign="end">
                <Alert size="sm" onDismiss={() => {}}>Scheduled launch today at 1PM.</Alert>
                <Alert size="sm" onDismiss={() => {}}>Scheduled launch today at 1PM.<br />Please be cautious.</Alert>
            </Inline>
            <Inline verticalAlign="end">
                <Alert onDismiss={() => {}}>Scheduled launch today at 1PM.</Alert>
                <Alert onDismiss={() => {}}>Scheduled launch today at 1PM.<br />Please be cautious.</Alert>
            </Inline>
            <Inline verticalAlign="end">
                <Alert size="lg" onDismiss={() => {}}>Scheduled launch today at 1PM.</Alert>
                <Alert size="lg" onDismiss={() => {}}>Scheduled launch today at 1PM.<br />Please be cautious.</Alert>
            </Inline>
        </Stack>
    )
    .add("icon + text", () =>
        <Stack>
            <Inline verticalAlign="end">
                <Alert size="sm">
                    <InfoIcon />
                    <Content>Scheduled launch today at 1PM.</Content>
                </Alert>
                <Alert size="sm">
                    <InfoIcon />
                    <Content>Scheduled launch today at 1PM.<br /><TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious</TextLink>.</Content>
                </Alert>
            </Inline>
            <Inline verticalAlign="end">
                <Alert>
                    <InfoIcon />
                    <Content>Scheduled launch today at 1PM.</Content>
                </Alert>
                <Alert>
                    <InfoIcon />
                    <Content>Scheduled launch today at 1PM.<br /><TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious</TextLink>.</Content>
                </Alert>
            </Inline>
            <Inline verticalAlign="end">
                <Alert size="lg">
                    <InfoIcon />
                    <Content>Scheduled launch today at 1PM.</Content>
                </Alert>
                <Alert size="lg">
                    <InfoIcon />
                    <Content>Scheduled launch today at 1PM.<br /><TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious</TextLink>.</Content>
                </Alert>
            </Inline>
        </Stack>
    )
    .add("icon + text + dismiss", () =>
        <Stack>
            <Inline verticalAlign="end">
                <Alert size="sm" onDismiss={() => {}}>
                    <InfoIcon />
                    <Content>Scheduled launch today at 1PM.</Content>
                </Alert>
                <Alert size="sm" onDismiss={() => {}}>
                    <InfoIcon />
                    <Content>Scheduled launch today at 1PM.<br /><TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious</TextLink>.</Content>
                </Alert>
            </Inline>
            <Inline verticalAlign="end">
                <Alert onDismiss={() => {}}>
                    <InfoIcon />
                    <Content>Scheduled launch today at 1PM.</Content>
                </Alert>
                <Alert onDismiss={() => {}}>
                    <InfoIcon />
                    <Content>Scheduled launch today at 1PM.<br /><TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious</TextLink>.</Content>
                </Alert>
            </Inline>
            <Inline verticalAlign="end">
                <Alert size="lg" onDismiss={() => {}}>
                    <InfoIcon />
                    <Content>Scheduled launch today at 1PM.</Content>
                </Alert>
                <Alert size="lg" onDismiss={() => {}}>
                    <InfoIcon />
                    <Content>Scheduled launch today at 1PM.<br /><TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious</TextLink>.</Content>
                </Alert>
            </Inline>
        </Stack>
    )
    .add("icon + text + action", () =>
        <Stack>
            <Inline verticalAlign="end">
                <Alert size="sm">
                    <InfoIcon />
                    <Content>Scheduled launch today at 1PM.</Content>
                    <Button>Undo</Button>
                </Alert>
                <Alert size="sm">
                    <InfoIcon />
                    <Content>Scheduled launch today at 1PM.<br /><TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious</TextLink>.</Content>
                    <Button>Undo</Button>
                </Alert>
            </Inline>
            <Inline verticalAlign="end">
                <Alert>
                    <InfoIcon />
                    <Content>Scheduled launch today at 1PM.</Content>
                    <Button>Undo</Button>
                </Alert>
                <Alert>
                    <InfoIcon />
                    <Content>Scheduled launch today at 1PM.<br /><TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious</TextLink>.</Content>
                    <Button>Undo</Button>
                </Alert>
            </Inline>
            <Inline verticalAlign="end">
                <Alert size="lg">
                    <InfoIcon />
                    <Content>Scheduled launch today at 1PM.</Content>
                    <Button>Undo</Button>
                </Alert>
                <Alert size="lg">
                    <InfoIcon />
                    <Content>Scheduled launch today at 1PM.<br /><TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious</TextLink>.</Content>
                    <Button>Undo</Button>
                </Alert>
            </Inline>
        </Stack>
    )
    .add("icon + text + action + dismiss", () =>
        <Stack>
            <Inline verticalAlign="end">
                <Alert size="sm" onDismiss={() => {}}>
                    <InfoIcon />
                    <Content>Scheduled launch today at 1PM.</Content>
                    <Button>Undo</Button>
                </Alert>
                <Alert size="sm" onDismiss={() => {}}>
                    <InfoIcon />
                    <Content>Scheduled launch today at 1PM.<br /><TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious</TextLink>.</Content>
                    <Button>Undo</Button>
                </Alert>
            </Inline>
            <Inline verticalAlign="end">
                <Alert onDismiss={() => {}}>
                    <InfoIcon />
                    <Content>Scheduled launch today at 1PM.</Content>
                    <Button>Undo</Button>
                </Alert>
                <Alert onDismiss={() => {}}>
                    <InfoIcon />
                    <Content>Scheduled launch today at 1PM.<br /><TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious</TextLink>.</Content>
                    <Button>Undo</Button>
                </Alert>
            </Inline>
            <Inline verticalAlign="end">
                <Alert size="lg" onDismiss={() => {}}>
                    <InfoIcon />
                    <Content>Scheduled launch today at 1PM.</Content>
                    <Button>Undo</Button>
                </Alert>
                <Alert size="lg" onDismiss={() => {}}>
                    <InfoIcon />
                    <Content>Scheduled launch today at 1PM.<br /><TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious</TextLink>.</Content>
                    <Button>Undo</Button>
                </Alert>
            </Inline>
        </Stack>
    )
    .add("rich content", () =>
        <Stack>
            <Alert size="sm" onDismiss={() => {}}>
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
            </Alert>
            <Alert onDismiss={() => {}}>
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
            </Alert>
            <Alert size="lg" onDismiss={() => {}}>
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
            </Alert>
        </Stack>
    )
    .add("contained", () =>
        <div style={{ width: "500px" }}>
            <Alert>
                <InfoIcon />
                <Content>Scheduled launch today at 1PM.</Content>
            </Alert>
        </div>
    )
    .add("box as content", () =>
        <Alert>
            <InfoIcon />
            <Box slot="content">Scheduled launch today at 1PM.</Box>
            <Button>Undo</Button>
        </Alert>
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

             const toggleAlert = useEventCallback(() => {
                 setShow(x => !x);
             });

             return (
                 <>
                     <Button onClick={toggleAlert}>Toggle</Button>
                     <br /><br />
                     <InfoAlert show={show} onDismiss={toggleAlert}>
                         <strong>Scheduled launch</strong> today at 1PM. Please be cautious.
                     </InfoAlert>
                 </>
             );
         },
         paramsBuilder().chromaticIgnore().build()
    );

[
    { name: "info", ElementType: InfoAlert },
    { name: "success", ElementType: SuccessAlert },
    { name: "warning", ElementType: WarningAlert },
    { name: "critical", ElementType: CriticalAlert }
]
    .forEach(({ name, ElementType }) => {
        stories()
            .add(name, () =>
                <Stack>
                    <ElementType size="sm" onDismiss={() => {}}>
                        <Content>
                            <strong>Scheduled launch</strong> today at 1PM. <TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious</TextLink>.
                        </Content>
                    </ElementType>
                    <ElementType onDismiss={() => {}}>
                        <Content>
                            <strong>Scheduled launch</strong> today at 1PM. <TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious</TextLink>.
                        </Content>
                    </ElementType>
                    <ElementType size="lg" onDismiss={() => {}}>
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
