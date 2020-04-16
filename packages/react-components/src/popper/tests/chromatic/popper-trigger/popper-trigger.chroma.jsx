import { Button } from "@react-components/button";
import { PopperTrigger } from "@react-components/popper";
import { RedBox } from "./components";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("PopperTrigger"))
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

function createPopperTrigger(props = {}) {
    return (
        <PopperTrigger
            trigger={<Button fluid>Open</Button>}
            {...props}
        >
            <RedBox />
        </PopperTrigger>
    );
}

stories()
    .add("show", () =>
        createPopperTrigger({
            show: true
        })
    )
    .add("default open", () =>
        createPopperTrigger({
            defaultOpen: true
        })
    );
