import { Div, LI, OL, UL } from "@components/html";
import { ErrorMessage, HelpMessage, ValidMessage } from "@components/field";
import { HelpIcon, InfoIcon, WarningIcon } from "@components/icons";
import { Inline, Stack } from "@components/layout";
import { Paragraph } from "@components/typography";
import { TextLink } from "@components/link";

export default {
    title: "Chromatic/FieldMessage",
    component: HelpMessage
};

function Align({ children }) {
    return (
        <Inline alignY="center" gap={0} whiteSpace="pre-wrap">
            {children}
        </Inline>
    );
}

export const Default = () =>
    <HelpMessage>
        Enter your final destination. Here's a <TextLink href="https://www.google.com/sky" external>space map</TextLink>.
    </HelpMessage>;

export const Icon = () =>
    <HelpMessage>
        <Align>
            <HelpIcon /> Enter your final destination. Here's a <TextLink href="https://www.google.com/sky" external>space map</TextLink>.
        </Align>
    </HelpMessage>;

export const FieldMessageParagraph = () =>
    <HelpMessage>
        <Paragraph>
            If two pieces of the same type of <TextLink href="#">metal touch</TextLink> in space they <TextLink href="https://www.sharegate.com" external>will permanently</TextLink> bond.
        </Paragraph>
    </HelpMessage>;

export const List = () =>
    <Inline>
        <HelpMessage>
            <UL>
                <LI>Celestial</LI>
                <LI>Dark matter</LI>
                <LI>Eclipse</LI>
            </UL>
        </HelpMessage>
        <HelpMessage>
            <OL>
                <LI>Celestial</LI>
                <LI>Dark matter</LI>
                <LI>Eclipse</LI>
            </OL>
        </HelpMessage>
    </Inline>;

export const Wrappers = () =>
    <HelpMessage>
        <Div>
            <Div>
                Enter your final destination. Here's a <TextLink href="https://www.google.com/sky" external>space map</TextLink>.
            </Div>
        </Div>
    </HelpMessage>;

export const Complex = () =>
    <HelpMessage>
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
    </HelpMessage>;

export const Fluid = () =>
    <HelpMessage fluid>
        If two pieces of the same type of <TextLink href="#">metal touch</TextLink> in space they <TextLink href="https://www.sharegate.com" external>will permanently</TextLink> bond.
    </HelpMessage>;

export const Help = () =>
    <HelpMessage>
        <Align>
            <HelpIcon /> Enter your final destination. Here's a <TextLink href="https://www.google.com/sky" external>space map</TextLink>.
        </Align>
    </HelpMessage>;

export const Error = () =>
    <ErrorMessage>
        <Align>
            <WarningIcon /> This is not a valid destination. Here's a <TextLink href="https://www.google.com/sky" external>space map</TextLink>.
        </Align>
    </ErrorMessage>;

export const Valid = () =>
    <ValidMessage>
        <Align>
            <InfoIcon /> Thank you! Here's your <TextLink href="https://www.sharegate.com" external>receipt</TextLink>.
        </Align>
    </ValidMessage>;

export const Zoom = () =>
    <Stack>
        <Div className="zoom-in">
            <HelpMessage>
                Enter your final destination. Here's a <TextLink href="https://www.google.com/sky" external>space map</TextLink>.
            </HelpMessage>
        </Div>
        <Div className="zoom-out">
            <HelpMessage>
                Enter your final destination. Here's a <TextLink href="https://www.google.com/sky" external>space map</TextLink>.
            </HelpMessage>
        </Div>
    </Stack>;

export const Styling = () =>
    <Inline>
        <ValidMessage border="warning-7">Thank you!</ValidMessage>
        <ValidMessage className="bg-red">Thank you!</ValidMessage>
        <ValidMessage style={{ background: "red" }}>Thank you!</ValidMessage>
    </Inline>;

Default.storyName = "default";
Icon.storyName = "icon";
FieldMessageParagraph.storyName = "paragraph";
List.storyName = "list";
Wrappers.storyName = "wrappers";
Complex.storyName = "complex";
Fluid.storyName = "fluid";
Help.storyName = "help";
Error.storyName = "error";
Valid.storyName = "valid";
Zoom.storyName = "zoom";
Styling.storyName = "styling";
