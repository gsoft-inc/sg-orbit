import { Button } from "@react-components/button";
import { CloseIcon } from "@react-components/icons";
import { PopperTrigger } from "@react-components/popper";
import { TextInput } from "@react-components/text-input";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { forwardRef } from "react";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Popper/text input trigger"))
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
    input = <TextInput fluid placeholder="Click me" />,
    ...rest
}) {
    return (
        <PopperTrigger.TextInput
            input={input}
            {...rest}
        >
            <RedBox />
        </PopperTrigger.TextInput>
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
                <RedBoxPopper disabled show />
            </div>
        </div>
    )
    .add("shorthand input", () =>
        <RedBoxPopper input={{ placeholder: "Pick a date", fluid: true }} />
    )
    .add("fluid input", () =>
        <div className="flex flex-column">
            <div style={{ marginBottom: "100px" }}>
                <RedBoxPopper fluid />
            </div>
            <div>
                <RedBoxPopper fluid show />
            </div>
        </div>
    )
    .add("readonly input", () =>
        <div className="flex flex-column">
            <div style={{ marginBottom: "100px" }}>
                <RedBoxPopper input={{ readOnly: true }} />
            </div>
            <div>
                <RedBoxPopper input={{ readOnly: true }} show />
            </div>
        </div>
    )
    .add("clearable input", () =>
        <div className="flex flex-column">
            <div style={{ marginBottom: "100px" }}>
                <RedBoxPopper input={{ button: <Button icon={<CloseIcon />} /> }} />
            </div>
            <div>
                <RedBoxPopper input={{ placeholder: "Pick a date", button: <Button icon={<CloseIcon />} /> }} />
            </div>
        </div>
    );
