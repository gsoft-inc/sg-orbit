import { Button } from "@react-components/button";
import { CloseIcon } from "@react-components/icons";
import { PopperTrigger } from "@react-components/popper";
import { RedBox } from "./components";
import { TextInput } from "@react-components/text-input";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

// TODO:
//  - Must become popper.chroma.jsx, will create a new one specific for the input.
//  - In SB menu, should go under Popper.
//  - Popper
//      - popper
//      - input trigger
//      - button trigger

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("PopperTextInputTrigger"))
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

function createPopperTrigger(popperProps = {}, inputProps = {}) {
    return (
        <PopperTrigger.TextInput
            input={<TextInput {...inputProps} placeholder="Pick a date" />}
            {...popperProps}
        >
            <RedBox />
        </PopperTrigger.TextInput>
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
            focusPopperOnShow: true
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
    )
    .add("fluid input", () =>
        createPopperTrigger({ fluid: true }, { fluid: true })
    )
    .add("readonly input", () =>
        <div className="flex flex-column">
            <div style={{ marginBottom: "100px" }}>
                {createPopperTrigger({}, {
                    readOnly: true
                })}
            </div>
            <div>
                {createPopperTrigger({
                    defaultShow: true
                }, {
                    readOnly: true
                })}
            </div>
        </div>
    )
    .add("shorthand input", () =>
        <PopperTrigger.TextInput input={{ placeholder: "Pick a date" }}>
            <RedBox />
        </PopperTrigger.TextInput>
    )
    .add("clearable input", () =>
        <div className="flex flex-column">
            <div style={{ marginBottom: "100px" }}>
                {createPopperTrigger({}, {
                    button: <Button icon={<CloseIcon />} />
                })}
            </div>
            <div style={{ marginBottom: "100px" }}>
                {createPopperTrigger({}, {
                    button: {
                        icon: <CloseIcon />
                    }
                })}
            </div>
            <div>
                <PopperTrigger.TextInput
                    input={{
                        placeholder: "Pick a date",
                        button: {
                            icon: <CloseIcon />
                        }
                    }}
                >
                    <RedBox />
                </PopperTrigger.TextInput>
            </div>
        </div>
    )
    .add("multiple popper input in the same page", () =>
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
    .add("TEMP - dont close on blur", () =>
        createPopperTrigger({
            hideOnBlur: false
        })
    );
