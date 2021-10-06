import { Div } from "@react-components/html";
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
    .add("zoom", () =>
        <Inline>
            <Div className="zoom-in">
                <Switch>Engines</Switch>
            </Div>
            <Div className="zoom-out">
                <Switch>Engines</Switch>
            </Div>
        </Inline>
    )
    .add("styling", () =>
        <Inline>
            <Switch border="sunray-10">Engines</Switch>
            <Switch className="border-red">Engines</Switch>
            <Switch style={{ border: "1px solid red" }}>Engines</Switch>
        </Inline>
    );
