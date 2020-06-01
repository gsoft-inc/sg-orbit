import { Button } from "@react-components/button";
import { PopperTrigger } from "@react-components/popper";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { forwardRef } from "react";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Popper/button trigger"))
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

const RedBox = forwardRef((props, ref) => {
    return (
        <div
            {...props}
            className="w12 h12 pa2 bg-red"
            ref={ref}
        >
            <a href="https://en.wikipedia.org/wiki/David_Saint-Jacques" target="__blank">David Saint-Jacques</a>
        </div>
    );
});

function createPopperTrigger(props = {}) {
    return (
        <PopperTrigger.Button
            button={<Button fluid>Click me</Button>}
            {...props}
        >
            <RedBox />
        </PopperTrigger.Button>
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
    .add("default show", () =>
        createPopperTrigger({
            defaultShow: true
        })
    )
    .add("shorthand button", () =>
        <PopperTrigger.Button button={{ content: "Open", fluid: true }}>
            <RedBox />
        </PopperTrigger.Button>
    )
    .add("fluid button", () =>
        <div className="flex flex-column">
            <div style={{ marginBottom: "100px" }}>
                {createPopperTrigger({ fluid: true })}
            </div>
            <div>
                {createPopperTrigger({ fluid: true, show: true })}
            </div>
        </div>
    );
