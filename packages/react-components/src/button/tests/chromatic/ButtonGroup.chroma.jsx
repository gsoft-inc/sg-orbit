import { AddIcon } from "@react-components/icons";
import { Button, ButtonGroup, IconButton } from "@react-components/button";
import { Inline, Stack } from "@react-components/layout";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("ButtonGroup"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .chromaticDelay(100)
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
        <Inline>
            <Stack>
                <ButtonGroup size="sm">
                    <IconButton variant="outline" shape="circular"><AddIcon /></IconButton>
                    <IconButton variant="outline" shape="circular"><AddIcon /></IconButton>
                    <IconButton variant="outline" shape="circular"><AddIcon /></IconButton>
                </ButtonGroup>
                <ButtonGroup>
                    <IconButton variant="outline" shape="circular"><AddIcon /></IconButton>
                    <IconButton variant="outline" shape="circular"><AddIcon /></IconButton>
                    <IconButton variant="outline" shape="circular"><AddIcon /></IconButton>
                </ButtonGroup>
                <ButtonGroup size="lg">
                    <IconButton variant="outline" shape="circular"><AddIcon /></IconButton>
                    <IconButton variant="outline" shape="circular"><AddIcon /></IconButton>
                    <IconButton variant="outline" shape="circular"><AddIcon /></IconButton>
                </ButtonGroup>
            </Stack>
            <Stack>
                <ButtonGroup size="sm">
                    <IconButton variant="outline" shape="rounded"><AddIcon /></IconButton>
                    <IconButton variant="outline" shape="rounded"><AddIcon /></IconButton>
                    <IconButton variant="outline" shape="rounded"><AddIcon /></IconButton>
                </ButtonGroup>
                <ButtonGroup>
                    <IconButton variant="outline" shape="rounded"><AddIcon /></IconButton>
                    <IconButton variant="outline" shape="rounded"><AddIcon /></IconButton>
                    <IconButton variant="outline" shape="rounded"><AddIcon /></IconButton>
                </ButtonGroup>
                <ButtonGroup size="lg">
                    <IconButton variant="outline" shape="rounded"><AddIcon /></IconButton>
                    <IconButton variant="outline" shape="rounded"><AddIcon /></IconButton>
                    <IconButton variant="outline" shape="rounded"><AddIcon /></IconButton>
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
    );
