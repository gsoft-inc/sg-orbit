import { Avatar, AvatarGroup } from "@react-components/avatar";
import { Inline, Stack } from "@react-components/layout";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/AvatarGroup")
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
    .add("default", () =>
        <Inline gap={13}>
            <Stack>
                <AvatarGroup size="2xs">
                    <Avatar name="Sally Ride" />
                    <Avatar name="Alan Shepard" />
                </AvatarGroup>
                <AvatarGroup size="xs">
                    <Avatar name="Sally Ride" />
                    <Avatar name="Alan Shepard" />
                </AvatarGroup>
                <AvatarGroup size="sm">
                    <Avatar name="Sally Ride" />
                    <Avatar name="Alan Shepard" />
                </AvatarGroup>
                <AvatarGroup>
                    <Avatar name="Sally Ride" />
                    <Avatar name="Alan Shepard" />
                </AvatarGroup>
                <AvatarGroup size="lg">
                    <Avatar name="Sally Ride" />
                    <Avatar name="Alan Shepard" />
                </AvatarGroup>
                <AvatarGroup size="xl">
                    <Avatar name="Sally Ride" />
                    <Avatar name="Alan Shepard" />
                </AvatarGroup>
                <AvatarGroup size="2xl">
                    <Avatar name="Sally Ride" />
                    <Avatar name="Alan Shepard" />
                </AvatarGroup>
            </Stack>
            <Stack>
                <AvatarGroup size="2xs">
                    <Avatar name="Sally Ride" />
                    <Avatar name="Alan Shepard" />
                    <Avatar name="Chris Hadfield" />
                    <Avatar name="Christa McAuliffe" />
                </AvatarGroup>
                <AvatarGroup size="xs">
                    <Avatar name="Sally Ride" />
                    <Avatar name="Alan Shepard" />
                    <Avatar name="Chris Hadfield" />
                    <Avatar name="Christa McAuliffe" />
                </AvatarGroup>
                <AvatarGroup size="sm">
                    <Avatar name="Sally Ride" />
                    <Avatar name="Alan Shepard" />
                    <Avatar name="Chris Hadfield" />
                    <Avatar name="Christa McAuliffe" />
                </AvatarGroup>
                <AvatarGroup>
                    <Avatar name="Sally Ride" />
                    <Avatar name="Alan Shepard" />
                    <Avatar name="Chris Hadfield" />
                    <Avatar name="Christa McAuliffe" />
                </AvatarGroup>
                <AvatarGroup size="lg">
                    <Avatar name="Sally Ride" />
                    <Avatar name="Alan Shepard" />
                    <Avatar name="Chris Hadfield" />
                    <Avatar name="Christa McAuliffe" />
                </AvatarGroup>
                <AvatarGroup size="xl">
                    <Avatar name="Sally Ride" />
                    <Avatar name="Alan Shepard" />
                    <Avatar name="Chris Hadfield" />
                    <Avatar name="Christa McAuliffe" />
                </AvatarGroup>
                <AvatarGroup size="2xl">
                    <Avatar name="Sally Ride" />
                    <Avatar name="Alan Shepard" />
                    <Avatar name="Chris Hadfield" />
                    <Avatar name="Christa McAuliffe" />
                </AvatarGroup>
            </Stack>
        </Inline>
    )
    .add("with remainings", () =>
        <Stack>
            <AvatarGroup size="2xs">
                <Avatar name="Sally Ride" />
                <Avatar name="Alan Shepard" />
                <Avatar name="Chris Hadfield" />
                <Avatar name="Christa McAuliffe" />
                <Avatar name="Neil Armstrong" />
            </AvatarGroup>
            <AvatarGroup size="xs">
                <Avatar name="Sally Ride" />
                <Avatar name="Alan Shepard" />
                <Avatar name="Chris Hadfield" />
                <Avatar name="Christa McAuliffe" />
                <Avatar name="Neil Armstrong" />
            </AvatarGroup>
            <AvatarGroup size="sm">
                <Avatar name="Sally Ride" />
                <Avatar name="Alan Shepard" />
                <Avatar name="Chris Hadfield" />
                <Avatar name="Christa McAuliffe" />
                <Avatar name="Neil Armstrong" />
            </AvatarGroup>
            <AvatarGroup>
                <Avatar name="Sally Ride" />
                <Avatar name="Alan Shepard" />
                <Avatar name="Chris Hadfield" />
                <Avatar name="Christa McAuliffe" />
                <Avatar name="Neil Armstrong" />
            </AvatarGroup>
            <AvatarGroup size="lg">
                <Avatar name="Sally Ride" />
                <Avatar name="Alan Shepard" />
                <Avatar name="Chris Hadfield" />
                <Avatar name="Christa McAuliffe" />
                <Avatar name="Neil Armstrong" />
            </AvatarGroup>
            <AvatarGroup size="xl">
                <Avatar name="Sally Ride" />
                <Avatar name="Alan Shepard" />
                <Avatar name="Chris Hadfield" />
                <Avatar name="Christa McAuliffe" />
                <Avatar name="Neil Armstrong" />
            </AvatarGroup>
            <AvatarGroup size="2xl">
                <Avatar name="Sally Ride" />
                <Avatar name="Alan Shepard" />
                <Avatar name="Chris Hadfield" />
                <Avatar name="Christa McAuliffe" />
                <Avatar name="Neil Armstrong" />
            </AvatarGroup>
        </Stack>
    )
    .add("styling", () =>
        <Inline>
            <AvatarGroup className="border-red">
                <Avatar name="Sally Ride" />
                <Avatar name="Alan Shepard" />
            </AvatarGroup>
            <AvatarGroup style={{ border: "1px solid red" }}>
                <Avatar name="Sally Ride" />
                <Avatar name="Alan Shepard" />
            </AvatarGroup>
        </Inline>
    );
