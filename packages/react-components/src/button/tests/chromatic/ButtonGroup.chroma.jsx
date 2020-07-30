import { AddIcon } from "@react-components/icons";
import { Button, ButtonGroup, IconButton } from "@react-components/button";
import { Stack } from "@react-components/layout";
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
            <ButtonGroup size="small">
                <Button>Cutoff</Button>
                <Button>Cutoff</Button>
                <Button>Cutoff</Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button>Cutoff</Button>
                <Button>Cutoff</Button>
                <Button>Cutoff</Button>
            </ButtonGroup>
            <ButtonGroup size="large">
                <Button>Cutoff</Button>
                <Button>Cutoff</Button>
                <Button>Cutoff</Button>
            </ButtonGroup>
        </Stack>
    )
    .add("icon button", () =>
        <Stack>
            <ButtonGroup size="small">
                <IconButton variant="outline" shape="circular"><AddIcon /></IconButton>
                <IconButton variant="outline" shape="circular"><AddIcon /></IconButton>
                <IconButton variant="outline" shape="circular"><AddIcon /></IconButton>
            </ButtonGroup>
            <ButtonGroup>
                <IconButton variant="outline" shape="circular"><AddIcon /></IconButton>
                <IconButton variant="outline" shape="circular"><AddIcon /></IconButton>
                <IconButton variant="outline" shape="circular"><AddIcon /></IconButton>
            </ButtonGroup>
            <ButtonGroup size="large">
                <IconButton variant="outline" shape="circular"><AddIcon /></IconButton>
                <IconButton variant="outline" shape="circular"><AddIcon /></IconButton>
                <IconButton variant="outline" shape="circular"><AddIcon /></IconButton>
            </ButtonGroup>
        </Stack>
    );
