import { EditIcon, IconGroup } from "@react-components/icons";
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
        <div className="flex flex-column">
            <Icons size="small" className="mb5" />
            <Icons className="mb5" />
            <Icons size="large" />
        </div>

    )
    .add("custom spacing", () =>
        <Icons spacing="hotel" />
    );

