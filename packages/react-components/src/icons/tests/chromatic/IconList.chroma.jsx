import { EditIcon, IconList } from "@react-components/icons";
import { Stack } from "@react-components/layout";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/IconList")
        .segment(segment)
        .build();
}

function Icons(props) {
    return (
        <IconList {...props}>
            <EditIcon />
            <EditIcon />
            <EditIcon />
        </IconList>
    );
}

stories()
    .add("default", () =>
        <Icons />
    )
    .add("size", () =>
        <Stack>
            <Icons size="2xs" />
            <Icons size="xs" />
            <Icons size="sm" />
            <Icons />
            <Icons size="lg" />
        </Stack>
    )
    .add("styling", () =>
        <Stack>
            <Icons border="sunray-10" />
            <Icons className="border-red" />
            <Icons style={{ border: "1px solid red" }} />
        </Stack>
    );

