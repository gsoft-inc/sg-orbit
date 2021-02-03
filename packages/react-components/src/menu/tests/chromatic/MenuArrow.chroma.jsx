import { Inline } from "@react-components/layout";
import { MenuArrow, MenuTriggerContext } from "@react-components/menu";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/MenuArrow")
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .build())
        .build();
}

stories()
    .add("controlled", () =>
        <Inline>
            <MenuArrow open={false} />
            <MenuArrow open />
        </Inline>
    )
    .add("context", () =>
        <Inline>
            <MenuTriggerContext.Provider value={{ isOpen: false }}>
                <MenuArrow />
            </MenuTriggerContext.Provider>
            <MenuTriggerContext.Provider value={{ isOpen: true }}>
                <MenuArrow />
            </MenuTriggerContext.Provider>
        </Inline>
    )
    .add("styling", () =>
        <Inline>
            <MenuArrow open className="border-red" />
            <MenuArrow open style={{ border: "1px solid red" }} />
        </Inline>
    );
