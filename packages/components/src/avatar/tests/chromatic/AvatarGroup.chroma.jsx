import { Avatar, AvatarGroup } from "@components/avatar";
import { Div } from "@components/html";
import { Inline, Stack } from "@components/layout";
import { screen } from "@testing-library/react";
import { userEvent } from "@storybook/testing-library";

export default {
    component: AvatarGroup,
    parameters: {
        a11y: {
            config: {
                rules: [
                    {
                        id: "color-contrast",
                        enabled: false
                    }
                ]
            }
        }
    },
    title: "Chromatic/AvatarGroup"
};

export const Default = () =>
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
    </Inline>;

Default.storyName = "default";

export const NoWrap = () =>
    <Div width={12}>
        <AvatarGroup wrap={false} size="xl">
            <Avatar name="Sally Ride" />
            <Avatar name="Alan Shepard" />
            <Avatar name="Chris Hadfield" />
            <Avatar name="Christa McAuliffe" />
            <Avatar name="Neil Armstrong" />
        </AvatarGroup>
    </Div>;

NoWrap.storyName = "no wrap";

export const WithRemainings = () =>
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
    </Stack>;

WithRemainings.storyName = "with remainings";

export const Overflow = () =>
    <Div width={10}>
        <AvatarGroup size="2xl">
            <Avatar name="Sally Ride" />
            <Avatar name="Alan Shepard" />
            <Avatar name="Chris Hadfield" />
            <Avatar name="Christa McAuliffe" />
        </AvatarGroup>
    </Div>;

Overflow.storyName = "overflow";

export const Zoom = () =>
    <Stack>
        <Div className="zoom-in">
            <AvatarGroup>
                <Avatar name="Sally Ride" />
                <Avatar name="Alan Shepard" />
            </AvatarGroup>
        </Div>
        <Div className="zoom-out">
            <AvatarGroup>
                <Avatar name="Sally Ride" />
                <Avatar name="Alan Shepard" />
            </AvatarGroup>
        </Div>
    </Stack>;

Zoom.storyName = "zoom";

export const Styling = () =>
    <Inline>
        <AvatarGroup border="warning-7">
            <Avatar name="Sally Ride" />
            <Avatar name="Alan Shepard" />
        </AvatarGroup>
        <AvatarGroup className="border-red">
            <Avatar name="Sally Ride" />
            <Avatar name="Alan Shepard" />
        </AvatarGroup>
        <AvatarGroup style={{ border: "1px solid red" }}>
            <Avatar name="Sally Ride" />
            <Avatar name="Alan Shepard" />
        </AvatarGroup>
    </Inline>;

Styling.storyName = "styling";

export const WithRemainingsHover = () =>
    <AvatarGroup>
        <Avatar name="Sally Ride" />
        <Avatar name="Alan Shepard" />
        <Avatar name="Chris Hadfield" />
        <Avatar name="Christa McAuliffe" />
        <Avatar name="Neil Armstrong" />
    </AvatarGroup>
;

WithRemainingsHover.storyName = "with remainings hover";

WithRemainingsHover.play = async () => {
    userEvent.hover(screen.querySelector(".o-ui-avatar-group-remainings"));
};
