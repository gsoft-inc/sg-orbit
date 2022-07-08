import { Avatar } from "@components/avatar";
import { Div } from "@components/html";
import { Inline, Stack } from "@components/layout";
import { Person } from "./assets";

export default {
    title: "Chromatic/Avatar",
    component: Avatar,
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
    }
};

export const LocalImage = () => <Inline alignY="center">
    <Avatar src={Person} size="2xs" name="Neil Armstrong" />
    <Avatar src={Person} size="xs" name="Neil Armstrong" />
    <Avatar src={Person} size="sm" name="Neil Armstrong" />
    <Avatar src={Person} name="Neil Armstrong" />
    <Avatar src={Person} size="lg" name="Neil Armstrong" />
    <Avatar src={Person} size="xl" name="Neil Armstrong" />
    <Avatar src={Person} size="2xl" name="Neil Armstrong" />
</Inline>;

export const RemoteImage = () => <Avatar size="2xl" name="Neil Armstrong" src="https://randomuser.me/api/portraits/men/10.jpg" />;

export const FailingRemoteSrc = () => <Inline alignY="center">
    <Avatar size="2xs" src="https://www.google.com" name="Neil Armstrong" />
    <Avatar size="xs" src="https://www.google.com" name="Neil Armstrong" />
    <Avatar size="sm" src="https://www.google.com" name="Neil Armstrong" />
    <Avatar src="https://www.google.com" name="Neil Armstrong" />
    <Avatar size="lg" src="https://www.google.com" name="Neil Armstrong" />
    <Avatar size="xl" src="https://www.google.com" name="Neil Armstrong" />
    <Avatar size="2xl" src="https://www.google.com" name="Neil Armstrong" />
</Inline>;

export const Initials = () => <Stack>
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
</Stack>;

export const EmptySrc = () => <Inline alignY="center">
    <Avatar src="" size="2xs" name="Neil Armstrong" />
    <Avatar src="" size="xs" name="Neil Armstrong" />
    <Avatar src="" size="sm" name="Neil Armstrong" />
    <Avatar src="" name="Neil Armstrong" />
    <Avatar src="" size="lg" name="Neil Armstrong" />
    <Avatar src="" size="xl" name="Neil Armstrong" />
    <Avatar src="" size="2xl" name="Neil Armstrong" />
</Inline>;

export const Zoom = () => <Stack>
    <Div className="zoom-in">
        <Avatar src={Person} name="Neil Armstrong" />
    </Div>
    <Div className="zoom-out">
        <Avatar src={Person} name="Neil Armstrong" />
    </Div>
</Stack>;

export const Styling = () => <Inline>
    <Avatar name="Sally Ride" border="warning-7" />
    <Avatar name="Sally Ride" className="border-red" />
    <Avatar name="Sally Ride" style={{ border: "1px solid red" }} />
</Inline>;

LocalImage.storyName = "local image";
RemoteImage.storyName = "remote image";
RemoteImage.parameters = {
    chromatic: { delay: 500 }
};
FailingRemoteSrc.storyName = "failing remote src";
Initials.storyName = "initials";
EmptySrc.storyName = "empty src";
Zoom.storyName = "zoom";
Styling.storyName = "styling";
