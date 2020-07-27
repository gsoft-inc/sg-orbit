import { CrossIcon, EditIcon } from "@react-components/icons";
import { IconButton } from "@react-components/button";
import { NumberInput } from "@react-components/number-input";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("NumberInput"))
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

stories()
    .add("default", () =>
        <div className="flex">
            <NumberInput className="mr5" />
            <NumberInput placeholder="Amount" />
        </div>
    )
    .add("integer value", () =>
        <NumberInput defaultValue={10} />
    )
    .add("decimal value", () =>
        <NumberInput defaultValue={10.999} />
    )
    .add("icon", () =>
        <div className="flex">
            <NumberInput
                icon={<EditIcon />}
                className="mr5"
            />
            <NumberInput
                icon={<EditIcon />}
                iconPosition="left"
            />
        </div>
    )
    .add("button", () =>
        <NumberInput
            button={<IconButton><CrossIcon /></IconButton>}
        />
    )
    .add("loading", () =>
        <div className="flex">
            <NumberInput
                loading
                className="mr5"
            />
            <NumberInput
                loading
                icon={<EditIcon />}
                className="mr5"
            />
            <NumberInput
                loading
                icon={<EditIcon />}
                iconPosition="left"
                className="mr5"
            />
        </div>
    );
