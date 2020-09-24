import { ErrorMessage, HelpMessage, ValidMessage } from "@react-components/field";
import { HelpIcon, InfoIcon, WarningIcon } from "@react-components/icons";
import { Inline } from "@react-components/layout";
import { Link } from "@react-components/link";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("FieldMessage"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

stories()
    .add("size", () =>
        <Inline align="end">
            <HelpMessage size="sm">
                <HelpIcon /> Enter your final destination. Here's a <Link href="https://www.google.com/sky" external>space map</Link>.
            </HelpMessage>
            <HelpMessage>
                <HelpIcon /> Enter your final destination. Here's a <Link href="https://www.google.com/sky" external>space map</Link>.
            </HelpMessage>
            <HelpMessage size="lg">
                <HelpIcon /> Enter your final destination. Here's a <Link href="https://www.google.com/sky" external>space map</Link>.
            </HelpMessage>
        </Inline>
    )
    .add("multilines", () =>
        <HelpMessage>
            Enter your final destination. Enter your final destination. Enter your final destination. Enter your final destination. Enter your final destination.
        </HelpMessage>
    )
    .add("fluid", () =>
        <HelpMessage fluid>
            Enter your final destination. Enter your final destination. Enter your final destination. Enter your final destination. Enter your final destination.
        </HelpMessage>
    )
    .add("help", () =>
        <Inline >
            <HelpMessage>Enter your final destination.</HelpMessage>
            <HelpMessage>
                <HelpIcon /> Enter your final destination. Here's a <Link href="https://www.google.com/sky" external>space map</Link>.
            </HelpMessage>
        </Inline>
    )
    .add("error", () =>
        <Inline>
            <ErrorMessage>This is not a valid destination.</ErrorMessage>
            <ErrorMessage>
                <WarningIcon /> This is not a valid destination. Here's a <Link href="https://www.google.com/sky" external>space map</Link>.
            </ErrorMessage>
        </Inline>
    )
    .add("valid", () =>
        <Inline>
            <ValidMessage>Thank you!</ValidMessage>
            <ValidMessage>
                <InfoIcon /> Thank you!, here's your <Link href="https://www.sharegate.com" external>receipt</Link>.
            </ValidMessage>
        </Inline>
    )
    .add("styling", () =>
        <Inline>
            <ValidMessage className="bg-red">Thank you!</ValidMessage>
            <ValidMessage style={{ background: "red" }}>Thank you!</ValidMessage>
        </Inline>
    );
