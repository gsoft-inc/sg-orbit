import { Inline } from "@components/layout";
import { ToggleButton } from "@components/button";
import { createToggleButtonTestSuite } from "./createToggleButtonTestSuite";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/ToggleButton")
        .segment(segment)
        .build();
}

createToggleButtonTestSuite(<ToggleButton color="primary" />, stories("/primary"));

createToggleButtonTestSuite(<ToggleButton color="secondary" />, stories("/secondary"));

stories()
    .add("styling", () =>
        <Inline>
            <ToggleButton border="warning-7" color="secondary">Cutoff</ToggleButton>
            <ToggleButton className="bg-red" color="secondary">Cutoff</ToggleButton>
            <ToggleButton style={{ backgroundColor: "red" }} color="secondary">Cutoff</ToggleButton>
        </Inline>
    );




