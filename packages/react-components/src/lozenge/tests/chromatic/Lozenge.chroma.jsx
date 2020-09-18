import { CheckCircleIcon, IconGroup } from "@react-components/icons";
import { Inline, Stack } from "@react-components/layout";
import { Lozenge } from "@react-components/lozenge";
import { Text } from "@react-components/text";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Lozenge"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .chromaticDelay(100)
            .build())
        .build();
}

stories()
    .add("default", () =>
        <Lozenge>New</Lozenge>
    )
    .add("icon", () =>
        <Stack>
            <Inline align="end">
                <Lozenge size="sm">
                    <CheckCircleIcon />
                    <Text>New</Text>
                </Lozenge>
                <Lozenge>
                    <CheckCircleIcon />
                    <Text>New</Text>
                </Lozenge>
                <Lozenge size="lg">
                    <CheckCircleIcon />
                    <Text>New</Text>
                </Lozenge>
            </Inline>
            <div>
                <Lozenge>
                    <IconGroup>
                        <CheckCircleIcon /><CheckCircleIcon />
                    </IconGroup>
                    <Text>New</Text>
                </Lozenge>
            </div>
        </Stack>
    )
    .add("size", () =>
        <Inline align="end">
            <Lozenge size="sm">New</Lozenge>
            <Lozenge>New</Lozenge>
            <Lozenge size="lg">New</Lozenge>
        </Inline>
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
