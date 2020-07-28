import { Switch } from "@react-components/switch";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { createTestSuite } from "./createTestSuite";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Switch"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
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
        <Switch autoFocus autoFocusDelay={50}>Engines</Switch>
    )
    .add("when disabled do not autofocus with delay", () =>
        <Switch disabled autoFocus autoFocusDelay={50}>Engines</Switch>
    );
