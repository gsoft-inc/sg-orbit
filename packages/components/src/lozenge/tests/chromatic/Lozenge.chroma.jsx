import { CheckCircleIcon, IconList } from "@components/icons";
import { Div } from "@components/html";
import { Inline, Stack } from "@components/layout";
import { Lozenge } from "@components/lozenge";
import { Text } from "@components/typography";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Lozenge")
        .segment(segment)
        .build();
}

stories()
    .add("default", () =>
        <Inline alignY="end">
            <Lozenge size="sm">New</Lozenge>
            <Lozenge>New</Lozenge>
        </Inline>
    )
    .add("variants", () =>
        <Inline alignY="end">
            <Lozenge size="sm">New</Lozenge>
            <Lozenge >New</Lozenge>
            <Lozenge tone="warning" size="sm">New</Lozenge>
            <Lozenge tone="warning">New</Lozenge>
            <Lozenge tone="positive" size="sm">New</Lozenge>
            <Lozenge tone="positive">New</Lozenge>
            <Lozenge tone="negative" size="sm">New</Lozenge>
            <Lozenge tone="negative">New</Lozenge>
            <Lozenge tone="informative" size="sm">New</Lozenge>
            <Lozenge tone="informative">New</Lozenge>

            <Inline alignY="end">
                <Lozenge size="sm">
                    <CheckCircleIcon />
                    <Text>New</Text>
                </Lozenge>
                <Lozenge>
                    <CheckCircleIcon />
                    <Text>New</Text>
                </Lozenge>
                <Lozenge tone="warning" size="sm">
                    <CheckCircleIcon />
                    <Text>New</Text>
                </Lozenge>
                <Lozenge tone="warning">
                    <CheckCircleIcon />
                    <Text>New</Text>
                </Lozenge>
                <Lozenge tone="positive" size="sm">
                    <CheckCircleIcon />
                    <Text>New</Text>
                </Lozenge>
                <Lozenge tone="positive">
                    <CheckCircleIcon />
                    <Text>New</Text>
                </Lozenge>
                <Lozenge tone="negative" size="sm">
                    <CheckCircleIcon />
                    <Text>New</Text>
                </Lozenge>
                <Lozenge tone="negative">
                    <CheckCircleIcon />
                    <Text>New</Text>
                </Lozenge>
                <Lozenge tone="informative" size="sm">
                    <CheckCircleIcon />
                    <Text>New</Text>
                </Lozenge>
                <Lozenge tone="informative">
                    <CheckCircleIcon />
                    <Text>New</Text>
                </Lozenge>
            </Inline>
        </Inline>
    )
    .add("icon", () =>
        <Stack>
            <Inline alignY="end">
                <Lozenge size="sm">
                    <CheckCircleIcon />
                    <Text>New</Text>
                </Lozenge>
                <Lozenge>
                    <CheckCircleIcon />
                    <Text>New</Text>
                </Lozenge>
            </Inline>
            <Div>
                <Lozenge>
                    <IconList>
                        <CheckCircleIcon /><CheckCircleIcon />
                    </IconList>
                    <Text>New</Text>
                </Lozenge>
            </Div>
        </Stack>
    )
    .add("highlight and tone", () =>
        <Stack>
            <Inline alignY="end">
                <Lozenge variant="highlight" size="sm">New</Lozenge>
                <Lozenge variant="highlight">New</Lozenge>
                <Lozenge tone="warning" variant="highlight" size="sm">New</Lozenge>
                <Lozenge tone="warning" variant="highlight">New</Lozenge>
                <Lozenge tone="positive" variant="highlight" size="sm">New</Lozenge>
                <Lozenge tone="positive" variant="highlight">New</Lozenge>
                <Lozenge tone="negative" variant="highlight" size="sm">New</Lozenge>
                <Lozenge tone="negative" variant="highlight">New</Lozenge>
                <Lozenge variant="highlight" tone="informative" size="sm">New</Lozenge>
                <Lozenge variant="highlight" tone="informative">New</Lozenge>
            </Inline>
            <Inline alignY="end">
                <Lozenge variant="highlight" size="sm">
                    <CheckCircleIcon />
                    <Text>New</Text>
                </Lozenge>
                <Lozenge variant="highlight">
                    <CheckCircleIcon />
                    <Text>New</Text>
                </Lozenge>
                <Lozenge tone="warning" variant="highlight" size="sm">
                    <CheckCircleIcon />
                    <Text>New</Text>
                </Lozenge>
                <Lozenge tone="warning" variant="highlight">
                    <CheckCircleIcon />
                    <Text>New</Text>
                </Lozenge>
                <Lozenge tone="positive" variant="highlight" size="sm">
                    <CheckCircleIcon />
                    <Text>New</Text>
                </Lozenge>
                <Lozenge tone="positive" variant="highlight">
                    <CheckCircleIcon />
                    <Text>New</Text>
                </Lozenge>
                <Lozenge tone="negative" variant="highlight" size="sm">
                    <CheckCircleIcon />
                    <Text>New</Text>
                </Lozenge>
                <Lozenge tone="negative" variant="highlight">
                    <CheckCircleIcon />
                    <Text>New</Text>
                </Lozenge>
                <Lozenge tone="informative" variant="highlight" size="sm">
                    <CheckCircleIcon />
                    <Text>New</Text>
                </Lozenge>
                <Lozenge tone="informative" variant="highlight">
                    <CheckCircleIcon />
                    <Text>New</Text>
                </Lozenge>
            </Inline>
        </Stack>
    )
    .add("zoom", () =>
        <Inline>
            <Div className="zoom-in">
                <Lozenge>New</Lozenge>
            </Div>
            <Div className="zoom-out">
                <Lozenge>New</Lozenge>
            </Div>
        </Inline>
    )
    .add("styling", () =>
        <Inline>
            <Lozenge border="warning-7">New</Lozenge>
            <Lozenge className="border-red">New</Lozenge>
            <Lozenge
                style={{
                    border: "1px solid red"
                }}
            >New</Lozenge>
        </Inline>
    );
