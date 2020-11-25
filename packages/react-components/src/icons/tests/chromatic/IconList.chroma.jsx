import { EditIcon, IconList } from "@react-components/icons";
import { Stack } from "@react-components/layout";
import { createChromaticSection, storiesOfBuilder } from "@stories/utils";

function stories() {
    return storiesOfBuilder(module, createChromaticSection("IconList"))
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

    );

