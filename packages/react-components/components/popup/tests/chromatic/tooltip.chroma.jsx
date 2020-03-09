import { Button } from "@orbit-ui/react-button/src";
import { Tooltip } from "@orbit-ui/react-popup/src";
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
    // .add("position", () =>
    // )
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
    );
