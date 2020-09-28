import { Actions } from "@react-components/form";
import { Button } from "@react-components/button";
import { Inline, Stack } from "@react-components/layout";
import { TextLink } from "@react-components/link";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Actions"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

stories()
    .add("default", () =>
        <Stack gap={10}>
            <Inline align="end" gap={13}>
                <Actions size="sm">
                    <Button>Reset</Button>
                    <Button>Submit</Button>
                </Actions>
                <Actions>
                    <Button>Reset</Button>
                    <Button>Submit</Button>
                </Actions>
                <Actions size="lg">
                    <Button>Reset</Button>
                    <Button>Submit</Button>
                </Actions>
            </Inline>
            <Inline align="end" gap={13}>
                <Actions size="sm">
                    <TextLink as="button">Reset</TextLink>
                    <Button>Submit</Button>
                </Actions>
                <Actions>
                    <TextLink as="button">Reset</TextLink>
                    <Button>Submit</Button>
                </Actions>
                <Actions size="lg">
                    <TextLink as="button">Reset</TextLink>
                    <Button>Submit</Button>
                </Actions>
            </Inline>
        </Stack>
    )
    .add("fluid", () =>
        <Stack gap={10}>
            <Inline align="end" gap={13}>
                <Actions fluid size="sm">
                    <Button>Reset</Button>
                    <Button>Submit</Button>
                </Actions>
                <Actions fluid>
                    <Button>Reset</Button>
                    <Button>Submit</Button>
                </Actions>
                <Actions fluid size="lg">
                    <Button>Reset</Button>
                    <Button>Submit</Button>
                </Actions>
            </Inline>
            <Inline align="end" gap={13}>
                <Actions fluid size="sm">
                    <TextLink as="button">Reset</TextLink>
                    <Button>Submit</Button>
                </Actions>
                <Actions fluid>
                    <TextLink as="button">Reset</TextLink>
                    <Button>Submit</Button>
                </Actions>
                <Actions fluid size="lg">
                    <TextLink as="button">Reset</TextLink>
                    <Button>Submit</Button>
                </Actions>
            </Inline>
        </Stack>
    )
    .add("disabled", () =>
        <Stack gap={10}>
            <Inline align="end" gap={13}>
                <Actions disabled size="sm">
                    <Button>Reset</Button>
                    <Button>Submit</Button>
                </Actions>
                <Actions disabled>
                    <Button>Reset</Button>
                    <Button>Submit</Button>
                </Actions>
                <Actions disabled size="lg">
                    <Button>Reset</Button>
                    <Button>Submit</Button>
                </Actions>
            </Inline>
            <Inline align="end" gap={13}>
                <Actions disabled size="sm">
                    <TextLink as="button">Reset</TextLink>
                    <Button>Submit</Button>
                </Actions>
                <Actions disabled>
                    <TextLink as="button">Reset</TextLink>
                    <Button>Submit</Button>
                </Actions>
                <Actions disabled size="lg">
                    <TextLink as="button">Reset</TextLink>
                    <Button>Submit</Button>
                </Actions>
            </Inline>
        </Stack>
    )
    .add("align start", () =>
        <Actions align="start">
            <TextLink as="button">Reset</TextLink>
            <Button>Submit</Button>
        </Actions>
    )
    .add("align end", () =>
        <Actions align="end">
            <TextLink as="button">Reset</TextLink>
            <Button>Submit</Button>
        </Actions>
    )
    .add("align center", () =>
        <Actions align="center">
            <TextLink as="button">Reset</TextLink>
            <Button>Submit</Button>
        </Actions>
    );
