import { Inline } from "@react-components/layout";
import { ToggleButton } from "@react-components/button";
import { createToggleButtonTestSuite } from "./createToggleButtonTestSuite";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/ToggleButton")
        .segment(segment)
        .build();
}

createToggleButtonTestSuite(<ToggleButton variant="primary" />, stories("/primary"));

createToggleButtonTestSuite(<ToggleButton variant="secondary" />, stories("/secondary"));

stories()
    .add("styling", () =>
        <Inline>
            <ToggleButton border="sunray-10" variant="secondary">Cutoff</ToggleButton>
            <ToggleButton className="bg-red" variant="secondary">Cutoff</ToggleButton>
            <ToggleButton style={{ backgroundColor: "red" }} variant="secondary">Cutoff</ToggleButton>
        </Inline>
    );




