import { Badge, embedBadge } from "@react-components/badge";
import { CheckIcon } from "@react-components/icons";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Badge"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .chromaticDelay(100)
            .build())
        .build();
}

stories("/pill")
    .add("default", () =>
        <Badge>100</Badge>
    )
    .add("addition", () =>
        <Badge>+1</Badge>
    )
    .add("removal", () =>
        <Badge>-1</Badge>
    )
    .add("highlight", () =>
        <Badge highlight>100</Badge>
    )
    .add("disabled", () =>
        <Badge disabled>100</Badge>
    )
    .add("size", () =>
        <div className="flex items-end">
            <Badge className="mr5" size="micro">100</Badge>
            <Badge className="mr5" size="mini">100</Badge>
            <Badge className="mr5" size="tiny">100</Badge>
            <Badge className="mr5" size="small">100</Badge>
            <Badge className="mr5">100</Badge>
            <Badge size="large">100</Badge>
        </div>
    )
    .add("styling", () =>
        <div className="flex">
            <Badge className="bg-red mr5">100</Badge>
            <Badge style={{ backgroundColor: "red" }}>100</Badge>
        </div>
    )
    .add("embedded", () =>
        <div className="flex items-end">
            {embedBadge(<Badge className="mr5">100</Badge>, { size: "mini" })}
            {embedBadge(<Badge className="mr5">100</Badge>, { size: "tiny" })}
            {embedBadge(<Badge className="mr5">100</Badge>, { size: "small" })}
            {embedBadge(<Badge className="mr5">100</Badge>)}
            {embedBadge(<Badge>100</Badge>, { size: "large" })}
        </div>
    );

stories("/inline")
    .add("default", () =>
        <Badge variant="inline">100</Badge>
    )
    .add("addition", () =>
        <Badge variant="inline">+1</Badge>
    )
    .add("removal", () =>
        <Badge variant="inline">-1</Badge>
    )
    .add("highlight", () =>
        <Badge highlight variant="inline">100</Badge>
    )
    .add("disabled", () =>
        <Badge disabled variant="inline">100</Badge>
    )
    .add("with text", () =>
        <div className="flex-column">
            <div className="mb5">Planets Visited <Badge variant="inline">2</Badge></div>
            <div className="f3 mb5">Planets Visited <Badge variant="inline">2</Badge></div>
            <div className="f1">Planets Visited <Badge variant="inline">2</Badge></div>
        </div>
    )
    .add("styling", () =>
        <div className="flex">
            <Badge className="bg-red mr5" variant="inline">100</Badge>
            <Badge style={{ backgroundColor: "red" }} variant="inline">100</Badge>
        </div>
    )
    .add("embedded", () =>
        <div className="flex items-end">
            {embedBadge(<Badge variant="inline">100</Badge>)}
        </div>
    );

stories("/dot")
    .add("empty", () =>
        <Badge variant="dot" />
    )
    .add("disabled", () =>
        <Badge disabled variant="dot" className="mr5" />
    )
    .add("size", () =>
        <div className="flex flex-column">
            <div className="flex items-end mb5">
                <Badge variant="dot" className="mr5" size="micro" />
                <Badge variant="dot" className="mr5" size="mini" />
                <Badge variant="dot" className="mr5" size="tiny" />
                <Badge variant="dot" className="mr5" size="small" />
                <Badge variant="dot" className="mr5" />
                <Badge variant="dot" size="large" />
            </div>
        </div>
    )
    .add("styling", () =>
        <div className="flex">
            <Badge variant="dot" className="bg-red mr5" />
            <Badge variant="dot" style={{ backgroundColor: "red" }} />
        </div>
    )
    .add("embedded", () =>
        <div className="flex items-end">
            {embedBadge(<Badge variant="dot" className="mr5" />, { size: "mini" })}
            {embedBadge(<Badge variant="dot" className="mr5" />, { size: "tiny" })}
            {embedBadge(<Badge variant="dot" className="mr5" />, { size: "small" })}
            {embedBadge(<Badge variant="dot" className="mr5" />)}
            {embedBadge(<Badge variant="dot" />, { size: "large" })}
        </div>
    );

stories("/icon")
    .add("default", () =>
        <Badge variant="icon"><CheckIcon /></Badge>
    )
    .add("highlight", () =>
        <Badge highlight variant="icon"><CheckIcon /></Badge>
    )
    .add("disabled", () =>
        <Badge disabled variant="icon"><CheckIcon /></Badge>
    )
    .add("size", () =>
        <div className="flex items-end">
            <Badge variant="icon" className="mr5" size="tiny"><CheckIcon /></Badge>
            <Badge variant="icon" className="mr5" size="small"><CheckIcon /></Badge>
            <Badge variant="icon" className="mr5"><CheckIcon /></Badge>
            <Badge variant="icon" size="large"><CheckIcon /></Badge>
        </div>
    )
    .add("styling", () =>
        <div className="flex">
            <Badge className="bg-red mr5" variant="icon"><CheckIcon /></Badge>
            <Badge style={{ backgroundColor: "red" }} variant="icon"><CheckIcon /></Badge>
        </div>
    );
