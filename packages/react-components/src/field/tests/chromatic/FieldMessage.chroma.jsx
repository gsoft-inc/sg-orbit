import { ErrorMessage, HelpMessage, ValidMessage } from "@react-components/field";
import { HelpIcon, InfoIcon, WarningIcon } from "@react-components/icons";
import { Inline } from "@react-components/layout";
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
            <HelpMessage size="small">
                <HelpIcon /> Enter your final destination. Here's a <a href="https://www.google.com/sky" target="_blank" rel="noreferrer">space map</a>.
            </HelpMessage>
            <HelpMessage>
                <HelpIcon /> Enter your final destination. Here's a <a href="https://www.google.com/sky" target="_blank" rel="noreferrer">space map</a>.
            </HelpMessage>
            <HelpMessage size="large">
                <HelpIcon /> Enter your final destination. Here's a <a href="https://www.google.com/sky" target="_blank" rel="noreferrer">space map</a>.
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
                <HelpIcon /> Enter your final destination. Here's a <a href="https://www.google.com/sky" target="_blank" rel="noreferrer">space map</a>.
            </HelpMessage>
        </Inline>
    )
    .add("error", () =>
        <Inline>
            <ErrorMessage>This is not a valid destination.</ErrorMessage>
            <ErrorMessage>
                <WarningIcon /> This is not a valid destination. Here's a <a href="https://www.google.com/sky" target="_blank" rel="noreferrer">space map</a>.
            </ErrorMessage>
        </Inline>
    )
    .add("valid", () =>
        <Inline>
            <ValidMessage>Thank you!</ValidMessage>
            <ValidMessage>
                <InfoIcon /> Thank you!, here's your <a href="https://www.sharegate.com" target="_blank" rel="noreferrer">receipt</a>.
            </ValidMessage>
        </Inline>
    );
