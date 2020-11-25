import { ErrorMessage, HelpMessage, ValidMessage } from "@react-components/field";
import { HelpIcon, InfoIcon, WarningIcon } from "@react-components/icons";
import { Inline } from "@react-components/layout";
import { ListItem, UnorderedList } from "@react-components/list";
import { Paragraph } from "@react-components/paragraph";
import { TextLink } from "@react-components/link";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("FieldMessage"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

function Align({ children }) {
    return (
        <Inline verticalAlign="center" gap={0} style={{ whiteSpace: "pre-wrap" }}>
            {children}
        </Inline>
    );
}

stories()
    .add("default", () =>
        <Inline verticalAlign="end">
            <HelpMessage size="sm">
                Enter your final destination. Here's a <TextLink href="https://www.google.com/sky" external>space map</TextLink>.
            </HelpMessage>
            <HelpMessage>
                Enter your final destination. Here's a <TextLink href="https://www.google.com/sky" external>space map</TextLink>.
            </HelpMessage>
        </Inline>
    )
    .add("icon", () =>
        <Inline verticalAlign="end">
            <HelpMessage size="sm">
                <Align>
                    <HelpIcon /> Enter your final destination. Here's a <TextLink href="https://www.google.com/sky" external>space map</TextLink>.
                </Align>
            </HelpMessage>
            <HelpMessage>
                <Align>
                    <HelpIcon /> Enter your final destination. Here's a <TextLink href="https://www.google.com/sky" external>space map</TextLink>.
                </Align>
            </HelpMessage>
        </Inline>
    )
    .add("paragraph", () =>
        <Inline verticalAlign="end">
            <HelpMessage size="sm">
                <Paragraph>
                    If two pieces of the same type of <TextLink href="#">metal touch</TextLink> in space they <TextLink href="https://www.sharegate.com" external>will permanently</TextLink> bond.
                </Paragraph>
            </HelpMessage>
            <HelpMessage>
                <Paragraph>
                    If two pieces of the same type of <TextLink href="#">metal touch</TextLink> in space they <TextLink href="https://www.sharegate.com" external>will permanently</TextLink> bond.
                </Paragraph>
            </HelpMessage>
        </Inline>
    )
    .add("list", () =>
        <Inline verticalAlign="end">
            <HelpMessage size="sm">
                <UnorderedList>
                    <ListItem>Celestial</ListItem>
                    <ListItem>Dark matter</ListItem>
                    <ListItem>Eclipse</ListItem>
                </UnorderedList>
            </HelpMessage>
            <HelpMessage>
                <UnorderedList>
                    <ListItem>Celestial</ListItem>
                    <ListItem>Dark matter</ListItem>
                    <ListItem>Eclipse</ListItem>
                </UnorderedList>
            </HelpMessage>
        </Inline>
    )
    .add("wrappers", () =>
        <HelpMessage>
            <div>
                <div>
                    Enter your final destination. Here's a <TextLink href="https://www.google.com/sky" external>space map</TextLink>.
                </div>
            </div>
        </HelpMessage>
    )
    .add("complex", () =>
        <HelpMessage>
            <Align>
                <HelpIcon /> Enter your final destination. Here's a <TextLink href="https://www.google.com/sky" external>space map</TextLink>.
            </Align>
            <Paragraph>
                If two pieces of the same type of <TextLink href="#">metal touch</TextLink> in space they <TextLink href="https://www.sharegate.com" external>will permanently</TextLink> bond.
            </Paragraph>
            <UnorderedList>
                <ListItem>Celestial</ListItem>
                <ListItem>Dark matter</ListItem>
                <ListItem>Eclipse</ListItem>
            </UnorderedList>
        </HelpMessage>
    )
    .add("fluid", () =>
        <HelpMessage fluid>
            If two pieces of the same type of <TextLink href="#">metal touch</TextLink> in space they <TextLink href="https://www.sharegate.com" external>will permanently</TextLink> bond.
        </HelpMessage>
    )
    .add("help", () =>
        <HelpMessage>
            <Align>
                <HelpIcon /> Enter your final destination. Here's a <TextLink href="https://www.google.com/sky" external>space map</TextLink>.
            </Align>
        </HelpMessage>
    )
    .add("error", () =>
        <ErrorMessage>
            <Align>
                <WarningIcon /> This is not a valid destination. Here's a <TextLink href="https://www.google.com/sky" external>space map</TextLink>.
            </Align>
        </ErrorMessage>
    )
    .add("valid", () =>
        <ValidMessage>
            <Align>
                <InfoIcon /> Thank you! Here's your <TextLink href="https://www.sharegate.com" external>receipt</TextLink>.
            </Align>
        </ValidMessage>
    )
    .add("styling", () =>
        <Inline>
            <ValidMessage className="bg-red">Thank you!</ValidMessage>
            <ValidMessage style={{ background: "red" }}>Thank you!</ValidMessage>
        </Inline>
    );
