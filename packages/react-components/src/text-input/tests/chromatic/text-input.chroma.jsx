import { TextInput } from "@react-components/text-input";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Text Input"))
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
            <TextInput className="mr5" />
            <TextInput placeholder="Search..." className="mr5" />
            <TextInput defaultValue="SpaceX will win the race!" />
        </div>
    )
    .add("password", () =>
        <div className="flex">
            <TextInput type="password" className="mr5" />
            <TextInput defaultValue="temp123!" type="password" />
        </div>
    )
    .add("email", () =>
        <div className="flex">
            <TextInput type="email" className="mr5" />
            <TextInput defaultValue="info@spacex.com" type="email" />
        </div>
    );
