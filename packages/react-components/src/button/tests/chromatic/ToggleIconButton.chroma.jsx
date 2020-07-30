import { CheckIcon, CrossIcon } from "@react-components/icons";
import { Inline, Stack } from "@react-components/layout";
import { ToggleIconButton } from "@react-components/button";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("ToggleIconButton"))
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
            <Inline align="end">
                <ToggleIconButton size="small"><CheckIcon /></ToggleIconButton>
                <ToggleIconButton><CheckIcon /></ToggleIconButton>
                <ToggleIconButton size="large"><CheckIcon /></ToggleIconButton>
            </Inline>
            <Inline align="end">
                <ToggleIconButton checked><CheckIcon /></ToggleIconButton>
                <ToggleIconButton active><CheckIcon /></ToggleIconButton>
                <ToggleIconButton focus><CheckIcon /></ToggleIconButton>
                <ToggleIconButton hover><CheckIcon /></ToggleIconButton>
                <ToggleIconButton focus hover><CheckIcon /></ToggleIconButton>
                <ToggleIconButton disabled><CheckIcon /></ToggleIconButton>
            </Inline>
        </Stack>
    )
    .add("circular outline", () =>
        <Stack>
            <Inline align="end">
                <ToggleIconButton size="small" variant="outline" shape="circular"><CheckIcon /></ToggleIconButton>
                <ToggleIconButton variant="outline" shape="circular"><CheckIcon /></ToggleIconButton>
                <ToggleIconButton size="large" variant="outline" shape="circular"><CheckIcon /></ToggleIconButton>
            </Inline>
            <Inline align="end">
                <ToggleIconButton checked variant="outline" shape="circular"><CheckIcon /></ToggleIconButton>
                <ToggleIconButton active variant="outline" shape="circular"><CheckIcon /></ToggleIconButton>
                <ToggleIconButton focus variant="outline" shape="circular"><CheckIcon /></ToggleIconButton>
                <ToggleIconButton hover variant="outline" shape="circular"><CheckIcon /></ToggleIconButton>
                <ToggleIconButton focus hover variant="outline" shape="circular"><CheckIcon /></ToggleIconButton>
                <ToggleIconButton disabled variant="outline" shape="circular"><CheckIcon /></ToggleIconButton>
            </Inline>
        </Stack>
    )
    .add("square outline", () =>
        <Stack>
            <Inline align="end">
                <ToggleIconButton size="small" variant="outline" shape="square"><CheckIcon /></ToggleIconButton>
                <ToggleIconButton variant="outline" shape="square"><CheckIcon /></ToggleIconButton>
                <ToggleIconButton size="large" variant="outline" shape="square"><CheckIcon /></ToggleIconButton>
            </Inline>
            <Inline align="end">
                <ToggleIconButton checked variant="outline" shape="square"><CheckIcon /></ToggleIconButton>
                <ToggleIconButton active variant="outline" shape="square"><CheckIcon /></ToggleIconButton>
                <ToggleIconButton focus variant="outline" shape="square"><CheckIcon /></ToggleIconButton>
                <ToggleIconButton hover variant="outline" shape="square"><CheckIcon /></ToggleIconButton>
                <ToggleIconButton focus hover variant="outline" shape="square"><CheckIcon /></ToggleIconButton>
                <ToggleIconButton disabled variant="outline" shape="square"><CheckIcon /></ToggleIconButton>
            </Inline>
        </Stack>
    )
    .add("checked", () =>
        <Inline>
            <ToggleIconButton checked><CheckIcon /></ToggleIconButton>
            <ToggleIconButton defaultChecked><CheckIcon /></ToggleIconButton>
        </Inline>
    )
    .add("render props", () =>
        <Inline>
            <ToggleIconButton>
                {
                    () => <CheckIcon />
                }
            </ToggleIconButton>
            <ToggleIconButton defaultChecked>
                {
                    ({ isChecked }) => isChecked ? <CheckIcon /> : <CrossIcon />
                }
            </ToggleIconButton>
        </Inline>
    );




