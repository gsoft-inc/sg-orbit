import { AddIcon } from "@react-components/icons";
import { Button } from "@react-components/button";
import { Input } from "@react-components/input";
import { Label } from "@react-components/label";
import { TextArea } from "@react-components/textarea";
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

function createTooltip({ content = "Adds users to your feed", ...otherProps } = {}) {
    return (
        <Tooltip
            defaultOpen
            content={content}
            trigger={<Button>Add</Button>}
            {...otherProps}
        />
    );
}

stories()
    .add("default", () =>
        createTooltip()
    )
    .add("basic", () =>
        createTooltip({
            basic: true
        })
    )
    .add("position", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                <div style={{ marginRight: "250px" }}>
                    {createTooltip({
                        position: "top center"
                    })}
                </div>
                <div style={{ marginRight: "250px" }}>
                    {createTooltip({
                        position: "top left"
                    })}
                </div>
                <div style={{ marginRight: "250px" }}>
                    {createTooltip({
                        position: "top right"
                    })}
                </div>
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                <div style={{ marginRight: "250px" }}>
                    {createTooltip({
                        position: "bottom center"
                    })}
                </div>
                <div style={{ marginRight: "250px" }}>
                    {createTooltip({
                        position: "bottom left"
                    })}
                </div>
                <div style={{ marginRight: "250px" }}>
                    {createTooltip({
                        position: "bottom right"
                    })}
                </div>
            </div>
            <div className="flex">
                <div style={{ marginRight: "450px" }}>
                    {createTooltip({
                        position: "right center"
                    })}
                </div>
                <div>
                    {createTooltip({
                        position: "left center"
                    })}
                </div>
            </div>
        </div>
    )
    .add("size", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                <div style={{ marginRight: "200px" }}>
                    {createTooltip({
                        size: "mini"
                    })}
                </div>
                <div style={{ marginRight: "200px" }}>
                    {createTooltip({
                        size: "tiny"
                    })}
                </div>
                <div>
                    {createTooltip({
                        size: "small"
                    })}
                </div>
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                <div style={{ marginRight: "200px" }}>
                    {createTooltip({
                        size: "large"
                    })}
                </div>
                <div>
                    {createTooltip({
                        size: "huge"
                    })}
                </div>
            </div>
        </div>
    )
    .add("wide", () =>
        <div className="flex flex-column">
            <div style={{ marginBottom: "150px" }}>
                {createTooltip({
                    wide: true,
                    content: "This is a wide pop-up which allows for lots of content with additional space. You can fit a lot of words here and the paragraphs will be pretty wide."
                })}
            </div>
            <div>
                {createTooltip({
                    wide: "very",
                    content: "This is a wide pop-up which allows for lots of content with additional space. You can fit a lot of words here and the paragraphs will be pretty wide."
                })}
            </div>
        </div>
    )
    .add("inverted", () =>
        createTooltip({
            inverted: true
        })
    )
    .add("flush", () =>
        createTooltip({
            flush: true
        })
    )
    .add("disabled", () =>
        createTooltip({
            disabled: true
        })
    )
    .add("triggers", () =>
        <div className="flex flex-column">
            <div className="flex" style={{ marginBottom: "150px" }}>
                <div style={{ marginRight: "200px" }}>
                    {createTooltip({
                        trigger: <Button size="tiny">Add</Button>
                    })}
                </div>
                <div style={{ marginRight: "200px" }}>
                    {createTooltip({
                        trigger: <Button size="small">Add</Button>
                    })}
                </div>
                <div style={{ marginRight: "200px" }}>
                    {createTooltip()}
                </div>
                <div style={{ marginRight: "200px" }}>
                    {createTooltip({
                        trigger: <Button size="large">Add</Button>
                    })}
                </div>
                <div style={{ marginRight: "200px" }}>
                    {createTooltip({
                        trigger: <Button circular icon={<AddIcon />} />
                    })}
                </div>
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                <div style={{ marginRight: "200px" }}>
                    {createTooltip({
                        trigger: <Label>Add</Label>
                    })}
                </div>
                <div style={{ marginRight: "200px" }}>
                    {createTooltip({
                        trigger: <Label circular>A</Label>
                    })}
                </div>
            </div>
            <div className="flex" style={{ marginBottom: "150px" }}>
                <div style={{ marginRight: "200px" }}>
                    {createTooltip({
                        trigger: <a href="https://www.google.com">Google</a>
                    })}
                </div>
                <div style={{ marginRight: "200px" }}>
                    {createTooltip({
                        trigger: <span>Span</span>
                    })}
                </div>
                <div>
                    {createTooltip({
                        trigger: <div>Div</div>
                    })}
                </div>
            </div>
            <div className="flex">
                <div style={{ marginRight: "200px" }}>
                    {createTooltip({
                        trigger: <Input />
                    })}
                </div>
                <div>
                    {createTooltip({
                        trigger: <TextArea />
                    })}
                </div>
            </div>
        </div>
    )
    .add("styling", () =>
        <div className="flex">
            <div style={{ marginRight: "200px" }}>
                {createTooltip({
                    className: "bg-red"
                })}
            </div>
            <div>
                {createTooltip({
                    style: { backgroundColor: "red" }
                })}
            </div>
        </div>
    );
