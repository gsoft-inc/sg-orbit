import { Count, createCount } from "@react-components/count";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { isNil } from "lodash";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Count"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .chromaticDelay(100)
            .build())
        .build();
}

stories()
    .add("default", () =>
        <Count>6</Count>
    )
    .add("follow text size", () =>
        <div className="flex flex-column">
            <div className="f9 mb12">
                Orphaned Group <Count>6</Count>
            </div>
            <div className="mb12">
                Orphaned Group <Count>6</Count>
            </div>
            <div className="f5 mb12">
                Orphaned Group <Count>6</Count>
            </div>
            <div className="f1">
                Orphaned Group <Count>6</Count>
            </div>
        </div>
    )
    .add("follow text weight", () =>
        <div className="flex flex-column">
            <div className="fw1 mb12">
                Orphaned Group <Count>6</Count>
            </div>
            <div className="mb12">
                Orphaned Group <Count>6</Count>
            </div>
            <div className="fw5 mb12">
                Orphaned Group <Count>6</Count>
            </div>
            <div className="fw9">
                Orphaned Group <Count>6</Count>
            </div>
        </div>
    )
    .add("custom text color", () =>
        <div>
            Orphaned Group <Count className="primary-500">6</Count>
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
            {createCount(<Count className="mr5">6</Count>)}
            {createCount(<Count ref={setRedBackground}>6</Count>)}
        </div>
    )
    .add("object", () =>
        <div className="flex">
            {createCount({ content: "6", className: "mr5" })}
            {createCount({ content: "6", ref: setRedBackground })}
        </div>
    )
    .add("string", () =>
        createCount("6")
    );
