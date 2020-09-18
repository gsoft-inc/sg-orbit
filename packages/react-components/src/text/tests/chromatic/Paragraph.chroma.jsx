import { Paragraph } from "@react-components/text";
import { Stack } from "@react-components/layout";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Paragraph"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

stories()
    .add("default", () =>
        <Stack>
            <Paragraph size="xl">If two pieces of the same type of metal touch<br />in space they will permanently bond.</Paragraph>
            <Paragraph size="lg">If two pieces of the same type of metal touch<br />in space they will permanently bond.</Paragraph>
            <Paragraph>If two pieces of the same type of metal touch<br />in space they will permanently bond.</Paragraph>
            <Paragraph size="sm">If two pieces of the same type of metal touch<br />in space they will permanently bond.</Paragraph>
            <Paragraph size="xs">If two pieces of the same type of metal touch<br />in space they will permanently bond.</Paragraph>
            <Paragraph size="2xs">If two pieces of the same type of metal touch<br />in space they will permanently bond.</Paragraph>
        </Stack>
    )
    .add("as div", () =>
        <Stack>
            <Paragraph as="div" size="xl">If two pieces of the same type of metal touch<br />in space they will permanently bond.</Paragraph>
            <Paragraph as="div" size="lg">If two pieces of the same type of metal touch<br />in space they will permanently bond.</Paragraph>
            <Paragraph as="div">If two pieces of the same type of metal touch<br />in space they will permanently bond.</Paragraph>
            <Paragraph as="div" size="sm">If two pieces of the same type of metal touch<br />in space they will permanently bond.</Paragraph>
            <Paragraph as="div" size="xs">If two pieces of the same type of metal touch<br />in space they will permanently bond.</Paragraph>
            <Paragraph as="div" size="2xs">If two pieces of the same type of metal touch<br />in space they will permanently bond.</Paragraph>
        </Stack>
    )
    .add("styling", () =>
        <Stack>
            <Paragraph className="bg-red">If two pieces of the same type of metal touch<br />in space they will permanently bond.</Paragraph>
            <Paragraph style={{ backgroundColor: "red" }}>If two pieces of the same type of metal touch<br />in space they will permanently bond.</Paragraph>
        </Stack>
    );
