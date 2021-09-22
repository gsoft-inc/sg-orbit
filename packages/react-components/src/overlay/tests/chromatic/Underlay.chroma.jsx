import { Underlay } from "@react-components/overlay";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Underlay")
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .chromaticPauseAnimationAtEnd()
            .build())
        .build();
}

stories()
    .add("default", () =>
        <Underlay />
    )
    .add("styled system", () =>
        <Underlay border="sunray-10" />
    )
    .add("className", () =>
        <Underlay className="border-red" />
    )
    .add("style", () =>
        <Underlay style={{ border: "1px solid red" }} />
    );
