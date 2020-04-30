import { RedBoxPopper, RedBoxPopperWithBoundary } from "./components";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Popper/popper"))
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
        <RedBoxPopper defaultShow />
    )
    .add("position auto", () =>
        <RedBoxPopper defaultShow position="auto" />
    )
    .add("position auto-start", () =>
        <RedBoxPopper defaultShow position="auto-start" />
    )
    .add("position auto-end", () =>
        <RedBoxPopper defaultShow position="auto-end" />
    )
    .add("position top", () =>
        <RedBoxPopper defaultShow position="top" pinned />
    )
    .add("position top-start", () =>
        <RedBoxPopper defaultShow position="top-start" pinned />
    )
    .add("position top-end", () =>
        <RedBoxPopper defaultShow position="top-end" pinned />
    )
    .add("position bottom", () =>
        <RedBoxPopper defaultShow position="bottom" pinned />
    )
    .add("position bottom-end", () =>
        <RedBoxPopper defaultShow position="bottom-end" pinned />
    )
    .add("position bottom-start", () =>
        <RedBoxPopper defaultShow position="bottom-start" pinned />
    )
    .add("position right", () =>
        <RedBoxPopper defaultShow position="right" pinned />
    )
    .add("position right", () =>
        <RedBoxPopper defaultShow position="right" pinned />
    )
    .add("position right-start", () =>
        <RedBoxPopper defaultShow position="right-start" pinned />
    )
    .add("position right-end", () =>
        <RedBoxPopper defaultShow position="right-end" pinned />
    )
    .add("position left", () =>
        <RedBoxPopper defaultShow position="left" pinned />
    )
    .add("position left-start", () =>
        <RedBoxPopper defaultShow position="left-start" pinned />
    )
    .add("position left-end", () =>
        <RedBoxPopper defaultShow position="left-end" pinned />
    )
    .add("fixed positioning", () =>
        <RedBoxPopper defaultShow popperOptions={{ strategy: "fixed" }} />
    )
    .add("no portal", () =>
        <div className="flex flex-column">
            <div style={{ marginBottom: "100px" }}>
                <RedBoxPopper noPortal />
            </div>
            <div>
                <RedBoxPopper defaultShow noPortal />
            </div>
        </div>
    )
    .add("custom container element", () =>
        <RedBoxPopper defaultShow containerElement={window.document.getElementById("root")} />
    )
    .add("no wrap", () =>
        <RedBoxPopper defaultShow noWrap />
    )
    .add("no animation", () =>
        <RedBoxPopper defaultShow animate={false} />
    )
    .add("styling", () =>
        <div className="flex">
            <RedBoxPopper defaultShow className="border-blue mr5" />
            <RedBoxPopper defaultShow style={{ border: "1px solid blue" }} />
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
        <RedBoxPopper defaultShow animate={false} />
    );

stories("/offsets/bottom")
    .add("left+positive", () =>
        <RedBoxPopper position="bottom-end" offset={[30, 30]} defaultShow />
    )
    .add("left+negative", () =>
        <RedBoxPopper position="bottom-end" offset={[-30, -30]} defaultShow />
    )
    .add("right+positive", () =>
        <RedBoxPopper position="bottom-start" offset={[30, 30]} defaultShow />
    )
    .add("right+negative", () =>
        <RedBoxPopper position="bottom-start" offset={[-30, -30]} defaultShow />
    );

stories("/offsets/top")
    .add("left+positive", () =>
        <RedBoxPopper position="top-end" offset={[30, 30]} defaultShow />,
         paramsBuilder()
             .canvasLayout({ marginTop: "150px" })
             .build()
    )
    .add("left+negative", () =>
        <RedBoxPopper position="top-end" offset={[-30, -30]} defaultShow />,
         paramsBuilder()
             .canvasLayout({ marginTop: "150px" })
             .build()
    )
    .add("right+positive", () =>
        <RedBoxPopper position="top-start" offset={[30, 30]} defaultShow />,
         paramsBuilder()
             .canvasLayout({ marginTop: "150px" })
             .build()
    )
    .add("right+negative", () =>
        <RedBoxPopper position="top-start" offset={[-30, -30]} defaultShow />,
         paramsBuilder()
             .canvasLayout({ marginTop: "150px" })
             .build()
    );

