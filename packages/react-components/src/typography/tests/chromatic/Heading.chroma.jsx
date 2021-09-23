import { H1, H2, H3, H4, H5, H6, Heading } from "@react-components/typography";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Heading")
        .segment(segment)
        .build();
}

stories()
    .add("size", () =>
        <>
            <Heading size="xl">I see Earth!<br /> It is so beautiful!</Heading>
            <Heading size="lg">I see Earth!<br /> It is so beautiful!</Heading>
            <Heading>I see Earth!<br /> It is so beautiful!</Heading>
            <Heading size="sm">I see Earth!<br /> It is so beautiful!</Heading>
            <Heading size="xs">I see Earth!<br /> It is so beautiful!</Heading>
        </>
    )
    .add("styling", () =>
        <>
            <Heading border="sunray-10">I see Earth!<br /> It is so beautiful!</Heading>
            <Heading className="border-red">I see Earth!<br /> It is so beautiful!</Heading>
            <Heading style={{ border: "1px solid red" }}>I see Earth!<br /> It is so beautiful!</Heading>
        </>
    );

[
    { name: "h1", elementType: H1 },
    { name: "h2", elementType: H2 },
    { name: "h3", elementType: H3 },
    { name: "h4", elementType: H4 },
    { name: "h5", elementType: H5 },
    { name: "h6", elementType: H6 }
].forEach(({ name, elementType: ElementType }) => {
    stories()
        .add(name, () =>
            <>
                <ElementType size="xl">I see Earth!<br /> It is so beautiful!</ElementType>
                <ElementType size="lg">I see Earth!<br /> It is so beautiful!</ElementType>
                <ElementType>I see Earth!<br /> It is so beautiful!</ElementType>
                <ElementType size="sm">I see Earth!<br /> It is so beautiful!</ElementType>
                <ElementType size="xs">I see Earth!<br /> It is so beautiful!</ElementType>
            </>
        );
});
