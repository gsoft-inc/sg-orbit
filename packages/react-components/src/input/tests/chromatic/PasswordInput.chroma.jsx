import { Inline } from "@react-components/layout";
import { PasswordInput } from "@react-components/input";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("PasswordInput"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

stories()
    .add("default", () =>
        <Inline verticalAlign="end">
            <PasswordInput placeholder="Password" />
            <PasswordInput size="lg" placeholder="Password" />
        </Inline>
    )
    .add("value", () =>
        <Inline verticalAlign="end">
            <PasswordInput value="test123!" />
            <PasswordInput value="test123!" size="lg" />
        </Inline>
    );
