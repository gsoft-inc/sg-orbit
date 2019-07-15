import { Popup } from "../../src";
import { RedBox } from "../components/red-box";
import { storiesBuilder } from "../../../../storybook/utils/stories-builder";

function stories(segment) {
    return storiesBuilder("Popup|specs")
        .segment(segment)
        .chromaticDelay(100)
        .build();
}

stories()
    .add("default", () =>
        <Popup visible>
            <RedBox />
        </Popup>
    )
    .add("top", () =>
        <Popup visible top="20px">
            <RedBox />
        </Popup>
    )
    .add("bottom", () =>
        <Popup visible bottom="20px">
            <RedBox />
        </Popup>
    )
    .add("left", () =>
        <Popup visible left="20px">
            <RedBox />
        </Popup>
    )
    .add("right", () =>
        <Popup visible right="20px">
            <RedBox />
        </Popup>
    );
