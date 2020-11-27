import { DisclosureArrow, DisclosureProvider } from "@react-components/disclosure";
import { Inline } from "@react-components/layout";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/DisclosureArrow")
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .build())
        .build();
}

stories()
    .add("controlled", () =>
        <Inline>
            <DisclosureArrow open={false} />
            <DisclosureArrow open />
        </Inline>
    )
    .add("context", () =>
        <Inline>
            <DisclosureProvider value={{ isOpen: false }}>
                <DisclosureArrow />
            </DisclosureProvider>
            <DisclosureProvider value={{ isOpen: true }}>
                <DisclosureArrow />
            </DisclosureProvider>
        </Inline>
    )
    .add("styling", () =>
        <Inline>
            <DisclosureArrow open className="border-red" />
            <DisclosureArrow open style={{ border: "1px solid red" }} />
        </Inline>
    );
