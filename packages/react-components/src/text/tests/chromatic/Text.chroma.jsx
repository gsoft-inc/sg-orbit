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
            <Text size="5xl">Migrate, adapt, and control the cloud.</Text>
            <Text size="4xl">Migrate, adapt, and control the cloud.</Text>
            <Text size="3xl">Migrate, adapt, and control the cloud.</Text>
            <Text size="2xl">Migrate, adapt, and control the cloud.</Text>
            <Text size="xl">Migrate, adapt, and control the cloud.</Text>
            <Text size="lg">Migrate, adapt, and control the cloud.</Text>
            <Text>Migrate, adapt, and control the cloud.</Text>
            <Text size="sm">Migrate, adapt, and control the cloud.</Text>
            <Text size="xs">Migrate, adapt, and control the cloud.</Text>
        </Stack>
    )
    .add("inherit", () =>
        <div className="f1">
            <Text size="inherit">Migrate, adapt, and control the cloud.</Text>
        </div>
    )
    .add("styling", () =>
        <Stack>
            <Text className="bg-red">Migrate, adapt, and control the cloud.</Text>
            <Text style={{ backgroundColor: "red" }}>Migrate, adapt, and control the cloud.</Text>
        </Stack>
    );
