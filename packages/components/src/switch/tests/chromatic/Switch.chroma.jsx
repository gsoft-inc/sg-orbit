import { Inline } from "@components/layout";
import { Switch } from "@components/switch";
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
            <Switch border="warning-7">Engines</Switch>
            <Switch className="border-red">Engines</Switch>
            <Switch style={{ border: "0.0625rem solid red" }}>Engines</Switch>
        </Inline>
    );
