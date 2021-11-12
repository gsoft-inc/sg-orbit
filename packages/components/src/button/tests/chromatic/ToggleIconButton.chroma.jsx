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

createToggleIconButtonTestSuite(<ToggleIconButton variant="outline" />, stories("/outline"));

createToggleIconButtonTestSuite(<ToggleIconButton variant="solid" />, stories("/solid"));

createToggleIconButtonTestSuite(<ToggleIconButton variant="ghost" />, stories("/ghost"));

stories()
    .add("styling", () =>
        <Inline>
            <ToggleIconButton border="warning-7" color="basic" aria-label="Activate"><CheckIcon /></ToggleIconButton>
            <ToggleIconButton className="bg-red" color="basic" aria-label="Activate"><CheckIcon /></ToggleIconButton>
            <ToggleIconButton style={{ backgroundColor: "red" }} color="basic" aria-label="Activate"><CheckIcon /></ToggleIconButton>
        </Inline>
    );
