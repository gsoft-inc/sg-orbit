import { ErrorMessage, HelpMessage, ValidMessage } from "@react-components/field";
import { HelpIcon, InfoIcon, WarningIcon } from "@react-components/icons";
import { Inline } from "@react-components/layout";
import { ListItem, UnorderedList } from "@react-components/list";
import { Paragraph } from "@react-components/typography";
import { TextLink } from "@react-components/link";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/FieldMessage")
        .segment(segment)
        .build();
}

function Align({ children }) {
    return (
        <Inline alignY="center" gap={0} style={{ whiteSpace: "pre-wrap" }}>
            {children}
        </Inline>
    );
}

stories()
    .add("default", () =>
        <HelpMessage>
                Enter your final destination. Here's a <TextLink href="https://www.google.com/sky" external>space map</TextLink>.
        </HelpMessage>
    )
    .add("icon", () =>
        <HelpMessage>
            <Align>
                <HelpIcon /> Enter your final destination. Here's a <TextLink href="https://www.google.com/sky" external>space map</TextLink>.
            </Align>
        </HelpMessage>
    )
    .add("paragraph", () =>
        <HelpMessage>
            <Paragraph>
                    If two pieces of the same type of <TextLink href="#">metal touch</TextLink> in space they <TextLink href="https://www.sharegate.com" external>will permanently</TextLink> bond.
            </Paragraph>
        </HelpMessage>
    )
    .add("list", () =>
        <HelpMessage>
            <UnorderedList>
                <ListItem>Celestial</ListItem>
                <ListItem>Dark matter</ListItem>
                <ListItem>Eclipse</ListItem>
            </UnorderedList>
        </HelpMessage>
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
