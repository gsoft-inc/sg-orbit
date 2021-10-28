import { ApolloBanner, ApolloPoster } from "./assets";
import { Box } from "@components/box";
import { Card } from "@components/card";
import { Content } from "@components/placeholders";
import { Div } from "@components/html";
import { Flex, Inline, Stack } from "@components/layout";
import { Heading } from "@components/typography";
import { Image } from "@components/image";
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
    .add("zoom", () =>
        <Inline>
            <Div className="zoom-in">
                <Card>
                    <Heading>Nasa</Heading>
                    <Content>The National Aeronautics and Space Administration</Content>
                </Card>
            </Div>
            <Div className="zoom-out'">
                <Card>
                    <Heading>Nasa</Heading>
                    <Content>The National Aeronautics and Space Administration</Content>
                </Card>
            </Div>
        </Inline>
    )
    .add("styling", () =>
        <Inline>
            <Card border="warning-7">
                <Heading>Nasa</Heading>
                <Content>The National Aeronautics and Space Administration</Content>
            </Card>
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
    .add("horizontal & image", () =>
        <Stack>
            <Card orientation="horizontal">
                <Image src={ApolloPoster} alt="Appolo 11" />
                <Heading>Nasa</Heading>
                <Content>The National Aeronautics and Space Administration</Content>
            </Card>
            <Card fluid orientation="horizontal">
                <Image src={ApolloPoster} alt="Appolo 11" width="200px" />
                <Heading>Nasa</Heading>
                <Content>The National Aeronautics and Space Administration</Content>
            </Card>
        </Stack>
    )
    .add("vertical & image", () =>
        <Stack>
            <Card orientation="vertical">
                <Image src={ApolloBanner} alt="Appolo 11" />
                <Heading>Nasa</Heading>
                <Content>The National Aeronautics and Space Administration</Content>
            </Card>
            <Card fluid orientation="vertical">
                <Image src={ApolloBanner} alt="Appolo 11" fit="cover" height="200px" />
                <Heading>Nasa</Heading>
                <Content>The National Aeronautics and Space Administration</Content>
            </Card>
        </Stack>
    )
    .add("grid layout", () =>
        <Stack>
            <Box style={{ "display": "grid", "gap": "var(--o-ui-sp-7)", "gridTemplateColumns": "1fr 1fr" }}>
                <Card>
                    <Image src={ApolloBanner} alt="Appolo 11 Banner" />
                    <Heading>Nasa</Heading>
                    <Content>The National Aeronautics and Space Administration</Content>
                </Card>
                <Card orientation="horizontal">
                    <Heading>Nasa</Heading>
                    <Content>The National Aeronautics and Space Administration</Content>
                </Card>
            </Box>
            <Box style={{ "display": "grid", "gap": "var(--o-ui-sp-7)", "gridTemplateColumns": "1fr 1fr" }}>
                <Card fluid>
                    <Image src={ApolloBanner} alt="Appolo 11 Banner" />
                    <Heading>Nasa</Heading>
                    <Content>The National Aeronautics and Space Administration</Content>
                </Card>
                <Card fluid orientation="horizontal">
                    <Heading>Nasa</Heading>
                    <Content>The National Aeronautics and Space Administration</Content>
                </Card>
            </Box>
        </Stack>
    )
    .add("flex layout", () =>
        <Stack>
            <Flex gap="4">
                <Card>
                    <Image src={ApolloBanner} alt="Appolo 11 Banner" />
                    <Heading>Nasa</Heading>
                    <Content>The National Aeronautics and Space Administration</Content>
                </Card>
                <Card orientation="horizontal">
                    <Heading>Nasa</Heading>
                    <Content>The National Aeronautics and Space Administration</Content>
                </Card>
                <Card orientation="horizontal">
                    <Image src={ApolloBanner} alt="Appolo 11 Banner" />
                    <Heading>Nasa</Heading>
                    <Content>The National Aeronautics and Space Administration</Content>
                </Card>
            </Flex>
            <Flex gap="4">
                <Card fluid>
                    <Image src={ApolloBanner} alt="Appolo 11 Banner" />
                    <Heading>Nasa</Heading>
                    <Content>The National Aeronautics and Space Administration</Content>
                </Card>
                <Card fluid orientation="horizontal">
                    <Heading>Nasa</Heading>
                    <Content>The National Aeronautics and Space Administration</Content>
                </Card>
                <Card fluid orientation="horizontal">
                    <Image src={ApolloBanner} alt="Appolo 11 Banner" />
                    <Heading>Nasa</Heading>
                    <Content>The National Aeronautics and Space Administration</Content>
                </Card>
            </Flex>
        </Stack>
    );
