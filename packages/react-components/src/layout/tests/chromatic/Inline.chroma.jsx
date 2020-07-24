import { Inline } from "@react-components/layout";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Inline"))
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

stories()
    .add("default", () =>
        <div className="h10">
            <Inline fluid>
                <div className="bg-primary-500">Alpha</div>
                <div className="bg-primary-500">Bravo</div>
                <div className="bg-primary-500">Charlie</div>
            </Inline>
        </div>
    )
    .add("align end", () =>
        <div className="h10">
            <Inline align="end" justify="end" fluid>
                <div className="bg-primary-500">Alpha</div>
                <div className="bg-primary-500">Bravo</div>
                <div className="bg-primary-500">Charlie</div>
            </Inline>
        </div>
    )
    .add("align center", () =>
        <div className="h10">
            <Inline align="center" justify="center" fluid>
                <div className="bg-primary-500">Alpha</div>
                <div className="bg-primary-500">Bravo</div>
                <div className="bg-primary-500">Charlie</div>
            </Inline>
        </div>
    )
    .add("gap", () =>
        <div className="h10">
            <Inline gap={10} fluid>
                <div className="bg-primary-500">Alpha</div>
                <div className="bg-primary-500">Bravo</div>
                <div className="bg-primary-500">Charlie</div>
            </Inline>
        </div>
    );
