import { Avatar, AvatarGroup } from "@components/avatar";
import { Div } from "@components/html";
import { Inline, Stack } from "@components/layout";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { screen, userEvent } from "@storybook/testing-library";

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
} as ComponentMeta<typeof AvatarGroup>;

type AvatarGroupStory = ComponentStoryObj<typeof AvatarGroup>;

export const Default: AvatarGroupStory = {
    storyName: "default",
    render: () => (
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
};

export const NoWrap: AvatarGroupStory = {
    storyName: "no wrap",
    render: () => (
        <Div width={12}>
            <AvatarGroup wrap={false} size="xl">
                <Avatar name="Sally Ride" />
                <Avatar name="Alan Shepard" />
                <Avatar name="Chris Hadfield" />
                <Avatar name="Christa McAuliffe" />
                <Avatar name="Neil Armstrong" />
            </AvatarGroup>
        </Div>
    )
};

export const WithRemainings: AvatarGroupStory = {
    storyName: "with remainings",
    render: () => (
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
};

export const Overflow: AvatarGroupStory = {
    storyName: "overflow",
    render: () => (
        <Div width={10}>
            <AvatarGroup size="2xl">
                <Avatar name="Sally Ride" />
                <Avatar name="Alan Shepard" />
                <Avatar name="Chris Hadfield" />
                <Avatar name="Christa McAuliffe" />
            </AvatarGroup>
        </Div>
    )
};

export const Zoom: AvatarGroupStory = {
    storyName: "zoom",
    render: () => (
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
        </Stack>
    )
};

export const Styling: AvatarGroupStory = {
    storyName: "styling",
    render: () => (
        <Inline>
            <AvatarGroup border="warning-7">
                <Avatar name="Sally Ride" />
                <Avatar name="Alan Shepard" />
            </AvatarGroup>
            <AvatarGroup className="border-red">
                <Avatar name="Sally Ride" />
                <Avatar name="Alan Shepard" />
            </AvatarGroup>
            <AvatarGroup style={{ border: "0.0625rem solid red" }}>
                <Avatar name="Sally Ride" />
                <Avatar name="Alan Shepard" />
            </AvatarGroup>
        </Inline>
    )
};

export const WithRemainingsHover: AvatarGroupStory = {
    storyName: "with remainings hover",
    render: () => (
        <AvatarGroup data-testid="avatar-group">
            <Avatar name="Sally Ride" />
            <Avatar name="Alan Shepard" />
            <Avatar name="Chris Hadfield" />
            <Avatar name="Christa McAuliffe" />
            <Avatar name="Neil Armstrong" />
        </AvatarGroup>
    ),
    play: async () => {
        await userEvent.hover(screen.getByTestId("avatar-group").lastChild as HTMLElement);
    }
};
