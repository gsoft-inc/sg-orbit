import { ArrowIcon } from "@react-components/icons";
import { Box } from "@react-components/box";
import { Button } from "@react-components/button";
import { Content } from "@react-components/view";
import { Disclosure, DisclosureArrow, DisclosureProvider } from "@react-components/disclosure";
import { Inline } from "@react-components/layout";
import { Text } from "@react-components/text";
import { TextLink } from "@react-components/link";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("DisclosureArrow"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
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
