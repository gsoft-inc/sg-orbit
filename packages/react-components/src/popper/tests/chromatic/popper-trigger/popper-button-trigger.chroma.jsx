import { Button } from "@react-components/button";
import { PopperTrigger } from "@react-components/popper";
import { RedBox } from "./components";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("PopperButtonTrigger"))
        .segment(segment)
        .parameters(
            paramsBuilder()
                .canvasLayout({ width: "80%", marginTop: "100px" })
                .chromaticDelay(100)
                .chromaticPauseAnimationAtEnd()
                .build()
        )
        .build();
}

function createPopperTrigger(props = {}) {
    return (
        <PopperTrigger.Button
            button={<Button fluid>Open</Button>}
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
    .add("default hide", () =>
        createPopperTrigger({
            defaultShow: false
        })
    )
    .add("shorthand button", () =>
        <PopperTrigger.Button button={{ content: "Open", fluid: true }}>
            <RedBox />
        </PopperTrigger.Button>
    )
    .add("fluid button", () =>
        createPopperTrigger({ fluid: true }, { fluid: true })
    );
