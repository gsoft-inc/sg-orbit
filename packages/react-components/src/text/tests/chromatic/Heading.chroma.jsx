import { Heading } from "@react-components/text";
import { Inline } from "@react-components/layout";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Heading"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

stories()
    .add("size", () =>
        <div>
            <Heading as="div" size="xl">Migrate, adapt, and<br />control the cloud.</Heading>
            <Heading as="div" size="lg">Migrate, adapt, and<br />control the cloud.</Heading>
            <Heading as="div">Migrate, adapt, and<br />control the cloud.</Heading>
            <Heading as="div" size="sm">Migrate, adapt, and<br />control the cloud.</Heading>
            <Heading as="div" size="xs">Migrate, adapt, and<br />control the cloud.</Heading>
        </div>
    )
    .add("as header element", () =>
        <div>
            <Inline align="end">
                <Heading as="h1">Migrate, adapt, and<br />control the cloud.</Heading>
                <Heading as="h2">Migrate, adapt, and<br />control the cloud.</Heading>
                <Heading as="h3">Migrate, adapt, and<br />control the cloud.</Heading>
            </Inline>
            <Inline align="end">
                <Heading as="h4">Migrate, adapt, and<br />control the cloud.</Heading>
                <Heading as="h5">Migrate, adapt, and<br />control the cloud.</Heading>
                <Heading as="h6">Migrate, adapt, and<br />control the cloud.</Heading>
            </Inline>
        </div>
    );
