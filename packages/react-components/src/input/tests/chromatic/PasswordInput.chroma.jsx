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
        <PasswordInput placeholder="Password" />
    )
    .add("value", () =>
        <PasswordInput value="test123!" />
    );
