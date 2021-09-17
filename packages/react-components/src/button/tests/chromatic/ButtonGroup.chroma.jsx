import { AddIcon } from "@react-components/icons";
import { Button, ButtonGroup, IconButton } from "@react-components/button";
import { Inline, Stack } from "@react-components/layout";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/ButtonGroup")
        .segment(segment)
        .build();
}

stories()
    .add("default", () =>
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
        </Stack>
    )
    .add("icon button", () =>
        <Inline gap={13}>
            <Stack>
                <ButtonGroup size="sm">
                    <IconButton variant="secondary" aria-label="Add"><AddIcon /></IconButton>
                    <IconButton variant="secondary" aria-label="Add"><AddIcon /></IconButton>
                    <IconButton variant="secondary" aria-label="Add"><AddIcon /></IconButton>
                </ButtonGroup>
                <ButtonGroup>
                    <IconButton variant="secondary" aria-label="Add"><AddIcon /></IconButton>
                    <IconButton variant="secondary" aria-label="Add"><AddIcon /></IconButton>
                    <IconButton variant="secondary" aria-label="Add"><AddIcon /></IconButton>
                </ButtonGroup>
            </Stack>
            <Stack>
                <ButtonGroup size="sm">
                    <IconButton variant="secondary" aria-label="Add"><AddIcon /></IconButton>
                    <IconButton variant="secondary" aria-label="Add"><AddIcon /></IconButton>
                    <IconButton variant="secondary" aria-label="Add"><AddIcon /></IconButton>
                </ButtonGroup>
                <ButtonGroup>
                    <IconButton variant="secondary" aria-label="Add"><AddIcon /></IconButton>
                    <IconButton variant="secondary" aria-label="Add"><AddIcon /></IconButton>
                    <IconButton variant="secondary" aria-label="Add"><AddIcon /></IconButton>
                </ButtonGroup>
            </Stack>
        </Inline>
    )
    .add("fluid", () =>
        <ButtonGroup fluid>
            <Button variant="secondary">Cutoff</Button>
            <Button variant="secondary">Cutoff</Button>
            <Button variant="secondary">Cutoff</Button>
        </ButtonGroup>
    )
    .add("disabled", () =>
        <ButtonGroup disabled>
            <Button variant="secondary">Cutoff</Button>
            <Button variant="secondary">Cutoff</Button>
            <Button variant="secondary">Cutoff</Button>
        </ButtonGroup>
    )
    .add("align", () =>
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
        </Stack>
    );

stories("/vertical")
    .add("default", () =>
        <ButtonGroup orientation="vertical">
            <Button variant="secondary">Cutoff</Button>
            <Button variant="secondary">Cutoff</Button>
            <Button variant="secondary">Cutoff</Button>
        </ButtonGroup>
    )
    .add("size", () =>
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
        </Inline>
    )
    .add("align", () =>
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
    );
