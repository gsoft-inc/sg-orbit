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

function RedBoxPopper({
    button = <Button fluid>Click me</Button>,
    ...rest
}) {
    return (
        <PopperTrigger.Button
            button={button}
            {...rest}
        >
            <RedBox />
        </PopperTrigger.Button>
    );
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
    .add("focus trigger on show", () =>
        <RedBoxPopper show focusTriggerOnShow />
    )
    .add("disabled", () =>
        <div className="flex flex-column">
            <div style={{ marginBottom: "100px" }}>
                <RedBoxPopper disabled />
            </div>
            <div>
                <RedBoxPopper disabled show />
            </div>
        </div>
    )
    .add("shorthand button", () =>
        <RedBoxPopper button={{ content: "Click me", fluid: true }} />
    )
    .add("fluid button", () =>
        <div className="flex flex-column">
            <div style={{ marginBottom: "100px" }}>
                <RedBoxPopper fluid />
            </div>
            <div>
                <RedBoxPopper fluid show />
            </div>
        </div>
    );
