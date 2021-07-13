import { Card } from "@react-components/card";
import { Content } from "@react-components/placeholders";
import { Heading } from "@react-components/typography";
import { Inline } from "@react-components/layout";
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
    );
