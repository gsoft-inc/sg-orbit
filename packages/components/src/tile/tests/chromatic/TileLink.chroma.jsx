import { TileLink } from "@components/tile";
import { createTileLinkTestSuite } from "./createTileLinkTestSuite";
import { storiesOfBuilder } from "@stories/utils";


function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/TileLink")
        .segment(segment)
        .build();
}

createTileLinkTestSuite(<TileLink orientation="horizontal" width="37.5rem" />, stories("/horizontal"));

createTileLinkTestSuite(<TileLink orientation="vertical" width="18.75rem" />, stories("/vertical"));
