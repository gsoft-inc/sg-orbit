import { Stack } from "@react-components/layout";
import { Text } from "@react-components/text";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Text")
        .segment(segment)
        .build();
}

stories()
    .add("default", () =>
        <Stack gap="0">
            <Text size="5xl">There are no passengers on spaceship earth.</Text>
            <Text size="4xl">There are no passengers on spaceship earth.</Text>
            <Text size="3xl">There are no passengers on spaceship earth.</Text>
            <Text size="2xl">There are no passengers on spaceship earth.</Text>
            <Text size="xl">There are no passengers on spaceship earth.</Text>
            <Text size="lg">There are no passengers on spaceship earth.</Text>
            <Text>There are no passengers on spaceship earth.</Text>
            <Text size="sm">There are no passengers on spaceship earth.</Text>
            <Text size="xs">There are no passengers on spaceship earth.</Text>
        </Stack>
    )
    .add("inherit", () =>
        <div className="f1">
            <Text size="inherit">There are no passengers on spaceship earth.</Text>
        </div>
    )
    .add("styling", () =>
        <Stack>
            <Text className="bg-red">There are no passengers on spaceship earth.</Text>
            <Text style={{ backgroundColor: "red" }}>There are no passengers on spaceship earth.</Text>
        </Stack>
    );
