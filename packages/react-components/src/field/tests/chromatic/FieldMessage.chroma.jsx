import { Div, LI, OL, UL } from "@react-components/html";
import { ErrorMessage, HelpMessage, ValidMessage } from "@react-components/field";
import { HelpIcon, InfoIcon, WarningIcon } from "@react-components/icons";
import { Inline } from "@react-components/layout";
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
        <Inline alignY="center" gap={0} whiteSpace="pre-wrap">
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
        <ValidMessage>
            <Align>
                <HelpIcon /> Enter your final destination. Here's a <TextLink href="https://www.google.com/sky" external>space map</TextLink>.
            </Align>
        </ValidMessage>
    )
    .add("paragraph", () =>
        <ValidMessage>
            <Paragraph>
                If two pieces of the same type of <TextLink href="#">metal touch</TextLink> in space they <TextLink href="https://www.sharegate.com" external>will permanently</TextLink> bond.
            </Paragraph>
        </ValidMessage>
    )
    .add("list", () =>
        <Inline>
            <ValidMessage>
                <UL>
                    <LI>Celestial</LI>
                    <LI>Dark matter</LI>
                    <LI>Eclipse</LI>
                </UL>
            </ValidMessage>
            <ValidMessage>
                <OL>
                    <LI>Celestial</LI>
                    <LI>Dark matter</LI>
                    <LI>Eclipse</LI>
                </OL>
            </ValidMessage>
        </Inline>
    )
    .add("wrappers", () =>
        <HelpMessage>
            <Div>
                <Div>
                    Enter your final destination. Here's a <TextLink href="https://www.google.com/sky" external>space map</TextLink>.
                </Div>
            </Div>
        </HelpMessage>
    )
    .add("complex", () =>
        <ValidMessage>
            <Align>
                <HelpIcon /> Enter your final destination. Here's a <TextLink href="https://www.google.com/sky" external>space map</TextLink>.
            </Align>
            <Paragraph>
                If two pieces of the same type of <TextLink href="#">metal touch</TextLink> in space they <TextLink href="https://www.sharegate.com" external>will permanently</TextLink> bond.
            </Paragraph>
            <UL>
                <LI>Celestial</LI>
                <LI>Dark matter</LI>
                <LI>Eclipse</LI>
            </UL>
        </ValidMessage>
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
            <ValidMessage border="sunray-10">Thank you!</ValidMessage>
            <ValidMessage className="bg-red">Thank you!</ValidMessage>
            <ValidMessage style={{ background: "red" }}>Thank you!</ValidMessage>
        </Inline>
    );
