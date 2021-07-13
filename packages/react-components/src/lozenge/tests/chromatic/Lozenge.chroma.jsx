import { CheckCircleIcon, IconList } from "@react-components/icons";
import { Inline, Stack } from "@react-components/layout";
import { Lozenge } from "@react-components/lozenge";
import { Text } from "@react-components/typography";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Lozenge")
        .segment(segment)
        .build();
}

stories()
    .add("default", () =>
        <Inline verticalAlign="end">
            <Lozenge size="sm">New</Lozenge>
            <Lozenge>New</Lozenge>
        </Inline>
    )
    .add("icon", () =>
        <Stack>
            <Inline verticalAlign="end">
                <Lozenge size="sm">
                    <CheckCircleIcon />
                    <Text>New</Text>
                </Lozenge>
                <Lozenge>
                    <CheckCircleIcon />
                    <Text>New</Text>
                </Lozenge>
            </Inline>
            <div>
                <Lozenge>
                    <IconList>
                        <CheckCircleIcon /><CheckCircleIcon />
                    </IconList>
                    <Text>New</Text>
                </Lozenge>
            </div>
        </Stack>
    )
    .add("primary", () =>
        <Stack>
            <Inline verticalAlign="end">
                <Lozenge color="primary" size="sm">New</Lozenge>
                <Lozenge color="primary">New</Lozenge>
            </Inline>
            <Inline verticalAlign="end">
                <Lozenge color="primary" size="sm">
                    <CheckCircleIcon />
                    <Text>New</Text>
                </Lozenge>
                <Lozenge color="primary">
                    <CheckCircleIcon />
                    <Text>New</Text>
                </Lozenge>
            </Inline>
        </Stack>
    )
    .add("styling", () =>
        <Inline>
            <Lozenge className="border-red">New</Lozenge>
            <Lozenge
                style={{
                    border: "1px solid red"
                }}
            >New</Lozenge>
        </Inline>
    );
