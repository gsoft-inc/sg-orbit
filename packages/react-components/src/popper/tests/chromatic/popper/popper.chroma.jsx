import { RedBoxPopper } from "./RedBoxPopper";
import { RedBoxPopperWithBoundary } from "./RedBoxPopperWithBoundary";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Popper/popper"))
        .segment(segment)
        .parameters(
            paramsBuilder()
                .canvasLayout({ width: "30%", height: "600px", marginTop: "100px" })
                .chromaticDelay(100)
                .chromaticPauseAnimationAtEnd()
                .build()
        )
        .build();
}

stories()
    .add("default", () =>
        <RedBoxPopper />
    )
    .add("show", () =>
        <RedBoxPopper show />
    )
    .add("default show", () =>
        <RedBoxPopper defaultShow />
    )
    .add("position auto", () =>
        <RedBoxPopper show position="auto" />
    )
    .add("position auto-start", () =>
        <RedBoxPopper show position="auto-start" />
    )
    .add("position auto-end", () =>
        <RedBoxPopper show position="auto-end" />
    )
    .add("position top", () =>
        <RedBoxPopper show position="top" pinned />
    )
    .add("position top-start", () =>
        <RedBoxPopper show position="top-start" pinned />
    )
    .add("position top-end", () =>
        <RedBoxPopper show position="top-end" pinned />
    )
    .add("position bottom", () =>
        <RedBoxPopper show position="bottom" pinned />
    )
    .add("position bottom-end", () =>
        <RedBoxPopper show position="bottom-end" pinned />
    )
    .add("position bottom-start", () =>
        <RedBoxPopper show position="bottom-start" pinned />
    )
    .add("position right", () =>
        <RedBoxPopper show position="right" pinned />
    )
    .add("position right", () =>
        <RedBoxPopper show position="right" pinned />
    )
    .add("position right-start", () =>
        <RedBoxPopper show position="right-start" pinned />
    )
    .add("position right-end", () =>
        <RedBoxPopper show position="right-end" pinned />
    )
    .add("position left", () =>
        <RedBoxPopper show position="left" pinned />
    )
    .add("position left-start", () =>
        <RedBoxPopper show position="left-start" pinned />
    )
    .add("position left-end", () =>
        <RedBoxPopper show position="left-end" pinned />
    )
    .add("fixed positioning", () =>
        <RedBoxPopper show popperOptions={{ strategy: "fixed" }} />
    )
    .add("no portal", () =>
        <div className="flex flex-column">
            <div style={{ marginBottom: "100px" }}>
                <RedBoxPopper noPortal />
            </div>
            <div>
                <RedBoxPopper show noPortal />
            </div>
        </div>
    )
    .add("custom portal container element", () =>
        <RedBoxPopper show portalContainerElement={window.document.getElementById("root")} />
    )
    .add("no wrap", () =>
        <RedBoxPopper show noWrap />
    )
    .add("no animation", () =>
        <RedBoxPopper show animate={false} />
    )
    .add("styling", () =>
        <div className="flex flex-column">
            <div style={{ marginBottom: "100px" }}>
                <RedBoxPopper show className="border-blue" />
            </div>
            <div>
                <RedBoxPopper show style={{ border: "1px solid blue" }} />
            </div>
        </div>
    )
    .add("can prevent overflow when not pinned",
         () => <RedBoxPopperWithBoundary position="right" noPortal scrollTop={100} setPreventOverflowBoundaryElement />,
         paramsBuilder()
             .canvasLayout({ width: "40%" })
             .build()
    )
    .add("do not prevent overflow when pinned",
         () => <RedBoxPopperWithBoundary position="right" noPortal scrollTop={100} pinned />,
         paramsBuilder()
             .canvasLayout({ width: "40%" })
             .build()
    )
    .add("can flip", () =>
        <RedBoxPopperWithBoundary position="top" noPortal scrollTop={100} setFlipBoundaryElement />
    )
    .add("do not flip when pinned", () =>
        <RedBoxPopperWithBoundary position="top" noPortal scrollTop={100} pinned />
    )
    .add("disabled", () =>
        <RedBoxPopper disabled />
    )
    .add("without animation", () =>
        <RedBoxPopper show animate={false} />
    );

stories("/offsets/bottom")
    .add("left+positive", () =>
        <RedBoxPopper position="bottom-end" offset={[30, 30]} show />
    )
    .add("left+negative", () =>
        <RedBoxPopper position="bottom-end" offset={[-30, -30]} show />
    )
    .add("right+positive", () =>
        <RedBoxPopper position="bottom-start" offset={[30, 30]} show />
    )
    .add("right+negative", () =>
        <RedBoxPopper position="bottom-start" offset={[-30, -30]} show />
    );

stories("/offsets/top")
    .add("left+positive", () =>
        <RedBoxPopper position="top-end" offset={[30, 30]} show />,
         paramsBuilder()
             .canvasLayout({ marginTop: "150px" })
             .build()
    )
    .add("left+negative", () =>
        <RedBoxPopper position="top-end" offset={[-30, -30]} show />,
         paramsBuilder()
             .canvasLayout({ marginTop: "150px" })
             .build()
    )
    .add("right+positive", () =>
        <RedBoxPopper position="top-start" offset={[30, 30]} show />,
         paramsBuilder()
             .canvasLayout({ marginTop: "150px" })
             .build()
    )
    .add("right+negative", () =>
        <RedBoxPopper position="top-start" offset={[-30, -30]} show />,
         paramsBuilder()
             .canvasLayout({ marginTop: "150px" })
             .build()
    );

