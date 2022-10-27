import { Div } from "@components/html";
import { Divider } from "@components/divider";
import { Stack } from "@components/layout";
import { Text } from "@components/typography";

export default {
    title: "Chromatic/Divider",
    component: Divider
};

export const Default = () =>
    <Divider />;

export const Surrounded = () =>
    <Div>
        <Text>Apollo 8 - 1968</Text>
        <Divider />
        <Text>Apollo 11 - 1969</Text>
    </Div>;

export const MultipleSeparators = () =>
    <Div>
        <Text>Apollo 8 - 1968</Text>
        <Divider />
        <Text>Apollo 11 - 1969</Text>
        <Divider />
        <Text>Luna 16 - 1970</Text>
        <Divider />
        <Text>Salyut 1 - 1971</Text>
    </Div>;

export const Labelled = () =>
    <Divider>Since 1978</Divider>;

export const LongLabel = () =>
    <Divider height={16}>Since 1978 there have been more than 10 space exploration missions.</Divider>;

export const LabelledSurrounded = () =>
    <Div>
        <Text>Apollo 11 - 1969</Text>
        <Divider>Since 1978</Divider>
        <Text>Voyager 1 - 1990</Text>
    </Div>;

export const Zoom = () =>
    <Stack>
        <Div className="zoom-in">
            <Divider>Since 1978</Divider>
        </Div>
        <Div className="zoom-out">
            <Divider>Since 1978</Divider>
        </Div>
    </Stack>;

export const Styling = () =>
    <Stack>
        <Divider border="warning-7" />
        <Divider className="border-red" />
        <Divider style={{ border: "1px solid red" }} />
    </Stack>;

Default.storyName = "default";
Surrounded.storyName = "surrounded";
MultipleSeparators.storyName = "multiple separators";
Labelled.storyName = "labelled";
LongLabel.storyName = "long label";
LabelledSurrounded.storyName = "labelled surrounded";
Zoom.storyName = "zoom";
Styling.storyName = "styling";
