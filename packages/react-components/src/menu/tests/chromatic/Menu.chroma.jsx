import { ActionMenu, Menu } from "@react-components/menu";
import { Button } from "@react-components/button";
import { Item } from "@react-components/placeholders";
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
        <ActionMenu>
            <Button>Trigger</Button>
            <Menu>
                <Item key="new">New</Item>
                <Item key="open">Open...</Item>
                <Item key="save">Save as...</Item>
                <Item key="rename">Rename</Item>
                <Item key="exit">Exit</Item>
            </Menu>
        </ActionMenu>
    );

