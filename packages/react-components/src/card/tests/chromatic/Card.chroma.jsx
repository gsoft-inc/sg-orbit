import { AppoloBanner, AppoloPoster, Nasa } from "./assets";
import { Box } from "@react-components/box";
import { Card } from "@react-components/card";
import { Content } from "@react-components/placeholders";
import { Heading } from "@react-components/typography";
import { Image } from "@react-components/image";
import { Inline, Stack } from "@react-components/layout";
import { createTestSuite } from "./createTestSuite";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Card")
        .segment(segment)
        .build();
}

createTestSuite(<Card orientation="horizontal" style={{ "width": "500px" }} />, stories("/horizontal"));

createTestSuite(<Card orientation="vertical" style={{ "width": "300px" }} />, stories("/vertical"));

stories()
    .add("styling", () =>
        <Inline>
            <Card className="border-red">
                <Heading>Nasa</Heading>
                <Content>The National Aeronautics and Space Administration</Content>
            </Card>
            <Card style={{ border: "1px solid red" }}>
                <Heading>Nasa</Heading>
                <Content>The National Aeronautics and Space Administration</Content>
            </Card>
        </Inline>
    )
    .add("hero image", () =>
        <Inline>
            <Stack>
                <Card orientation="horizontal">
                    <Image src={AppoloPoster} alt="Appolo 11 Poster" width="100px" />
                    <Heading>Nasa</Heading>
                    <Content>The National Aeronautics and Space Administration</Content>
                </Card>
                <Card orientation="vertical" style={{ "width": "300px" }}>
                    <Image src={AppoloBanner} alt="Appolo 11 Banner" width="100px" />
                    <Heading>Nasa</Heading>
                    <Content>The National Aeronautics and Space Administration</Content>
                </Card>
            </Stack>
        </Inline>
    )
    .add("grid layout", () =>
        <Box style={{ "display": "grid", "gap": "var(--o-ui-global-scale-golf)", "gridTemplateColumns": "1fr 1fr" }}>
            <Card>
                <Image src={AppoloBanner} alt="Appolo 11 Banner" width="100px" />
                <Heading>Nasa</Heading>
                <Content>The National Aeronautics and Space Administration</Content>
            </Card>
            <Card orientation="horizontal">
                <Heading>Nasa</Heading>
                <Content>The National Aeronautics and Space Administration</Content>
            </Card>
        </Box>
    )
    .add("flex layout", () =>
        <Box style={{ "display": "flex", gap: "24px" }}>
            <Card style={{ width: "275px" }}>
                <Image src={AppoloBanner} alt="Appolo 11 Banner" width="100px" />
                <Heading>Nasa</Heading>
                <Content>The National Aeronautics and Space Administration</Content>
            </Card>
            <Card style={{ width: "500px" }} orientation="horizontal">
                <Heading>Nasa</Heading>
                <Content>The National Aeronautics and Space Administration</Content>
            </Card>
        </Box>
    )
    .add("min width", () =>
        <Box style={{ "display": "flex" }}>
            <Card style={{ "width": "auto" }}>
                <Heading>Nasa</Heading>
                <Content>
                    Pizza Planet
                </Content>
            </Card>
        </Box>
    );
