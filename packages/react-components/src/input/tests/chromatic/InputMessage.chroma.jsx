import { Inline, Stack } from "@react-components/layout";
import { InputMessage } from "@react-components/input";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("InputMessage"))
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

stories()
    .add("helpMessage", () =>
        <Stack>
            <Inline align="end">
                <InputMessage helpMessage="Enter your final destination." size="small" />
                <InputMessage helpMessage="Enter your final destination." />
                <InputMessage helpMessage="Enter your final destination." size="large" />
            </Inline>
            <div>
                <InputMessage helpMessage={<span>Enter your final destination. Here's a <a href="https://www.google.com/sky" target="_blank" rel="noreferrer">space map</a>.</span>} />
            </div>
            <Inline>
                <InputMessage helpMessage="Enter your final destination." validationState="valid" />
                <InputMessage helpMessage="Enter your final destination." validationState="invalid" />
            </Inline>
        </Stack>
    )
    .add("valid", () =>
        <Inline>
            <InputMessage helpMessage="Enter your final destination." valid="Thank you!" validationState="valid" />
            <InputMessage helpMessage="Enter your final destination." valid={<span>Thank you!, here's your <a href="https://www.sharegate.com" target="_blank" rel="noreferrer">receipt</a></span>} validationState="valid" />
        </Inline>
    )
    .add("invalid", () =>
        <Inline>
            <InputMessage helpMessage="Enter your final destination." invalid="This is not a valid destination." validationState="invalid" />
            <InputMessage helpMessage="Enter your final destination." invalid={<span>This is not a valid destination. Here's a <a href="https://www.google.com/sky" target="_blank" rel="noreferrer">space map</a> to helpMessage you.</span>} validationState="invalid" />
        </Inline>
    );
