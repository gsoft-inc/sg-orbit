import { PencilMajorIcon, IconList } from "@components/icons";
import { Stack } from "@components/layout";

export default {
    title: "Chromatic/IconList",
    component: IconList
};

function Icons(props) {
    return (
        <IconList {...props}>
            <PencilMajorIcon />
            <PencilMajorIcon />
            <PencilMajorIcon />
        </IconList>
    );
}

export const Default = () => (
    <Icons />
);

Default.storyName = "default";

export const Size = () => (
    <Icons />
);

Size.storyName = "size";

export const Styling = () => (
    <Stack>
        <Icons border="warning-7" />
        <Icons className="border-red" />
        <Icons style={{ border: "1px solid red" }} />
    </Stack>
);

Styling.storyName = "styling";
