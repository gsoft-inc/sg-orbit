import { CheckIcon } from "@react-components/icons";
import { Inline } from "@react-components/layout";
import { ToggleIconButton } from "@react-components/button";
import { createToggleIconButtonTestSuite } from "./createToggleIconButtonTestSuite";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/ToggleIconButton")
        .segment(segment)
        .build();
}

createToggleIconButtonTestSuite(<ToggleIconButton variant="primary" />, stories("/primary"));

createToggleIconButtonTestSuite(<ToggleIconButton variant="secondary" />, stories("/secondary"));

stories()
    .add("styling", () =>
        <Inline>
            <ToggleIconButton className="bg-red" variant="secondary" aria-label="Activate"><CheckIcon /></ToggleIconButton>
            <ToggleIconButton style={{ backgroundColor: "red" }} variant="secondary" aria-label="Activate"><CheckIcon /></ToggleIconButton>
        </Inline>
    );




