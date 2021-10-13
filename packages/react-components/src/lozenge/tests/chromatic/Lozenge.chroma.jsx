import { CheckCircleIcon, IconList } from "@react-components/icons";
import { Div } from "@react-components/html";
import { Inline, Stack } from "@react-components/layout";
import { Lozenge } from "@react-components/lozenge";
import { Text } from "@react-components/typography";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

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
        </Inline>,
         {
             ...paramsBuilder()
                 .withBreakpoints()
                 .build()
         }
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
    .add("primary", () =>
        <Stack>
            <Inline alignY="end">
                <Lozenge variant="primary" size="sm">New</Lozenge>
                <Lozenge variant="primary">New</Lozenge>
            </Inline>
            <Inline alignY="end">
                <Lozenge variant="primary" size="sm">
                    <CheckCircleIcon />
                    <Text>New</Text>
                </Lozenge>
                <Lozenge variant="primary">
                    <CheckCircleIcon />
                    <Text>New</Text>
                </Lozenge>
            </Inline>
        </Stack>
    )
    .add("styling", () =>
        <Inline>
            <Lozenge border="sunray-10">New</Lozenge>
            <Lozenge className="border-red">New</Lozenge>
            <Lozenge
                style={{
                    border: "1px solid red"
                }}
            >New</Lozenge>
        </Inline>
    );
