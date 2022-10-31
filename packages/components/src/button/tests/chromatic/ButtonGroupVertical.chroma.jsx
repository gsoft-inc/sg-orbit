import { Button, ButtonGroup } from "@components/button";
import { Div } from "@components/html";
import { Inline, Stack } from "@components/layout";
import { TextLinkAsButton } from "@components/link";

export default {
    component: ButtonGroup,
    title: "Chromatic/ButtonGroup/vertical"
};

export const Default = () =>
    <ButtonGroup orientation="vertical">
        <Button variant="secondary">Cutoff</Button>
        <Button variant="secondary">Cutoff</Button>
        <Button variant="secondary">Cutoff</Button>
    </ButtonGroup>;

export const Size = () =>
    <Inline alignY="end">
        <ButtonGroup orientation="vertical" size="sm">
            <Button variant="secondary">Cutoff</Button>
            <Button variant="secondary">Cutoff</Button>
            <Button variant="secondary">Cutoff</Button>
        </ButtonGroup>
        <ButtonGroup orientation="vertical">
            <Button variant="secondary">Cutoff</Button>
            <Button variant="secondary">Cutoff</Button>
            <Button variant="secondary">Cutoff</Button>
        </ButtonGroup>
    </Inline>;

export const Align = () =>
    <Stack>
        <Inline>
            <ButtonGroup align="start" orientation="vertical">
                <Button variant="secondary">Reset</Button>
                <Button variant="secondary">Submit form</Button>
            </ButtonGroup>
            <ButtonGroup align="end" orientation="vertical">
                <Button variant="secondary">Reset</Button>
                <Button variant="secondary">Submit form</Button>
            </ButtonGroup>
            <ButtonGroup align="center" orientation="vertical">
                <Button variant="secondary">Reset</Button>
                <Button variant="secondary">Submit form</Button>
            </ButtonGroup>
        </Inline>
        <ButtonGroup orientation="vertical">
            <TextLinkAsButton href="#">Reset</TextLinkAsButton>
            <Button variant="secondary">Submit form</Button>
        </ButtonGroup>
    </Stack>;

export const Zoom = () =>
    <Inline>
        <Div className="zoom-in">
            <ButtonGroup orientation="vertical">
                <Button variant="tertiary">Reset</Button>
                <Button variant="primary">Submit form</Button>
            </ButtonGroup>
        </Div>
        <Div className="zoom-out">
            <ButtonGroup orientation="vertical">
                <Button variant="tertiary">Reset</Button>
                <Button variant="primary">Submit form</Button>
            </ButtonGroup>
        </Div>
    </Inline>;

Default.storyName = "default";
Size.storyName = "size";
Align.storyName = "align";
Zoom.storyName = "zoom";
