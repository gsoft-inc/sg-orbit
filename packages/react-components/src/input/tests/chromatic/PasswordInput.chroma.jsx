import { PasswordInput } from "@react-components/input";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/PasswordInput")
        .segment(segment)
        .build();
}

stories()
    .add("default", () =>
        <PasswordInput placeholder="Password" />
    )
    .add("value", () =>
        <PasswordInput value="test123!" />
    );
