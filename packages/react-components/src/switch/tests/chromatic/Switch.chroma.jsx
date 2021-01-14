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
    .add("autofocus", () =>
        <Switch autoFocus>Engines</Switch>
    )
    .add("when disabled do not autofocus", () =>
        <Switch disabled autoFocus>Engines</Switch>
    )
    .add("autofocus with delay", () =>
        <Switch autoFocus={50}>Engines</Switch>
    );
