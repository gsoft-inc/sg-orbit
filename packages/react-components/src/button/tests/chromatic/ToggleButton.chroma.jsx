import { Div } from "@react-components/html";
import { Inline, Stack } from "@react-components/layout";
import { LightbulbIcon } from "@react-components/icons";
import { Text } from "@react-components/typography";
import { ToggleButton } from "@react-components/button";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/ToggleButton")
        .segment(segment)
        .build();
}

stories()
    .add("default", () =>
        <Stack>
            <Inline alignY="end">
                <ToggleButton size="sm">Cutoff</ToggleButton>
                <ToggleButton>Cutoff</ToggleButton>
            </Inline>
            <Inline alignY="end">
                <ToggleButton checked>Cutoff</ToggleButton>
                <ToggleButton active>Cutoff</ToggleButton>
                <ToggleButton focus>Cutoff</ToggleButton>
                <ToggleButton hover>Cutoff</ToggleButton>
                <ToggleButton focus hover>Cutoff</ToggleButton>
                <ToggleButton disabled>Cutoff</ToggleButton>
            </Inline>
            <Div>
                <ToggleButton>
                    <Text>Cutoff</Text>
                    <LightbulbIcon />
                </ToggleButton>
            </Div>
            <Inline alignY="end">
                <ToggleButton color="primary" checked>Cutoff</ToggleButton>
                <ToggleButton color="primary" active>Cutoff</ToggleButton>
                <ToggleButton color="primary" focus>Cutoff</ToggleButton>
                <ToggleButton color="primary" hover>Cutoff</ToggleButton>
                <ToggleButton color="primary" focus hover>Cutoff</ToggleButton>
                <ToggleButton color="primary" disabled>Cutoff</ToggleButton>
            </Inline>
            <Div>
                <ToggleButton color="primary">
                    <Text>Cutoff</Text>
                    <LightbulbIcon />
                </ToggleButton>
            </Div>
            <Inline alignY="end">
                <ToggleButton color="secondary" checked>Cutoff</ToggleButton>
                <ToggleButton color="secondary" active>Cutoff</ToggleButton>
                <ToggleButton color="secondary" focus>Cutoff</ToggleButton>
                <ToggleButton color="secondary" hover>Cutoff</ToggleButton>
                <ToggleButton color="secondary" focus hover>Cutoff</ToggleButton>
                <ToggleButton color="secondary" disabled>Cutoff</ToggleButton>
            </Inline>
            <Div>
                <ToggleButton color="secondary">
                    <Text>Cutoff</Text>
                    <LightbulbIcon />
                </ToggleButton>
            </Div>
        </Stack>
    )
    .add("circular outline", () =>
        <Stack>
            <Inline alignY="end">
                <ToggleButton size="sm" variant="outline" shape="circular">Aa</ToggleButton>
                <ToggleButton variant="outline" shape="circular">Aa</ToggleButton>
            </Inline>
            <Inline alignY="end">
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
            <Inline alignY="end">
                <ToggleButton size="sm" variant="outline" shape="rounded">Aa</ToggleButton>
                <ToggleButton variant="outline" shape="rounded">Aa</ToggleButton>
            </Inline>
            <Inline alignY="end">
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
    .add("styling", () =>
        <Inline>
            <ToggleButton className="bg-red">Cutoff</ToggleButton>
            <ToggleButton style={{ backgroundColor: "red" }}>Cutoff</ToggleButton>
        </Inline>
    );




