import { TextArea } from "@orbit-ui/react-input/src";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Text Area"))
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

stories()
    .add("default", () =>
        <TextArea />
    )
    .add("placeholder", () =>
        <TextArea placeholder="Tell us more" />
    )
    .add("disabled", () =>
        <div className="flex">
            <TextArea disabled className="mr5" />
            <TextArea placeholder="Tell us more" disabled />
        </div>
    )
    .add("error", () =>
        <TextArea error placeholder="Tell us more" />
    )
    .add("focused", () =>
        <TextArea focused placeholder="Tell us more" />
    )
    .add("transparent", () =>
        <TextArea transparent placeholder="Tell us more" />
    )
    .add("resizable", () =>
        <TextArea resizable placeholder="Tell us more" />
    )
    .add("rows", () =>
        <div className="flex items-end">
            <TextArea rows={2} placeholder="Tell us more" className="mr5" />
            <TextArea rows={20} placeholder="Tell us more" className="mr5" />
        </div>
    )
    .add("fluid", () =>
        <TextArea fluid placeholder="Tell us more" />
    )
    .add("size", () =>
        <div className="flex items-end">
            <TextArea size="small" placeholder="Tell us more" className="mr5" />
            <TextArea size="medium" placeholder="Tell us more" className="mr5" />
            <TextArea size="large" placeholder="Tell us more" />
        </div>
    )
    .add("styling", () =>
        <div className="flex">
            <TextArea className="bg-red mr5" placeholder="Tell us more" />
            <TextArea style={{ backgroundColor: "red" }} placeholder="Tell us more" />
        </div>
    );
