import { H1, H2, H3, H4, H5, H6, Heading } from "@components/typography";

export default {
    title: "Chromatic/Heading",
    component: Heading
};

export const Size = () =>
    <>
        <Heading size="xl">I see Earth!<br /> It is so beautiful!</Heading>
        <Heading size="lg">I see Earth!<br /> It is so beautiful!</Heading>
        <Heading>I see Earth!<br /> It is so beautiful!</Heading>
        <Heading size="sm">I see Earth!<br /> It is so beautiful!</Heading>
        <Heading size="xs">I see Earth!<br /> It is so beautiful!</Heading>
    </>;

export const Styling = () =>
    <>
        <Heading border="warning-7">I see Earth!<br /> It is so beautiful!</Heading>
        <Heading className="border-red">I see Earth!<br /> It is so beautiful!</Heading>
        <Heading style={{ border: "1px solid red" }}>I see Earth!<br /> It is so beautiful!</Heading>
    </>;

export const HeadingH1 = () =>
    <>
        <H1 size="xl">I see Earth!<br /> It is so beautiful!</H1>
        <H1 size="lg">I see Earth!<br /> It is so beautiful!</H1>
        <H1>I see Earth!<br /> It is so beautiful!</H1>
        <H1 size="sm">I see Earth!<br /> It is so beautiful!</H1>
        <H1 size="xs">I see Earth!<br /> It is so beautiful!</H1>
    </>;

export const HeadingH2 = () =>
    <>
        <H2 size="xl">I see Earth!<br /> It is so beautiful!</H2>
        <H2 size="lg">I see Earth!<br /> It is so beautiful!</H2>
        <H2>I see Earth!<br /> It is so beautiful!</H2>
        <H2 size="sm">I see Earth!<br /> It is so beautiful!</H2>
        <H2 size="xs">I see Earth!<br /> It is so beautiful!</H2>
    </>;

export const HeadingH3 = () =>
    <>
        <H3 size="xl">I see Earth!<br /> It is so beautiful!</H3>
        <H3 size="lg">I see Earth!<br /> It is so beautiful!</H3>
        <H3>I see Earth!<br /> It is so beautiful!</H3>
        <H3 size="sm">I see Earth!<br /> It is so beautiful!</H3>
        <H3 size="xs">I see Earth!<br /> It is so beautiful!</H3>
    </>;

export const HeadingH4 = () =>
    <>
        <H4 size="xl">I see Earth!<br /> It is so beautiful!</H4>
        <H4 size="lg">I see Earth!<br /> It is so beautiful!</H4>
        <H4>I see Earth!<br /> It is so beautiful!</H4>
        <H4 size="sm">I see Earth!<br /> It is so beautiful!</H4>
        <H4 size="xs">I see Earth!<br /> It is so beautiful!</H4>
    </>;

export const HeadingH5 = () =>
    <>
        <H5 size="xl">I see Earth!<br /> It is so beautiful!</H5>
        <H5 size="lg">I see Earth!<br /> It is so beautiful!</H5>
        <H5>I see Earth!<br /> It is so beautiful!</H5>
        <H5 size="sm">I see Earth!<br /> It is so beautiful!</H5>
        <H5 size="xs">I see Earth!<br /> It is so beautiful!</H5>
    </>;

export const HeadingH6 = () =>
    <>
        <H6 size="xl">I see Earth!<br /> It is so beautiful!</H6>
        <H6 size="lg">I see Earth!<br /> It is so beautiful!</H6>
        <H6>I see Earth!<br /> It is so beautiful!</H6>
        <H6 size="sm">I see Earth!<br /> It is so beautiful!</H6>
        <H6 size="xs">I see Earth!<br /> It is so beautiful!</H6>
    </>;

Size.storyName = "size";
Styling.storyName = "styling";
HeadingH1.storyName = "h1";
HeadingH2.storyName = "h2";
HeadingH3.storyName = "h3";
HeadingH4.storyName = "h4";
HeadingH5.storyName = "h5";
HeadingH6.storyName = "h6";
