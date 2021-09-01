import { H1, H2, H3, H4, H5, H6, Heading } from "@react-components/typography";
import { Inline, Stack } from "@react-components/layout";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Heading")
        .segment(segment)
        .build();
}

stories()
    .add("size", () =>
        <>
            <Heading as="div" size="xl">I see Earth!<br /> It is so beautiful!</Heading>
            <Heading as="div" size="lg">I see Earth!<br /> It is so beautiful!</Heading>
            <Heading as="div">I see Earth!<br /> It is so beautiful!</Heading>
            <Heading as="div" size="sm">I see Earth!<br /> It is so beautiful!</Heading>
            <Heading as="div" size="xs">I see Earth!<br /> It is so beautiful!</Heading>
        </>
    )
    .add("as header element", () =>
        <Stack>
            <Inline alignY="end">
                <Heading as="h1">I see Earth!<br /> It is so beautiful!</Heading>
                <Heading as="h2">I see Earth!<br /> It is so beautiful!</Heading>
                <Heading as="h3">I see Earth!<br /> It is so beautiful!</Heading>
            </Inline>
            <Inline alignY="end">
                <Heading as="h4">I see Earth!<br /> It is so beautiful!</Heading>
                <Heading as="h5">I see Earth!<br /> It is so beautiful!</Heading>
                <Heading as="h6">I see Earth!<br /> It is so beautiful!</Heading>
            </Inline>
        </Stack>
    )
    .add("aliases", () =>
        <>
            <H1>I see Earth!<br /> It is so beautiful!</H1>
            <H2>I see Earth!<br /> It is so beautiful!</H2>
            <H3>I see Earth!<br /> It is so beautiful!</H3>
            <H4>I see Earth!<br /> It is so beautiful!</H4>
            <H5>I see Earth!<br /> It is so beautiful!</H5>
            <H6>I see Earth!<br /> It is so beautiful!</H6>
        </>
    );
