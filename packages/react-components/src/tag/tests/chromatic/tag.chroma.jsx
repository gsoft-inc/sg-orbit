import { Tag } from "@react-components/tag";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Tag"))
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .build())
        .build();
}

stories()
    .add("default", () =>
        <div className="flex flex-column">
            <div className="flex items-end mb5">
                <Tag className="bg-red mr5" size="mini" />
                <Tag className="bg-red mr5" size="tiny" />
                <Tag className="bg-red mr5" size="small" />
                <Tag className="bg-red mr5" size="medium" />
                <Tag className="bg-red mr5" size="large" />
                <Tag className="bg-red mr5" size="big" />
                <Tag className="bg-red mr5" size="huge" />
                <Tag className="bg-red" size="massive" />
            </div>
            <div className="flex items-end">
                <Tag style={{ backgroundColor: "red" }} />
            </div>
        </div>
    );
