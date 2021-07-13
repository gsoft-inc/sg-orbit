import { AppoloBanner, AppoloPoster } from "./assets";
import { Card } from "@react-components/card";
import { Content } from "@react-components/placeholders";
import { Heading } from "@react-components/heading";
import { Image } from "@react-components/image";
import { Inline, Stack } from "@react-components/layout";
import { createTestSuite } from "./createTestSuite";
import { storiesOfBuilder } from "@stories/utils";


function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Card")
        .segment(segment)
        .build();
}

createTestSuite(<Card orientation="horizontal" />, stories("/horizontal"));

createTestSuite(<Card orientation="vertical" />, stories("/vertical"));

stories()
    .add("styling", () =>
        <Inline>
            <Card className="border-red">
                <Heading>Nasa</Heading>
                <Content>The National Aeronautics and Space Administration is an independent agency of the U.S. federal government responsible for the civilian space program, as well as aeronautics and space research.</Content>
            </Card>
            <Card style={{ border: "1px solid red" }}>
                <Heading>Nasa</Heading>
                <Content>The National Aeronautics and Space Administration is an independent agency of the U.S. federal government responsible for the civilian space program, as well as aeronautics and space research.</Content>
            </Card>
        </Inline>
    )
    .add("image", () =>
        <Inline>
            <Stack>
                <Card orientation="horizontal">
                    <Image src={AppoloPoster} alt="Appolo 11 Poster" width="100px" />
                    <Heading>Nasa</Heading>
                    <Content>The National Aeronautics and Space Administration is an independent agency of the U.S. federal government responsible for the civilian space program, as well as aeronautics and space research.</Content>
                </Card>
                <Card orientation="vertical" style={{ "width": "300px" }}>
                    <Image src={AppoloBanner} alt="Appolo 11 Banner" width="100px" />
                    <Heading>Nasa</Heading>
                    <Content>The National Aeronautics and Space Administration is an independent agency of the U.S. federal government responsible for the civilian space program, as well as aeronautics and space research.</Content>
                </Card>
            </Stack>
        </Inline>
    )
    .add("layout", () =>
        <div style={{ "display": "grid", "gap": "var(--o-ui-global-scale-golf)", "grid-template-columns": "1fr 1fr" }}>
            <Card
                fluid
            >
                <Image src={AppoloBanner} alt="Appolo 11 Banner" width="100px" />
                <Heading>Nasa</Heading>
                <Content>The National Aeronautics and Space Administration is an independent agency of the U.S. federal government responsible for the civilian space program, as well as aeronautics and space research.</Content>
            </Card>
            <Card
                orientation="horizontal"
                fluid
            >
                <Heading>Nasa</Heading>
                <Content>The National Aeronautics and Space Administration is an independent agency of the U.S. federal government responsible for the civilian space program, as well as aeronautics and space research.</Content>
            </Card>
        </div>
    );
