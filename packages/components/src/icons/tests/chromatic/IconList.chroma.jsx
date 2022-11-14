import { EditIcon, IconList } from "@components/icons";
import { Stack } from "@components/layout";

export default {
    title: "Chromatic/IconList",
    component: IconList
};

function Icons(props) {
    return (
        <IconList {...props}>
            <EditIcon />
            <EditIcon />
            <EditIcon />
        </IconList>
    );
}

export const Default = () => (
    <Icons />
);

Default.storyName = "default";

export const Size = () => (
    <Stack>
        <Icons size="2xs" />
        <Icons size="xs" />
        <Icons size="sm" />
        <Icons />
        <Icons size="lg" />
    </Stack>
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
