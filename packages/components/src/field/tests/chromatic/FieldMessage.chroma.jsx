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

export const Default = () => (
    <HelpMessage>
        Enter your final destination. Here's a <TextLink href="https://www.google.com/sky" external>space map</TextLink>.
    </HelpMessage>
);

Default.storyName = "default";

export const Icon = () => (
    <HelpMessage>
        <Align>
            <HelpIcon /> Enter your final destination. Here's a <TextLink href="https://www.google.com/sky" external>space map</TextLink>.
        </Align>
    </HelpMessage>
);

Icon.storyName = "icon";

export const FieldMessageParagraph = () => (
    <HelpMessage>
        <Paragraph>
            If two pieces of the same type of <TextLink href="#">metal touch</TextLink> in space they <TextLink href="https://www.sharegate.com" external>will permanently</TextLink> bond.
        </Paragraph>
    </HelpMessage>
);

FieldMessageParagraph.storyName = "paragraph";

export const List = () => (
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
    </Inline>
);

List.storyName = "list";

export const Wrappers = () => (
    <HelpMessage>
        <Div>
            <Div>
                Enter your final destination. Here's a <TextLink href="https://www.google.com/sky" external>space map</TextLink>.
            </Div>
        </Div>
    </HelpMessage>
);

Wrappers.storyName = "wrappers";

export const Complex = () => (
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
    </HelpMessage>
);

Complex.storyName = "complex";

export const Fluid = () => (
    <HelpMessage fluid>
        If two pieces of the same type of <TextLink href="#">metal touch</TextLink> in space they <TextLink href="https://www.sharegate.com" external>will permanently</TextLink> bond.
    </HelpMessage>
);

Fluid.storyName = "fluid";

export const Help = () => (
    <HelpMessage>
        <Align>
            <HelpIcon /> Enter your final destination. Here's a <TextLink href="https://www.google.com/sky" external>space map</TextLink>.
        </Align>
    </HelpMessage>
);

Help.storyName = "help";

export const Error = () => (
    <ErrorMessage>
        <Align>
            <WarningIcon /> This is not a valid destination. Here's a <TextLink href="https://www.google.com/sky" external>space map</TextLink>.
        </Align>
    </ErrorMessage>
);

Error.storyName = "error";

export const Valid = () => (
    <ValidMessage>
        <Align>
            <InfoIcon /> Thank you! Here's your <TextLink href="https://www.sharegate.com" external>receipt</TextLink>.
        </Align>
    </ValidMessage>
);

Valid.storyName = "valid";

export const Zoom = () => (
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
    </Stack>
);

Zoom.storyName = "zoom";

export const Styling = () => (
    <Inline>
        <ValidMessage border="warning-7">Thank you!</ValidMessage>
        <ValidMessage className="bg-red">Thank you!</ValidMessage>
        <ValidMessage style={{ background: "red" }}>Thank you!</ValidMessage>
    </Inline>
);

Styling.storyName = "styling";
