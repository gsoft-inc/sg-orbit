import { SIZE } from "@react-components/shared";
import { Tag, createEmbeddedTag, createTag } from "@react-components/tag";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { isNil } from "lodash";

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
                <Tag className="bg-red mr5" size="micro" />
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

function setRedBackground(element) {
    if (!isNil(element)) {
        element.classList.add("bg-red");
    }
}

stories("/shorthands")
    .add("element", () =>
        <div className="flex">
            {createTag(<Tag className="bg-red mr5" />)}
            {createTag(<Tag ref={setRedBackground} />)}
        </div>
    )
    .add("object", () =>
        <div className="flex">
            {createTag({ className: "bg-red mr5" })}
            {createTag({ ref: setRedBackground })}
        </div>
    )
    .add("string", () =>
        createTag("bg-red")
    )
    .add("embedded", () =>
        <div className="flex items-end">
            {createEmbeddedTag({ className: "bg-red mr5" }, { size: SIZE.micro })}
            {createEmbeddedTag({ className: "bg-red mr5" }, { size: SIZE.mini })}
            {createEmbeddedTag({ className: "bg-red mr5" }, { size: SIZE.tiny })}
            {createEmbeddedTag({ className: "bg-red mr5" }, { size: SIZE.small })}
            {createEmbeddedTag({ className: "bg-red mr5" })}
            {createEmbeddedTag({ className: "bg-red" }, { size: SIZE.large })}
        </div>
    );
