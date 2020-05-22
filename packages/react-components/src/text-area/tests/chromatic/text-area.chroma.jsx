import { TextArea } from "@react-components/text-area";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("TextArea"))
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
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
    .add("interaction states", () =>
        <div className="flex">
            <TextArea active placeholder="Tell us more" className="mr5" />
            <TextArea focus placeholder="Tell us more" className="mr5" />
            <TextArea hover placeholder="Tell us more" className="mr5" />
            <TextArea focus hover placeholder="Tell us more" />
        </div>
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
        <div className="flex flex-column">
            <div className="mb5">
                <TextArea fluid placeholder="Tell us more" />
            </div>
            <div className="w-10">
                <TextArea fluid placeholder="Tell us more" />
            </div>
        </div>
    )
    .add("size", () =>
        <div className="flex flex-column">
            <div className="flex items-end mb5">
                <TextArea size="small" placeholder="Tell us more" className="mr5" />
                <TextArea size="medium" placeholder="Tell us more" className="mr5" />
                <TextArea size="large" placeholder="Tell us more" />
            </div>
            <div className="flex items-end">
                <TextArea size="small" defaultValue="SpaceX will win the race!" className="mr5" />
                <TextArea size="medium" defaultValue="SpaceX will win the race!" className="mr5" />
                <TextArea size="large" defaultValue="SpaceX will win the race!" />
            </div>
        </div>
    )
    .add("value", () =>
        <div className="flex">
            <TextArea placeholder="Tell us more" value="SpaceX will win the race!" className="mr5" />
            <TextArea placeholder="Tell us more" defaultValue="SpaceX will win the race!" />
        </div>
    )
    .add("styling", () =>
        <div className="flex">
            <TextArea className="bg-red mr5" placeholder="Tell us more" />
            <TextArea style={{ backgroundColor: "red" }} placeholder="Tell us more" />
        </div>
    );
