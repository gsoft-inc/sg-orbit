import { InfoIcon } from "@react-components/icons";
import { Lozenge } from "@react-components/lozenge";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Lozenge"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .chromaticDelay(100)
            .build())
        .build();
}

stories()
    .add("default", () =>
        <Lozenge>New</Lozenge>
    )
    .add("icon", () =>
        <div className="flex flex-column">
            <div className="flex items-end mb12">
                <Lozenge size="small" leftIcon={<InfoIcon />} className="mr5">New</Lozenge>
                <Lozenge leftIcon={<InfoIcon />} className="mr5">New</Lozenge>
                <Lozenge size="large" leftIcon={<InfoIcon />}>New</Lozenge>
            </div>
            <div className="flex items-end">
                <Lozenge size="small" rightIcon={<InfoIcon />} className="mr5">New</Lozenge>
                <Lozenge rightIcon={<InfoIcon />} className="mr5">New</Lozenge>
                <Lozenge size="large" rightIcon={<InfoIcon />}>New</Lozenge>
            </div>
        </div>
    )
    .add("size", () =>
        <div className="flex items-end">
            <Lozenge size="small" className="mr5">New</Lozenge>
            <Lozenge className="mr5">New</Lozenge>
            <Lozenge size="large">New</Lozenge>
        </div>
    )
    .add("styling", () =>
        <div className="flex">
            <Lozenge
                className="border-red mr5"
            >New</Lozenge>
            <Lozenge
                style={{
                    border: "1px solid red"
                }}
            >New</Lozenge>
        </div>
    )
    .add("as link or button", () =>
        <div className="flex">
            <Lozenge as="a" className="mr5">New</Lozenge>
            <Lozenge as="button">New</Lozenge>
        </div>
    );
