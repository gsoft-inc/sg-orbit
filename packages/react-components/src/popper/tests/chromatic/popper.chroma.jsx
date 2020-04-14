import { RedBoxPopper, RedBoxPopperWithBoundary } from "./components";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Popper"))
        .segment(segment)
        .parameters(
            paramsBuilder()
                .canvasLayout({ width: "30%", marginTop: "100px" })
                .chromaticDelay(100)
                .chromaticPauseAnimationAtEnd()
                .build()
        )
        .build();
}

stories()
    .add("close", () =>
        <RedBoxPopper />
    )
    .add("open", () =>
        <RedBoxPopper defaultOpen />
    )
    .add("position auto", () =>
        <RedBoxPopper defaultOpen position="auto" />
    )
    .add("position auto-start", () =>
        <RedBoxPopper defaultOpen position="auto-start" />
    )
    .add("position auto-end", () =>
        <RedBoxPopper defaultOpen position="auto-end" />
    )
    .add("position top", () =>
        <RedBoxPopper defaultOpen position="top" pinned />
    )
    .add("position top-start", () =>
        <RedBoxPopper defaultOpen position="top-start" pinned />
    )
    .add("position top-end", () =>
        <RedBoxPopper defaultOpen position="top-end" pinned />
    )
    .add("position bottom", () =>
        <RedBoxPopper defaultOpen position="bottom" pinned />
    )
    .add("position bottom-end", () =>
        <RedBoxPopper defaultOpen position="bottom-end" pinned />
    )
    .add("position bottom-start", () =>
        <RedBoxPopper defaultOpen position="bottom-start" pinned />
    )
    .add("position right", () =>
        <RedBoxPopper defaultOpen position="right" pinned />
    )
    .add("position right", () =>
        <RedBoxPopper defaultOpen position="right" pinned />
    )
    .add("position right-start", () =>
        <RedBoxPopper defaultOpen position="right-start" pinned />
    )
    .add("position right-end", () =>
        <RedBoxPopper defaultOpen position="right-end" pinned />
    )
    .add("position left", () =>
        <RedBoxPopper defaultOpen position="left" pinned />
    )
    .add("position left-start", () =>
        <RedBoxPopper defaultOpen position="left-start" pinned />
    )
    .add("position left-end", () =>
        <RedBoxPopper defaultOpen position="left-end" pinned />
    )
    .add("fixed positioning", () =>
        <RedBoxPopper defaultOpen popperOptions={{ strategy: "fixed" }} />
    )
    .add("disable portal", () =>
        <RedBoxPopper defaultOpen disablePortal />
    )
    .add("container element", () =>
        <RedBoxPopper defaultOpen containerElement={window.document.getElementById("root")} />
    )
    .add("not wrapped", () =>
        <RedBoxPopper defaultOpen wrap={false} />
    )
    .add("wrap and className", () =>
        <RedBoxPopper defaultOpen className="border-blue" />
    )
    .add("wrap and style", () =>
        <RedBoxPopper defaultOpen style={{ border: "1px solid blue" }} />
    )
    .add("can prevent overflow when not pinned",
         () => <RedBoxPopperWithBoundary position="right" scrollTop={100} setPreventOverflowBoundaryElement />,
         paramsBuilder()
             .canvasLayout({ width: "40%" })
             .build()
    )
    .add("do not prevent overflow when pinned",
         () => <RedBoxPopperWithBoundary position="right" scrollTop={100} pinned />,
         paramsBuilder()
             .canvasLayout({ width: "40%" })
             .build()
    )
    .add("can flip", () =>
        <RedBoxPopperWithBoundary position="top" scrollTop={100} setFlipBoundaryElement />
    )
    .add("do not flip when pinned", () =>
        <RedBoxPopperWithBoundary position="top" scrollTop={100} pinned />
    )
    .add("disabled", () =>
        <RedBoxPopper disabled />
    )
    .add("without animation", () =>
        <RedBoxPopper defaultOpen animate={false} />
    );

stories("/offsets/bottom")
    .add("left+positive", () =>
        <RedBoxPopper position="bottom-end" offset={[30, 30]} defaultOpen />
    )
    .add("left+negative", () =>
        <RedBoxPopper position="bottom-end" offset={[-30, -30]} defaultOpen />
    )
    .add("right+positive", () =>
        <RedBoxPopper position="bottom-start" offset={[30, 30]} defaultOpen />
    )
    .add("right+negative", () =>
        <RedBoxPopper position="bottom-start" offset={[-30, -30]} defaultOpen />
    );

stories("/offsets/top")
    .add("left+positive", () =>
        <RedBoxPopper position="top-end" offset={[30, 30]} defaultOpen />,
         paramsBuilder()
             .canvasLayout({ marginTop: "150px" })
             .build()
    )
    .add("left+negative", () =>
        <RedBoxPopper position="top-end" offset={[-30, -30]} defaultOpen />,
         paramsBuilder()
             .canvasLayout({ marginTop: "150px" })
             .build()
    )
    .add("right+positive", () =>
        <RedBoxPopper position="top-start" offset={[30, 30]} defaultOpen />,
         paramsBuilder()
             .canvasLayout({ marginTop: "150px" })
             .build()
    )
    .add("right+negative", () =>
        <RedBoxPopper position="top-start" offset={[-30, -30]} defaultOpen />,
         paramsBuilder()
             .canvasLayout({ marginTop: "150px" })
             .build()
    );

