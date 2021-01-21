import { Inline, Stack } from "@react-components/layout";
import { Item } from "@react-components/placeholders";
import { Menu } from "@react-components/menu";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Menu")
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .chromaticPauseAnimationAtEnd()
            .build())
        .build();
}

stories()
    .add("default", () =>
        <Menu>
            <Item key="new">New</Item>
            <Item key="open">Open...</Item>
            <Item key="save">Save as...</Item>
            <Item key="rename">Rename</Item>
            <Item key="exit">Exit</Item>
        </Menu>
    );

