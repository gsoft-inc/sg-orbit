import { Inline } from "@react-components/layout";
import { PasswordInput } from "@react-components/input";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("PasswordInput"))
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

stories()
    .add("default", () =>
        <Inline align="end">
            <PasswordInput size="small" placeholder="Password" />
            <PasswordInput placeholder="Password" />
            <PasswordInput size="large" placeholder="Password" />
        </Inline>
    )
    .add("value", () =>
        <Inline align="end">
            <PasswordInput value="test123!" size="small" />
            <PasswordInput value="test123!" />
            <PasswordInput value="test123!" size="large" />
        </Inline>
    );
