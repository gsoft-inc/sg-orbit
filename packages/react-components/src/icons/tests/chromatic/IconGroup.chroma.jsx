import { EditIcon, IconGroup } from "@react-components/icons";
import { VerticalStack } from "@react-components/stack";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories() {
    return storiesOfBuilder(module, createChromaticSection("IconGroup"))
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .build())
        .build();
}

function Icons(props) {
    return (
        <IconGroup {...props}>
            <EditIcon />
            <EditIcon />
            <EditIcon />
        </IconGroup>
    );
}

stories()
    .add("default", () =>
        <Icons />
    )
    .add("size", () =>
        <VerticalStack>
            <Icons size="small" />
            <Icons />
            <Icons size="large" />
        </VerticalStack>

    );

