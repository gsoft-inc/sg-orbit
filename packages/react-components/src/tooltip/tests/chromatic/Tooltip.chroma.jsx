import { Button } from "@react-components/button";
import { Content } from "@react-components/placeholders";
import { EmailIcon } from "@react-components/icons";
import { Tooltip } from "@react-components/tooltip";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Tooltip")
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .chromaticPauseAnimationAtEnd()
            .build())
        .build();
}

stories()
    .add("default", () =>
        <Tooltip>
            <Button>Trigger</Button>
            <Content>Hey!</Content>
        </Tooltip>
    )
    .add("open", () =>
        <Tooltip open>
            <Button>Trigger</Button>
            <Content>Hey!</Content>
        </Tooltip>
    )
    .add("disabled", () =>
        <Tooltip disabled open>
            <Button>Trigger</Button>
            <Content>Hey!</Content>
        </Tooltip>
    );
