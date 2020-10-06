import { Inline } from "@react-components/layout";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Inline"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

stories()
    .add("default", () =>
        <Inline fluid>
            <div className="bg-primary-500">Alpha</div>
            <div className="bg-primary-500">Bravo</div>
            <div className="bg-primary-500">Charlie</div>
        </Inline>
    )
    .add("align start", () =>
        <Inline align="start">
            <div className="bg-primary-500">Alpha</div>
            <div className="bg-primary-500">Bravo</div>
            <div className="bg-primary-500">Charlie</div>
        </Inline>
    )
    .add("align end", () =>
        <Inline align="end">
            <div className="bg-primary-500">Alpha</div>
            <div className="bg-primary-500">Bravo</div>
            <div className="bg-primary-500">Charlie</div>
        </Inline>
    )
    .add("align center", () =>
        <Inline verticalAlign="center">
            <div className="bg-primary-500">Alpha</div>
            <div className="bg-primary-500">Bravo</div>
            <div className="bg-primary-500">Charlie</div>
        </Inline>
    )
    .add("vertical align start", () =>
        <Inline verticalAlign="start" style={{ height: "100px" }}>
            <div className="bg-primary-500">Alpha</div>
            <div className="bg-primary-500">Bravo</div>
            <div className="bg-primary-500">Charlie</div>
        </Inline>
    )
    .add("vertical align end", () =>
        <Inline verticalAlign="end" style={{ height: "100px" }}>
            <div className="bg-primary-500">Alpha</div>
            <div className="bg-primary-500">Bravo</div>
            <div className="bg-primary-500">Charlie</div>
        </Inline>
    )
    .add("vertical align center", () =>
        <Inline verticalAlign="center" style={{ height: "100px" }}>
            <div className="bg-primary-500">Alpha</div>
            <div className="bg-primary-500">Bravo</div>
            <div className="bg-primary-500">Charlie</div>
        </Inline>
    )
    .add("gap", () =>
        <Inline gap={10}>
            <div className="bg-primary-500">Alpha</div>
            <div className="bg-primary-500">Bravo</div>
            <div className="bg-primary-500">Charlie</div>
        </Inline>
    );
