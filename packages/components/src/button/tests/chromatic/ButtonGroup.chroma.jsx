import { AddMajorIcon } from "@components/icons";
import { Button, ButtonGroup, IconButton } from "@components/button";
import { Div } from "@components/html";
import { Inline, Stack } from "@components/layout";
import { TextLinkAsButton } from "@components/link";

export default {
    component: ButtonGroup,
    title: "Chromatic/ButtonGroup"
};

export const Default = () =>
    <Stack>
        <ButtonGroup size="sm">
            <Button variant="secondary">Cutoff</Button>
            <Button variant="secondary">Cutoff</Button>
            <Button variant="secondary">Cutoff</Button>
        </ButtonGroup>
        <ButtonGroup>
            <Button variant="secondary">Cutoff</Button>
            <Button variant="secondary">Cutoff</Button>
            <Button variant="secondary">Cutoff</Button>
        </ButtonGroup>
    </Stack>;

Default.storyName = "default";

export const ButtonGroupMajorIconButton = () =>
    <Inline gap={13}>
        <Stack>
            <ButtonGroup size="sm">
                <IconButton variant="secondary" aria-label="Add"><AddMajorIcon /></IconButton>
                <IconButton variant="secondary" aria-label="Add"><AddMajorIcon /></IconButton>
                <IconButton variant="secondary" aria-label="Add"><AddMajorIcon /></IconButton>
            </ButtonGroup>
            <ButtonGroup>
                <IconButton variant="secondary" aria-label="Add"><AddMajorIcon /></IconButton>
                <IconButton variant="secondary" aria-label="Add"><AddMajorIcon /></IconButton>
                <IconButton variant="secondary" aria-label="Add"><AddMajorIcon /></IconButton>
            </ButtonGroup>
        </Stack>
        <Stack>
            <ButtonGroup size="sm">
                <IconButton variant="secondary" aria-label="Add"><AddMajorIcon /></IconButton>
                <IconButton variant="secondary" aria-label="Add"><AddMajorIcon /></IconButton>
                <IconButton variant="secondary" aria-label="Add"><AddMajorIcon /></IconButton>
            </ButtonGroup>
            <ButtonGroup>
                <IconButton variant="secondary" aria-label="Add"><AddMajorIcon /></IconButton>
                <IconButton variant="secondary" aria-label="Add"><AddMajorIcon /></IconButton>
                <IconButton variant="secondary" aria-label="Add"><AddMajorIcon /></IconButton>
            </ButtonGroup>
        </Stack>
    </Inline>;

ButtonGroupMajorIconButton.storyName = "icon button";

export const Fluid = () =>
    <ButtonGroup fluid>
        <Button variant="secondary">Cutoff</Button>
        <Button variant="secondary">Cutoff</Button>
        <Button variant="secondary">Cutoff</Button>
    </ButtonGroup>;

Fluid.storyName = "fluid";

export const Disabled = () =>
    <ButtonGroup disabled>
        <Button variant="secondary">Cutoff</Button>
        <Button variant="secondary">Cutoff</Button>
        <Button variant="secondary">Cutoff</Button>
    </ButtonGroup>;

Disabled.storyName = "disabled";

export const Align = () =>
    <Stack>
        <ButtonGroup align="start">
            <Button variant="tertiary">Reset</Button>
            <Button variant="primary">Submit form</Button>
        </ButtonGroup>
        <ButtonGroup align="end">
            <Button variant="tertiary">Reset</Button>
            <Button variant="primary">Submit form</Button>
        </ButtonGroup>
        <ButtonGroup align="center">
            <Button variant="tertiary">Reset</Button>
            <Button variant="primary">Submit form</Button>
        </ButtonGroup>
        <ButtonGroup>
            <TextLinkAsButton href="#">Reset</TextLinkAsButton>
            <Button variant="secondary">Submit form</Button>
        </ButtonGroup>
    </Stack>;

Align.storyName = "align";

export const Zoom = () =>
    <Stack>
        <Div className="zoom-in">
            <ButtonGroup>
                <Button variant="tertiary">Reset</Button>
                <Button variant="primary">Submit form</Button>
            </ButtonGroup>
        </Div>
        <Div className="zoom-out">
            <ButtonGroup>
                <Button variant="tertiary">Reset</Button>
                <Button variant="primary">Submit form</Button>
            </ButtonGroup>
        </Div>
    </Stack>;

Zoom.storyName = "zoom";
