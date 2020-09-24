import { ErrorMessage, HelpMessage, ValidMessage } from "@react-components/field";
import { HelpIcon, InfoIcon, WarningIcon } from "@react-components/icons";
import { Inline } from "@react-components/layout";
import { Link } from "@react-components/link";
import { ListItem, UnorderedList } from "@react-components/list";
import { Paragraph } from "@react-components/text";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

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
        <Inline align="center" gap={0} style={{ whiteSpace: "pre-wrap" }}>
            {children}
        </Inline>
    );
}

stories()
    .add("default", () =>
        <Inline align="end">
            <HelpMessage size="sm">
                Enter your final destination. Here's a <Link href="https://www.google.com/sky" external>space map</Link>.
            </HelpMessage>
            <HelpMessage>
                Enter your final destination. Here's a <Link href="https://www.google.com/sky" external>space map</Link>.
            </HelpMessage>
            <HelpMessage size="lg">
                Enter your final destination. Here's a <Link href="https://www.google.com/sky" external>space map</Link>.
            </HelpMessage>
        </Inline>
    )
    .add("icon", () =>
        <Inline align="end">
            <HelpMessage size="sm">
                <Align>
                    <HelpIcon /> Enter your final destination. Here's a <Link href="https://www.google.com/sky" external>space map</Link>.
                </Align>
            </HelpMessage>
            <HelpMessage>
                <Align>
                    <HelpIcon /> Enter your final destination. Here's a <Link href="https://www.google.com/sky" external>space map</Link>.
                </Align>
            </HelpMessage>
            <HelpMessage size="lg">
                <Align>
                    <HelpIcon /> Enter your final destination. Here's a <Link href="https://www.google.com/sky" external>space map</Link>.
                </Align>
            </HelpMessage>
        </Inline>
    )
    .add("paragraph", () =>
        <Inline align="end">
            <HelpMessage size="sm">
                <Paragraph>
                    If two pieces of the same type of <Link href="#">metal touch</Link> in space they <Link href="https://www.sharegate.com" external>will permanently</Link> bond.
                </Paragraph>
            </HelpMessage>
            <HelpMessage>
                <Paragraph>
                    If two pieces of the same type of <Link href="#">metal touch</Link> in space they <Link href="https://www.sharegate.com" external>will permanently</Link> bond.
                </Paragraph>
            </HelpMessage>
            <HelpMessage size="lg">
                <Paragraph>
                    If two pieces of the same type of <Link href="#">metal touch</Link> in space they <Link href="https://www.sharegate.com" external>will permanently</Link> bond.
                </Paragraph>
            </HelpMessage>
        </Inline>
    )
    .add("list", () =>
        <Inline align="end">
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
            <HelpMessage size="lg">
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
                    Enter your final destination. Here's a <Link href="https://www.google.com/sky" external>space map</Link>.
                </div>
            </div>
        </HelpMessage>
    )
    .add("complex", () =>
        <HelpMessage>
            <Align>
                <HelpIcon /> Enter your final destination. Here's a <Link href="https://www.google.com/sky" external>space map</Link>.
            </Align>
            <Paragraph>
                If two pieces of the same type of <Link href="#">metal touch</Link> in space they <Link href="https://www.sharegate.com" external>will permanently</Link> bond.
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
            If two pieces of the same type of <Link href="#">metal touch</Link> in space they <Link href="https://www.sharegate.com" external>will permanently</Link> bond.
        </HelpMessage>
    )
    .add("help", () =>
        <HelpMessage>
            <Align>
                <HelpIcon /> Enter your final destination. Here's a <Link href="https://www.google.com/sky" external>space map</Link>.
            </Align>
        </HelpMessage>
    )
    .add("error", () =>
        <ErrorMessage>
            <Align>
                <WarningIcon /> This is not a valid destination. Here's a <Link href="https://www.google.com/sky" external>space map</Link>.
            </Align>
        </ErrorMessage>
    )
    .add("valid", () =>
        <ValidMessage>
            <Align>
                <InfoIcon /> Thank you! Here's your <Link href="https://www.sharegate.com" external>receipt</Link>.
            </Align>
        </ValidMessage>
    )
    .add("styling", () =>
        <Inline>
            <ValidMessage className="bg-red">Thank you!</ValidMessage>
            <ValidMessage style={{ background: "red" }}>Thank you!</ValidMessage>
        </Inline>
    );
