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
    .add("help", () =>
        <Stack>
            <Inline align="end">
                <InputMessage help="Enter your final destination." size="small" />
                <InputMessage help="Enter your final destination." />
                <InputMessage help="Enter your final destination." size="large" />
            </Inline>
            <div>
                <InputMessage help={<span>Enter your final destination. Here's a <a href="https://www.google.com/sky" target="_blank" rel="noreferrer">space map</a>.</span>} />
            </div>
            <Inline>
                <InputMessage help="Enter your final destination." validationState="valid" />
                <InputMessage help="Enter your final destination." validationState="invalid" />
            </Inline>
        </Stack>
    )
    .add("valid", () =>
        <Inline>
            <InputMessage help="Enter your final destination." valid="Thank you!" validationState="valid" />
            <InputMessage help="Enter your final destination." valid={<span>Thank you!, here's your <a href="https://www.sharegate.com" target="_blank" rel="noreferrer">receipt</a></span>} validationState="valid" />
        </Inline>
    )
    .add("invalid", () =>
        <Inline>
            <InputMessage help="Enter your final destination." invalid="This is not a valid destination." validationState="invalid" />
            <InputMessage help="Enter your final destination." invalid={<span>This is not a valid destination. Here's a <a href="https://www.google.com/sky" target="_blank" rel="noreferrer">space map</a> to help you.</span>} validationState="invalid" />
        </Inline>
    );
