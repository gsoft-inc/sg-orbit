import { Avatar } from "@react-components/avatar";
import { Inline } from "@react-components/layout";
import { Person } from "./assets";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Avatar")
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .build())
        .build();
}

/*
SB remote API to test remote src???
*/

stories()
    .add("image", () =>
        <Inline>
            <Avatar size="2xs" name="Jane Peterson">
                <img src={Person} alt="Jane Peterson" />
            </Avatar>
            <Avatar size="xs" name="Jane Peterson">
                <img src={Person} alt="Jane Peterson" />
            </Avatar>
            <Avatar size="sm" name="Jane Peterson">
                <img src={Person} alt="Jane Peterson" />
            </Avatar>
            <Avatar size="md" name="Jane Peterson">
                <img src={Person} alt="Jane Peterson" />
            </Avatar>
            <Avatar size="lg" name="Jane Peterson">
                <img src={Person} alt="Jane Peterson" />
            </Avatar>
            <Avatar size="xl" name="Jane Peterson">
                <img src={Person} alt="Jane Peterson" />
            </Avatar>
            <Avatar size="2xl" name="Jane Peterson">
                <img src={Person} alt="Jane Peterson" />
            </Avatar>
        </Inline>
    );
