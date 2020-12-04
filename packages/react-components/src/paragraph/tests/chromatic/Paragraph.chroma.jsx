import { Paragraph } from "@react-components/paragraph";
import { TextLink } from "@react-components/link";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Paragraph")
        .segment(segment)
        .build();
}

stories()
    .add("default", () =>
        <div>
            <Paragraph size="2xl">If two pieces of the same type of metal touch<br />in space they will permanently bond.</Paragraph>
            <Paragraph size="xl">If two pieces of the same type of metal touch<br />in space they will permanently bond.</Paragraph>
            <Paragraph size="lg">If two pieces of the same type of metal touch<br />in space they will permanently bond.</Paragraph>
            <Paragraph>If two pieces of the same type of metal touch<br />in space they will permanently bond.</Paragraph>
            <Paragraph size="sm">If two pieces of the same type of metal touch<br />in space they will permanently bond.</Paragraph>
            <Paragraph size="xs">If two pieces of the same type of metal touch<br />in space they will permanently bond.</Paragraph>
        </div>
    )
    .add("as div", () =>
        <div>
            <Paragraph as="div" size="2xl">If two pieces of the same type of metal touch<br />in space they will permanently bond.</Paragraph>
            <Paragraph as="div" size="xl">If two pieces of the same type of metal touch<br />in space they will permanently bond.</Paragraph>
            <Paragraph as="div" size="lg">If two pieces of the same type of metal touch<br />in space they will permanently bond.</Paragraph>
            <Paragraph as="div">If two pieces of the same type of metal touch<br />in space they will permanently bond.</Paragraph>
            <Paragraph as="div" size="sm">If two pieces of the same type of metal touch<br />in space they will permanently bond.</Paragraph>
            <Paragraph as="div" size="xs">If two pieces of the same type of metal touch<br />in space they will permanently bond.</Paragraph>
        </div>
    )
    .add("with link", () =>
        <div>
            <Paragraph size="2xl">If two pieces of the same type of <TextLink href="#">metal touch</TextLink> in space they <TextLink href="https://www.sharegate.com" external>will permanently</TextLink> bond.</Paragraph>
            <Paragraph size="xl">If two pieces of the same type of <TextLink href="#">metal touch</TextLink> in space they <TextLink href="https://www.sharegate.com" external>will permanently</TextLink> bond.</Paragraph>
            <Paragraph size="lg">If two pieces of the same type of <TextLink href="#">metal touch</TextLink> in space they <TextLink href="https://www.sharegate.com" external>will permanently</TextLink> bond.</Paragraph>
            <Paragraph>If two pieces of the same type of <TextLink href="#">metal touch</TextLink> in space they <TextLink href="https://www.sharegate.com" external>will permanently</TextLink> bond.</Paragraph>
            <Paragraph size="sm">If two pieces of the same type of <TextLink href="#">metal touch</TextLink> in space they <TextLink href="https://www.sharegate.com" external>will permanently</TextLink> bond.</Paragraph>
            <Paragraph size="xs">If two pieces of the same type of <TextLink href="#">metal touch</TextLink> in space they <TextLink href="https://www.sharegate.com" external>will permanently</TextLink> bond.</Paragraph>
        </div>
    )
    .add("styling", () =>
        <div>
            <Paragraph className="bg-red">If two pieces of the same type of metal touch<br />in space they will permanently bond.</Paragraph>
            <Paragraph style={{ backgroundColor: "red" }}>If two pieces of the same type of metal touch<br />in space they will permanently bond.</Paragraph>
        </div>
    );
