import { CheckIcon } from "@components/icons";
import { Inline } from "@components/layout";
import { ToggleIconButton } from "@components/button";
import { createToggleIconButtonTestSuite } from "./createToggleIconButtonTestSuite";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/ToggleIconButton")
        .segment(segment)
        .build();
}

createToggleIconButtonTestSuite(<ToggleIconButton color="primary" />, stories("/primary"));

createToggleIconButtonTestSuite(<ToggleIconButton color="secondary" />, stories("/secondary"));

stories()
    .add("styling", () =>
        <Inline>
            <ToggleIconButton border="warning-7" color="secondary" aria-label="Activate"><CheckIcon /></ToggleIconButton>
            <ToggleIconButton className="bg-red" color="secondary" aria-label="Activate"><CheckIcon /></ToggleIconButton>
            <ToggleIconButton style={{ backgroundColor: "red" }} color="secondary" aria-label="Activate"><CheckIcon /></ToggleIconButton>
        </Inline>
    );




