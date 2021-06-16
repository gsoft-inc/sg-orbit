import { Avatar } from "@react-components/avatar";
import { Inline, Stack } from "@react-components/layout";
import { Person } from "./assets";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Avatar")
        .segment(segment)
        .parameters(paramsBuilder()
            .a11y({
                config: {
                    rules: [
                        { id: "color-contrast", enabled: false }
                    ]
                }
            })
            .build())
        .build();
}

stories()
    .add("local image", () =>
        <Inline verticalAlign="center">
            <Avatar src={Person} size="2xs" name="Neil Armstrong" />
            <Avatar src={Person} size="xs" name="Neil Armstrong" />
            <Avatar src={Person} size="sm" name="Neil Armstrong" />
            <Avatar src={Person} name="Neil Armstrong" />
            <Avatar src={Person} size="lg" name="Neil Armstrong" />
            <Avatar src={Person} size="xl" name="Neil Armstrong" />
            <Avatar src={Person} size="2xl" name="Neil Armstrong" />
        </Inline>
    )
    .add("remote image", () =>
        <Inline>
            <Avatar size="2xl" name="Neil Armstrong" src="https://randomuser.me/api/portraits/men/10.jpg" />
            <Avatar size="2xl" name="Neil Armstrong" src="https://randomuser.me" />
        </Inline>,
         {
             ...paramsBuilder()
                 .chromaticDelay(500)
                 .build()
         }
    )
    .add("initials", () =>
        <Stack>
            <Inline verticalAlign="center">
                <Avatar size="2xs" name="Neil Armstrong" />
                <Avatar size="xs" name="Neil Armstrong" />
                <Avatar size="sm" name="Neil Armstrong" />
                <Avatar name="Neil Armstrong" />
                <Avatar size="lg" name="Neil Armstrong" />
                <Avatar size="xl" name="Neil Armstrong" />
                <Avatar size="2xl" name="Neil Armstrong" />
            </Inline>
            <Inline>
                <Avatar name="Sally Ride" />
                <Avatar name="Alan Shepard" />
                <Avatar name="Chris Hadfield" />
                <Avatar name="Christa McAuliffe" />
            </Inline>
        </Stack>
    )
    .add("styling", () =>
        <Inline>
            <Avatar name="Sally Ride" className="border-red" />
            <Avatar name="Sally Ride" style={{ border: "1px solid red" }} />
        </Inline>
    );
