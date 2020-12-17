import { Stack } from "@react-components/layout";
import { Text } from "@react-components/text";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Stack")
        .segment(segment)
        .build();
}

stories()
    .add("default", () =>
        <Stack>
            <div className="bg-primary-500"><Text>Alpha</Text></div>
            <div className="bg-primary-500"><Text>Bravo</Text></div>
            <div className="bg-primary-500"><Text>Charlie</Text></div>
        </Stack>
    )
    .add("align start", () =>
        <Stack align="start">
            <div><Text>Alpha</Text></div>
            <div>Bravo</div>
            <div>Charlie</div>
        </Stack>
    )
    .add("align end", () =>
        <Stack align="end">
            <div><Text>Alpha</Text></div>
            <div><Text>Bravo</Text></div>
            <div><Text>Charlie</Text></div>
        </Stack>
    )
    .add("align center", () =>
        <Stack align="center">
            <div><Text>Alpha</Text></div>
            <div><Text>Bravo</Text></div>
            <div><Text>Charlie</Text></div>
        </Stack>
    )
    .add("vertical align start", () =>
        <Stack verticalAlign="start" style={{ height: "200px" }}>
            <div><Text>Alpha</Text></div>
            <div><Text>Bravo</Text></div>
            <div><Text>Charlie</Text></div>
        </Stack>
    )
    .add("vertical align end", () =>
        <Stack verticalAlign="end" style={{ height: "200px" }}>
            <div><Text>Alpha</Text></div>
            <div><Text>Bravo</Text></div>
            <div><Text>Charlie</Text></div>
        </Stack>
    )
    .add("vertical align center", () =>
        <Stack verticalAlign="center" style={{ height: "200px" }}>
            <div><Text>Alpha</Text></div>
            <div><Text>Bravo</Text></div>
            <div><Text>Charlie</Text></div>
        </Stack>
    )
    .add("gap", () =>
        <Stack gap={10}>
            <div><Text>Alpha</Text></div>
            <div><Text>Bravo</Text></div>
            <div><Text>Charlie</Text></div>
        </Stack>
    );
