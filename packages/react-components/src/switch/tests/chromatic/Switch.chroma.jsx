import { Inline } from "@react-components/layout";
import { Switch } from "@react-components/switch";
import { createTestSuite } from "./createTestSuite";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Switch")
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .build())
        .build();
}

createTestSuite(<Switch />, stories("/unchecked"));

createTestSuite(<Switch defaultChecked />, stories("/checked"));

stories()
    .add("styling", () =>
        <Inline>
            <Switch border="sunray-10">Engines</Switch>
            <Switch className="border-red">Engines</Switch>
            <Switch style={{ border: "1px solid red" }}>Engines</Switch>
        </Inline>
    );
