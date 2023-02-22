import { CheckMajorIcon } from "@components/icons";
import { Inline } from "@components/layout";
import { ToggleIconButton } from "@components/button";
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
            <ToggleIconButton border="warning-6" variant="secondary" aria-label="Activate"><CheckMajorIcon /></ToggleIconButton>
            <ToggleIconButton className="bg-red" variant="secondary" aria-label="Activate"><CheckMajorIcon /></ToggleIconButton>
            <ToggleIconButton style={{ backgroundColor: "red" }} variant="secondary" aria-label="Activate"><CheckMajorIcon /></ToggleIconButton>
        </Inline>
    );
