import { BodyText } from "@react-components/text";
import { Stack } from "@react-components/layout";
import { TextLink } from "@react-components/link";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("BodyText"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

stories()
    .add("default", () =>
        <Stack>
            <BodyText size="2xl">If two pieces of the same type of metal touch<br />in space they will permanently bond.</BodyText>
            <BodyText size="xl">If two pieces of the same type of metal touch<br />in space they will permanently bond.</BodyText>
            <BodyText size="lg">If two pieces of the same type of metal touch<br />in space they will permanently bond.</BodyText>
            <BodyText>If two pieces of the same type of metal touch<br />in space they will permanently bond.</BodyText>
            <BodyText size="sm">If two pieces of the same type of metal touch<br />in space they will permanently bond.</BodyText>
            <BodyText size="xs">If two pieces of the same type of metal touch<br />in space they will permanently bond.</BodyText>
        </Stack>
    )
    .add("with link", () =>
        <Stack>
            <BodyText size="2xl">If two pieces of the same type of <TextLink href="#">metal touch</TextLink> in space they <TextLink href="https://www.sharegate.com" external>will permanently</TextLink> bond.</BodyText>
            <BodyText size="xl">If two pieces of the same type of <TextLink href="#">metal touch</TextLink> in space they <TextLink href="https://www.sharegate.com" external>will permanently</TextLink> bond.</BodyText>
            <BodyText size="lg">If two pieces of the same type of <TextLink href="#">metal touch</TextLink> in space they <TextLink href="https://www.sharegate.com" external>will permanently</TextLink> bond.</BodyText>
            <BodyText>If two pieces of the same type of <TextLink href="#">metal touch</TextLink> in space they <TextLink href="https://www.sharegate.com" external>will permanently</TextLink> bond.</BodyText>
            <BodyText size="sm">If two pieces of the same type of <TextLink href="#">metal touch</TextLink> in space they <TextLink href="https://www.sharegate.com" external>will permanently</TextLink> bond.</BodyText>
            <BodyText size="xs">If two pieces of the same type of <TextLink href="#">metal touch</TextLink> in space they <TextLink href="https://www.sharegate.com" external>will permanently</TextLink> bond.</BodyText>
        </Stack>
    )
    .add("styling", () =>
        <Stack>
            <BodyText className="bg-red">If two pieces of the same type of metal touch<br />in space they will permanently bond.</BodyText>
            <BodyText style={{ backgroundColor: "red" }}>If two pieces of the same type of metal touch<br />in space they will permanently bond.</BodyText>
        </Stack>
    );
