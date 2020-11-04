import { Inline, Stack } from "@react-components/layout";
import { LightbulbIcon } from "@react-components/icons";
import { Text } from "@react-components/text";
import { ToggleButton } from "@react-components/button";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("ToggleButton"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

stories()
    .add("default", () =>
        <Stack>
            <Inline verticalAlign="end">
                <ToggleButton size="sm">Cutoff</ToggleButton>
                <ToggleButton>Cutoff</ToggleButton>
            </Inline>
            <Inline verticalAlign="end">
                <ToggleButton checked>Cutoff</ToggleButton>
                <ToggleButton active>Cutoff</ToggleButton>
                <ToggleButton focus>Cutoff</ToggleButton>
                <ToggleButton hover>Cutoff</ToggleButton>
                <ToggleButton focus hover>Cutoff</ToggleButton>
                <ToggleButton disabled>Cutoff</ToggleButton>
            </Inline>
            <div>
                <ToggleButton>
                    <Text>Cutoff</Text>
                    <LightbulbIcon />
                </ToggleButton>
            </div>
        </Stack>
    )
    .add("circular outline", () =>
        <Stack>
            <Inline verticalAlign="end">
                <ToggleButton size="sm" variant="outline" shape="circular">Aa</ToggleButton>
                <ToggleButton variant="outline" shape="circular">Aa</ToggleButton>
            </Inline>
            <Inline verticalAlign="end">
                <ToggleButton checked variant="outline" shape="circular">Aa</ToggleButton>
                <ToggleButton active variant="outline" shape="circular">Aa</ToggleButton>
                <ToggleButton focus variant="outline" shape="circular">Aa</ToggleButton>
                <ToggleButton hover variant="outline" shape="circular">Aa</ToggleButton>
                <ToggleButton focus hover variant="outline" shape="circular">Aa</ToggleButton>
                <ToggleButton disabled variant="outline" shape="circular">Aa</ToggleButton>
            </Inline>
        </Stack>
    )
    .add("rounded outline", () =>
        <Stack>
            <Inline verticalAlign="end">
                <ToggleButton size="sm" variant="outline" shape="rounded">Aa</ToggleButton>
                <ToggleButton variant="outline" shape="rounded">Aa</ToggleButton>
            </Inline>
            <Inline verticalAlign="end">
                <ToggleButton checked variant="outline" shape="rounded">Aa</ToggleButton>
                <ToggleButton active variant="outline" shape="rounded">Aa</ToggleButton>
                <ToggleButton focus variant="outline" shape="rounded">Aa</ToggleButton>
                <ToggleButton hover variant="outline" shape="rounded">Aa</ToggleButton>
                <ToggleButton focus hover variant="outline" shape="rounded">Aa</ToggleButton>
                <ToggleButton disabled variant="outline" shape="rounded">Aa</ToggleButton>
            </Inline>
        </Stack>
    )
    .add("checked", () =>
        <Inline>
            <ToggleButton checked>Cutoff</ToggleButton>
            <ToggleButton defaultChecked>Cutoff</ToggleButton>
            <ToggleButton checked>
                <Text>Cutoff</Text>
                <LightbulbIcon />
            </ToggleButton>
        </Inline>
    )
    .add("render props", () =>
        <Inline>
            <ToggleButton>
                {
                    () => "Cutoff"
                }
            </ToggleButton>
            <ToggleButton defaultChecked>
                {
                    ({ isChecked }) => isChecked ? "Checked" : "Cutoff"
                }
            </ToggleButton>
        </Inline>
    )
    .add("styling", () =>
        <Inline>
            <ToggleButton className="bg-red">Cutoff</ToggleButton>
            <ToggleButton style={{ backgroundColor: "red" }}>Cutoff</ToggleButton>
        </Inline>
    );




