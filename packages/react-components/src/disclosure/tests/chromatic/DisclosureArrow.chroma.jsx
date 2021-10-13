import { DisclosureArrow, DisclosureContext } from "@react-components/disclosure";
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
    .add("default", () =>
        <DisclosureArrow />,
         {
             ...paramsBuilder()
                 .validateBreakpoints()
                 .build()
         }
    )
    .add("controlled", () =>
        <Inline>
            <DisclosureArrow open={false} />
            <DisclosureArrow open />
        </Inline>
    )
    .add("context", () =>
        <Inline>
            <DisclosureContext.Provider value={{ isOpen: false }}>
                <DisclosureArrow />
            </DisclosureContext.Provider>
            <DisclosureContext.Provider value={{ isOpen: true }}>
                <DisclosureArrow />
            </DisclosureContext.Provider>
        </Inline>
    )
    .add("styling", () =>
        <Inline>
            <DisclosureArrow open className="border-red" />
            <DisclosureArrow open style={{ border: "1px solid red" }} />
        </Inline>
    );
