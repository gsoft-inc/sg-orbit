import { Button } from "@react-components/button";
import { Popper, PopperTrigger } from "@react-components/popper";
import { RedBox } from "./red-box";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Popper/trigger"))
        .segment(segment)
        .parameters(
            paramsBuilder()
                .canvasLayout({ width: "80%", height: "600px", marginTop: "100px" })
                .chromaticDelay(100)
                .chromaticPauseAnimationAtEnd()
                .build()
        )
        .build();
}

function createPopperTrigger(props = {}) {
    return (
        <PopperTrigger
            trigger={<Button fluid>Open</Button>}
            toggleHandler="onClick"
            {...props}
        >
            <RedBox />
        </PopperTrigger>
    );
}

stories()
    .add("default", () =>
        createPopperTrigger()
    )
    .add("show", () =>
        createPopperTrigger({
            show: true
        })
    )
    .add("hide", () =>
        createPopperTrigger({
            show: false
        })
    )
    .add("default show", () =>
        createPopperTrigger({
            defaultShow: true
        })
    )
    .add("focus trigger on show", () =>
        createPopperTrigger({
            defaultShow: true,
            focusTriggerOnShow: true
        })
    )
    .add("focus popper on show", () =>
        createPopperTrigger({
            defaultShow: true,
            focusFirstElementOnShow: true
        })
    )
    .add("disabled", () =>
        <div className="flex flex-column">
            <div style={{ marginBottom: "100px" }}>
                {createPopperTrigger({
                    disabled: true
                })}
            </div>
            <div>
                {createPopperTrigger({
                    disabled: true,
                    defaultShow: true
                })}
            </div>
        </div>
    ).add("multiple popper in the same page", () =>
        <div className="flex flex-column">
            <div style={{ marginBottom: "100px" }}>
                {createPopperTrigger({
                    defaultShow: true
                })}
            </div>
            <div>
                {createPopperTrigger({
                    defaultShow: true
                })}
            </div>
        </div>
    )
    .add("styling", () =>
        <div className="flex flex-column">
            <div style={{ marginBottom: "100px" }}>
                {createPopperTrigger({
                    className: "border-blue",
                    defaultShow: true
                })}
            </div>
            <div>
                {createPopperTrigger({
                    style: { border: "1px solid blue" },
                    defaultShow: true
                })}
            </div>
        </div>
    )
    .add("custom popper component", () =>
        createPopperTrigger({
            popper: <Popper className="border-blue" />,
            defaultShow: true
        })
    );


