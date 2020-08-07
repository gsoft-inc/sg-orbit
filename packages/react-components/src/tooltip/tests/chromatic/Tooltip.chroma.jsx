import { AddIcon } from "@react-components/icons";
import { Button } from "@react-components/button";
import { TextArea, TextInput } from "@react-components/input";
import { Tooltip } from "@react-components/tooltip";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Tooltip"))
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .canvasLayout({ width: "80%", paddingTop: "100px" })
            .build())
        .build();
}

function SimpleTooltip(props) {
    return (
        <Tooltip
            {...props}
            content="Adds users to your feed"
            trigger={<Button>Add</Button>}
        />
    );
}

function WideTooltip({ veryWide, ...rest }) {
    return (
        <Tooltip
            {...rest}
            wide={veryWide ? "very" : true}
            content="This is a wide pop-up which allows for lots of content with additional space. You can fit a lot of words here and the paragraphs will be pretty wide."
            trigger={<Button>Add</Button>}
        />
    );
}

function TriggerLessTooltip(props) {
    return (
        <Tooltip
            {...props}
            content="Adds users to your feed"
        />
    );
}

stories()
    .add("default", () =>
        <SimpleTooltip />
    )
    .add("open", () =>
        <SimpleTooltip open />
    )
    .add("default open", () =>
        <SimpleTooltip defaultOpen />
    )
    .add("basic", () =>
        <SimpleTooltip
            basic
            open
        />
    )
    .add("position", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                <div style={{ marginRight: "250px" }}>
                    <SimpleTooltip
                        position="top center"
                        open
                    />
                </div>
                <div style={{ marginRight: "250px" }}>
                    <SimpleTooltip
                        position="top left"
                        open
                    />
                </div>
                <div style={{ marginRight: "250px" }}>
                    <SimpleTooltip
                        position="top right"
                        open
                    />
                </div>
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                <div style={{ marginRight: "250px" }}>
                    <SimpleTooltip
                        position="bottom center"
                        open
                    />
                </div>
                <div style={{ marginRight: "250px" }}>
                    <SimpleTooltip
                        position="bottom left"
                        open
                    />
                </div>
                <div style={{ marginRight: "250px" }}>
                    <SimpleTooltip
                        position="bottom right"
                        open
                    />
                </div>
            </div>
            <div className="flex">
                <div style={{ marginRight: "450px" }}>
                    <SimpleTooltip
                        position="right center"
                        open
                    />
                </div>
                <div>
                    <SimpleTooltip
                        position="left center"
                        open
                    />
                </div>
            </div>
        </div>
    )
    .add("size", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                <div style={{ marginRight: "200px" }}>
                    <SimpleTooltip
                        size="mini"
                        open
                    />
                </div>
                <div style={{ marginRight: "200px" }}>
                    <SimpleTooltip
                        size="tiny"
                        open
                    />
                </div>
                <div>
                    <SimpleTooltip
                        size="small"
                        open
                    />
                </div>
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                <div style={{ marginRight: "200px" }}>
                    <SimpleTooltip
                        size="large"
                        open
                    />
                </div>
                <div>
                    <SimpleTooltip
                        size="huge"
                        open
                    />
                </div>
            </div>
        </div>
    )
    .add("wide", () =>
        <div className="flex flex-column">
            <div style={{ marginBottom: "150px" }}>
                <WideTooltip open />
            </div>
            <div>
                <WideTooltip
                    veryWide
                    open
                />
            </div>
        </div>
    )
    .add("inverted", () =>
        <SimpleTooltip
            inverted
            open
        />
    )
    .add("flush", () =>
        <SimpleTooltip
            flush
            open
        />
    )
    .add("disabled", () =>
        <SimpleTooltip
            disabled
            open
        />
    )
    .add("triggers", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                <div style={{ marginRight: "200px" }}>
                    <TriggerLessTooltip
                        trigger={<Button size="tiny">Add</Button>}
                        open
                    />
                </div>
                <div style={{ marginRight: "200px" }}>
                    <TriggerLessTooltip
                        trigger={<Button size="small">Add</Button>}
                        open
                    />

                </div>
                <div style={{ marginRight: "200px" }}>
                    <TriggerLessTooltip
                        trigger={<Button>Add</Button>}
                        open
                    />
                </div>
                <div style={{ marginRight: "200px" }}>
                    <TriggerLessTooltip
                        trigger={<Button size="large">Add</Button>}
                        open
                    />
                </div>
                <div style={{ marginRight: "200px" }}>
                    <TriggerLessTooltip
                        trigger={<Button shape="circular" icon={<AddIcon />}>Add</Button>}
                        open
                    />
                </div>
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                <div style={{ marginRight: "200px" }}>
                    <TriggerLessTooltip
                        trigger={<Button>Add</Button>}
                        open
                    />
                </div>
                <div style={{ marginRight: "200px" }}>
                    <TriggerLessTooltip
                        trigger={<Button shape="circular">A</Button>}
                        open
                    />
                </div>
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                <div style={{ marginRight: "200px" }}>
                    <TriggerLessTooltip
                        trigger={<a href="https://www.google.com">Google</a>}
                        open
                    />
                </div>
                <div style={{ marginRight: "200px" }}>
                    <TriggerLessTooltip
                        trigger={<span>Span</span>}
                        open
                    />
                </div>
                <div>
                    <TriggerLessTooltip
                        trigger={<div>Div</div>}
                        open
                    />
                </div>
            </div>
            <div className="flex">
                <div style={{ marginRight: "200px" }}>
                    <TriggerLessTooltip
                        trigger={<TextInput />}
                        open
                    />
                </div>
                <div>
                    <TriggerLessTooltip
                        trigger={<TextArea />}
                        open
                    />
                </div>
            </div>
        </div>
    )
    .add("styling", () =>
        <div className="flex">
            <div style={{ marginRight: "200px" }}>
                <SimpleTooltip
                    className="bg-red"
                    open
                />
            </div>
            <div>
                <SimpleTooltip
                    style={{ backgroundColor: "red" }}
                    open
                />
            </div>
        </div>
    );
