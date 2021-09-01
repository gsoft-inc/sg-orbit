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
        <Inline alignY="center">
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
        <Avatar size="2xl" name="Neil Armstrong" src="https://randomuser.me/api/portraits/men/10.jpg" />,
         {
             ...paramsBuilder()
                 .chromaticDelay(500)
                 .build()
         }
    )
    .add("failing remote src", () =>
        <Inline alignY="center">
            <Avatar size="2xs" src="https://www.google.com" name="Neil Armstrong" />
            <Avatar size="xs" src="https://www.google.com" name="Neil Armstrong" />
            <Avatar size="sm" src="https://www.google.com" name="Neil Armstrong" />
            <Avatar src="https://www.google.com" name="Neil Armstrong" />
            <Avatar size="lg" src="https://www.google.com" name="Neil Armstrong" />
            <Avatar size="xl" src="https://www.google.com" name="Neil Armstrong" />
            <Avatar size="2xl" src="https://www.google.com" name="Neil Armstrong" />
        </Inline>
    )
    .add("initials", () =>
        <Stack>
            <Inline alignY="center">
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
    .add("empty src", () =>
        <Inline alignY="center">
            <Avatar src="" size="2xs" name="Neil Armstrong" />
            <Avatar src="" size="xs" name="Neil Armstrong" />
            <Avatar src="" size="sm" name="Neil Armstrong" />
            <Avatar src="" name="Neil Armstrong" />
            <Avatar src="" size="lg" name="Neil Armstrong" />
            <Avatar src="" size="xl" name="Neil Armstrong" />
            <Avatar src="" size="2xl" name="Neil Armstrong" />
        </Inline>
    )
    .add("styling", () =>
        <Inline>
            <Avatar name="Sally Ride" className="border-red" />
            <Avatar name="Sally Ride" style={{ border: "1px solid red" }} />
        </Inline>
    );
