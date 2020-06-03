import { Button } from "@react-components/button";
import { Popper, PopperTrigger } from "@react-components/popper";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { forwardRef } from "react";

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

function RedBoxPopper(props) {
    return (
        <PopperTrigger
            {...props}
            trigger={<Button fluid>Open</Button>}
            toggleHandler="onClick"
        >
            <RedBox />
        </PopperTrigger>
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
        <RedBoxPopper
            show
            focusTriggerOnShow
        />
    )
    .add("disabled", () =>
        <div className="flex flex-column">
            <div style={{ marginBottom: "100px" }}>
                <RedBoxPopper disabled />
            </div>
            <div>
                <RedBoxPopper
                    disabled
                    show
                />
            </div>
        </div>
    ).add("multiple popper visible on the same page", () =>
        <div className="flex flex-column">
            <div style={{ marginBottom: "100px" }}>
                <RedBoxPopper show />
            </div>
            <div>
                <RedBoxPopper show />
            </div>
        </div>
    )
    .add("styling", () =>
        <div>
            <div className="flex" style={{ marginBottom: "100px" }}>
                <div style={{ marginRight: "100px" }}>
                    <RedBoxPopper
                        show
                        className="border-blue"
                    />
                </div>
                <div>
                    <RedBoxPopper
                        show
                        style={{ border: "1px solid blue" }}
                    />
                </div>
            </div>
            <div className="flex">
                <div style={{ marginRight: "100px" }}>
                    <RedBoxPopper
                        show
                        popperClassName="border-blue"
                    />
                </div>
                <div>
                    <RedBoxPopper
                        show
                        popperStyle={{ border: "1px solid blue" }}
                    />
                </div>
            </div>
        </div>
    )
    .add("custom popper component", () =>
        <div className="flex flex-column">
            <div style={{ marginBottom: "100px" }}>
                <RedBoxPopper
                    show
                    popper={<Popper className="border-blue" />}
                />
            </div>
            <div>
                <RedBoxPopper
                    show
                    popper={{ className: "border-blue" }}
                />
            </div>
        </div>
    );


