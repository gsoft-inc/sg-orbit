import { Inline } from "@components/layout";
import { NoResults } from "./assets";
import { SvgImage } from "@components/image";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/SvgImage")
        .segment(segment)
        .build();
}

stories()
    .add("stroke", () =>
        <SvgImage stroke="alias-1" src={NoResults} aria-label="No Results" />
    )
    .add("fill", () =>
        <SvgImage fill="alias-1" src={NoResults} aria-label="No Results" />
    )
    .add("width", () =>
        <SvgImage width="100px" src={NoResults} stroke="alias-1" aria-label="No Results" />
    )
    .add("height", () =>
        <SvgImage height="100px" src={NoResults} stroke="alias-1" aria-label="No Results" />
    )
    .add("size", () =>
        <SvgImage size="100px" src={NoResults} stroke="alias-1" aria-label="No Results" />
    )
    .add("styling", () =>
        <Inline>
            <SvgImage className="stroke-red" src={NoResults} aria-label="No Results" />
            <SvgImage style={{ stroke: "red" }} src={NoResults} aria-label="No Results" />
        </Inline>
    );
