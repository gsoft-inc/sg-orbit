import { Div } from "@components/html";
import { Stack } from "@components/layout";
import { Text } from "@components/typography";

export default {
    title: "Chromatic/Text",
    component: Text
};

export const Default = () =>
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
    </Stack>;

export const Inherit = () =>
    <Div fontSize={1}>
        <Text size="inherit">There are no passengers on spaceship earth.</Text>
    </Div>;

export const Styling = () =>
    <Stack>
        <Text border="warning-7">There are no passengers on spaceship earth.</Text>
        <Text className="bg-red">There are no passengers on spaceship earth.</Text>
        <Text style={{ backgroundColor: "red" }}>There are no passengers on spaceship earth.</Text>
    </Stack>;

Default.storyName = "default";
Inherit.storyName = "inherit";
Styling.storyName = "styling";
