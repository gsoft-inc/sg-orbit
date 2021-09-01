import { CrossButton } from "@react-components/button";
import { Inline } from "@react-components/layout";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/CrossButton")
        .segment(segment)
        .build();
}

stories()
    .add("default", () =>
        <Inline alignY="end">
            <CrossButton size="2xs" aria-label="Clear" />
            <CrossButton size="xs" aria-label="Clear" />
            <CrossButton size="sm" aria-label="Clear" />
            <CrossButton aria-label="Clear" />
        </Inline>
    )
    .add("condensed", () =>
        <Inline alignY="end">
            <CrossButton condensed size="2xs" aria-label="Clear" />
            <CrossButton condensed size="xs" aria-label="Clear" />
            <CrossButton condensed size="sm" aria-label="Clear" />
            <CrossButton condensed aria-label="Clear" />
        </Inline>
    );
