import { AddIcon } from "@react-components/icons";
import { Button, ButtonGroup, IconButton } from "@react-components/button";
import { Inline, Stack } from "@react-components/layout";
import { TextLink } from "@react-components/link";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("ButtonGroup"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

stories()
    .add("default", () =>
        <Stack>
            <ButtonGroup size="sm">
                <Button>Cutoff</Button>
                <Button>Cutoff</Button>
                <Button>Cutoff</Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button>Cutoff</Button>
                <Button>Cutoff</Button>
                <Button>Cutoff</Button>
            </ButtonGroup>
            <ButtonGroup size="lg">
                <Button>Cutoff</Button>
                <Button>Cutoff</Button>
                <Button>Cutoff</Button>
            </ButtonGroup>
        </Stack>
    )
    .add("icon button", () =>
        <Inline gap={13}>
            <Stack>
                <ButtonGroup size="sm">
                    <IconButton variant="outline" shape="circular" aria-label="Add"><AddIcon /></IconButton>
                    <IconButton variant="outline" shape="circular" aria-label="Add"><AddIcon /></IconButton>
                    <IconButton variant="outline" shape="circular" aria-label="Add"><AddIcon /></IconButton>
                </ButtonGroup>
                <ButtonGroup>
                    <IconButton variant="outline" shape="circular" aria-label="Add"><AddIcon /></IconButton>
                    <IconButton variant="outline" shape="circular" aria-label="Add"><AddIcon /></IconButton>
                    <IconButton variant="outline" shape="circular" aria-label="Add"><AddIcon /></IconButton>
                </ButtonGroup>
                <ButtonGroup size="lg">
                    <IconButton variant="outline" shape="circular" aria-label="Add"><AddIcon /></IconButton>
                    <IconButton variant="outline" shape="circular" aria-label="Add"><AddIcon /></IconButton>
                    <IconButton variant="outline" shape="circular" aria-label="Add"><AddIcon /></IconButton>
                </ButtonGroup>
            </Stack>
            <Stack>
                <ButtonGroup size="sm">
                    <IconButton variant="outline" shape="rounded" aria-label="Add"><AddIcon /></IconButton>
                    <IconButton variant="outline" shape="rounded" aria-label="Add"><AddIcon /></IconButton>
                    <IconButton variant="outline" shape="rounded" aria-label="Add"><AddIcon /></IconButton>
                </ButtonGroup>
                <ButtonGroup>
                    <IconButton variant="outline" shape="rounded" aria-label="Add"><AddIcon /></IconButton>
                    <IconButton variant="outline" shape="rounded" aria-label="Add"><AddIcon /></IconButton>
                    <IconButton variant="outline" shape="rounded" aria-label="Add"><AddIcon /></IconButton>
                </ButtonGroup>
                <ButtonGroup size="lg">
                    <IconButton variant="outline" shape="rounded" aria-label="Add"><AddIcon /></IconButton>
                    <IconButton variant="outline" shape="rounded" aria-label="Add"><AddIcon /></IconButton>
                    <IconButton variant="outline" shape="rounded" aria-label="Add"><AddIcon /></IconButton>
                </ButtonGroup>
            </Stack>
        </Inline>
    )
    .add("fluid", () =>
        <ButtonGroup fluid>
            <Button>Cutoff</Button>
            <Button>Cutoff</Button>
            <Button>Cutoff</Button>
        </ButtonGroup>
    )
    .add("disabled", () =>
        <ButtonGroup disabled>
            <Button>Cutoff</Button>
            <Button>Cutoff</Button>
            <Button>Cutoff</Button>
        </ButtonGroup>
    )
    .add("align", () =>
        <Stack>
            <ButtonGroup align="start">
                <TextLink as="button">Reset</TextLink>
                <Button>Submit form</Button>
            </ButtonGroup>
            <ButtonGroup align="end">
                <TextLink as="button">Reset</TextLink>
                <Button>Submit form</Button>
            </ButtonGroup>
            <ButtonGroup align="center">
                <TextLink as="button">Reset</TextLink>
                <Button>Submit form</Button>
            </ButtonGroup>
        </Stack>
    );

stories("/vertical")
    .add("default", () =>
        <ButtonGroup orientation="vertical">
            <Button>Cutoff</Button>
            <Button>Cutoff</Button>
            <Button>Cutoff</Button>
        </ButtonGroup>
    )
    .add("size", () =>
        <Inline verticalAlign="end">
            <ButtonGroup orientation="vertical" size="sm">
                <Button>Cutoff</Button>
                <Button>Cutoff</Button>
                <Button>Cutoff</Button>
            </ButtonGroup>
            <ButtonGroup orientation="vertical">
                <Button>Cutoff</Button>
                <Button>Cutoff</Button>
                <Button>Cutoff</Button>
            </ButtonGroup>
            <ButtonGroup orientation="vertical" size="lg">
                <Button>Cutoff</Button>
                <Button>Cutoff</Button>
                <Button>Cutoff</Button>
            </ButtonGroup>
        </Inline>
    )
    .add("align", () =>
        <Inline>
            <ButtonGroup align="start" orientation="vertical">
                <Button>Reset</Button>
                <Button>Submit form</Button>
            </ButtonGroup>
            <ButtonGroup align="end" orientation="vertical">
                <Button>Reset</Button>
                <Button>Submit form</Button>
            </ButtonGroup>
            <ButtonGroup align="center" orientation="vertical">
                <Button>Reset</Button>
                <Button>Submit form</Button>
            </ButtonGroup>
        </Inline>
    );
