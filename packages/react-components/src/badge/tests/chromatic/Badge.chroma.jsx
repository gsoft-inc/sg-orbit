import { Badge, embedBadge } from "@react-components/badge";
import { SIZE } from "@react-components/shared";
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

stories("/pipe")
    .add("default", () =>
        <Badge>100</Badge>
    )
    .add("under max value", () =>
        <Badge max={101}>100</Badge>
    )
    .add("over max value", () =>
        <Badge max={99}>100</Badge>
    )
    .add("highlight", () =>
        <Badge highlight>100</Badge>
    )
    .add("with text", () =>
        <div className="flex-column">
            <div className="mb5">Planets Visited <Badge>2</Badge></div>
            <div className="f3 mb5">Planets Visited <Badge>2</Badge></div>
            <div className="f1">Planets Visited <Badge>2</Badge></div>
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
            {embedBadge(<Badge>100</Badge>)}
        </div>
    );

stories("/dot")
    .add("empty", () =>
        <Badge dot />
    )
    .add("with value", () =>
        <Badge dot>5</Badge>
    )
    .add("disabled", () =>
        <div className="flex">
            <Badge disabled className="bg-red mr5" dot />
            <Badge disabled className="bg-red" dot>5</Badge>
        </div>
    )
    .add("size", () =>
        <div className="flex flex-column">
            <div className="flex items-end mb5">
                <Badge className="mr5" size="micro" dot />
                <Badge className="mr5" size="mini" dot />
                <Badge className="mr5" size="tiny" dot />
                <Badge className="mr5" size="small" dot />
                <Badge className="mr5" dot />
                <Badge size="large" dot />
            </div>
            <div className="flex items-end">
                <Badge className="mr5" size="micro" dot>5</Badge>
                <Badge className="mr5" size="mini" dot>5</Badge>
                <Badge className="mr5" size="tiny" dot>5</Badge>
                <Badge className="mr5" size="small" dot>5</Badge>
                <Badge className="mr5" dot>5</Badge>
                <Badge size="large" dot>5</Badge>
            </div>
        </div>
    )
    .add("styling", () =>
        <div className="flex">
            <Badge className="bg-red mr5" dot />
            <Badge style={{ backgroundColor: "red" }} dot />
        </div>
    )
    .add("embedded", () =>
        <div className="flex items-end">
            {embedBadge(<Badge className="bg-red mr5" dot />, { size: SIZE.micro })}
            {embedBadge(<Badge className="bg-red mr5" dot />, { size: SIZE.mini })}
            {embedBadge(<Badge className="bg-red mr5" dot />, { size: SIZE.tiny })}
            {embedBadge(<Badge className="bg-red mr5" dot />, { size: SIZE.small })}
            {embedBadge(<Badge className="bg-red mr5" dot />)}
            {embedBadge(<Badge className="bg-red" dot />, { size: SIZE.large })}
        </div>
    );

stories("/pill")
    .add("default", () =>
        <Badge pill>100</Badge>
    )
    .add("under max value", () =>
        <Badge max={101} pill>100</Badge>
    )
    .add("over max value", () =>
        <Badge max={99} pill>100</Badge>
    )
    .add("highlight", () =>
        <Badge highlight pill>100</Badge>
    )
    .add("size", () =>
        <div className="flex items-end">
            <Badge className="mr5" size="micro" pill>100</Badge>
            <Badge className="mr5" size="mini" pill>100</Badge>
            <Badge className="mr5" size="tiny" pill>100</Badge>
            <Badge className="mr5" size="small" pill>100</Badge>
            <Badge className="mr5" pill>100</Badge>
            <Badge size="large" pill>100</Badge>
        </div>
    )
    .add("styling", () =>
        <div className="flex">
            <Badge className="bg-red mr5" pill>100</Badge>
            <Badge style={{ backgroundColor: "red" }} pill>100</Badge>
        </div>
    )
    .add("embedded", () =>
        <div className="flex items-end">
            {embedBadge(<Badge className="mr5" pill>100</Badge>, { size: SIZE.micro })}
            {embedBadge(<Badge className="mr5" pill>100</Badge>, { size: SIZE.mini })}
            {embedBadge(<Badge className="mr5" pill>100</Badge>, { size: SIZE.tiny })}
            {embedBadge(<Badge className="mr5" pill>100</Badge>, { size: SIZE.small })}
            {embedBadge(<Badge className="mr5" pill>100</Badge>)}
            {embedBadge(<Badge pill>100</Badge>, { size: SIZE.large })}
        </div>
    );

