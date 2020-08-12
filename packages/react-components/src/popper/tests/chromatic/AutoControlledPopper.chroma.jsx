import { AutoControlledPopper } from "@react-components/popper";
import { Button } from "@react-components/button";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { forwardRef } from "react";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("AutoControlledPopper"))
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
        <AutoControlledPopper {...props}>
            <AutoControlledPopper.Trigger as={Button}>Open</AutoControlledPopper.Trigger>
            <AutoControlledPopper.Popper>
                <RedBox />
            </AutoControlledPopper.Popper>
        </AutoControlledPopper>
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
    .add("focus first element on show", () =>
        <RedBoxPopper
            show
            focusFirstElementOnShow
        />
    )
    .add("fluid", () =>
        <RedBoxPopper
            show
            fluid
        />
    )
    .add("multiple popper visible on the same page", () =>
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
        <div className="flex flex-column">
            <div style={{ marginBottom: "100px" }}>
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
    );


