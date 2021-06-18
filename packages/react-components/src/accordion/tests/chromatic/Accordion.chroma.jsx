import { Accordion } from "@react-components/accordion";
import { Content, Header } from "@react-components/placeholders";
import { Inline, Stack } from "@react-components/layout";
import { Item } from "@react-components/collection";
import { createAccordionTestSuite } from "./createAccordionTestSuite";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Accordion")
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .build())
        .build();
}

createAccordionTestSuite(<Accordion variant="borderless" />, stories("/borderless"));

createAccordionTestSuite(<Accordion variant="bordered" />, stories("/bordered"));

stories()
    .add("conditional rendering", () =>
        <Accordion>
            <Item>
                <Header as="h3">Mars</Header>
                <Content>Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System.</Content>
            </Item>
            {false && <Item>
                <Header as="h3">Jupiter</Header>
                <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
            </Item>}
        </Accordion>
    )
    .add("styling", () =>
        <Stack>
            <Inline>
                <Accordion className="border-red">
                    <Item>
                        <Header as="h3">Mars</Header>
                        <Content>Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System.</Content>
                    </Item>
                </Accordion>
                <Accordion style={{ border: "1px solid red" }}>
                    <Item>
                        <Header as="h3">Mars</Header>
                        <Content>Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System.</Content>
                    </Item>
                </Accordion>
            </Inline>
            <Inline>
                <Accordion>
                    <Item>
                        <Header className="border-red" as="h3">Mars</Header>
                        <Content>Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System.</Content>
                    </Item>
                </Accordion>
                <Accordion>
                    <Item>
                        <Header style={{ border: "1px solid red" }} as="h3">Mars</Header>
                        <Content>Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System.</Content>
                    </Item>
                </Accordion>
            </Inline>
            <Inline>
                <Accordion expandedKeys={["0"]}>
                    <Item>
                        <Header as="h3">Mars</Header>
                        <Content className="border-red">Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System.</Content>
                    </Item>
                </Accordion>
                <Accordion expandedKeys={["0"]}>
                    <Item>
                        <Header as="h3">Mars</Header>
                        <Content style={{ border: "1px solid red" }}>Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System.</Content>
                    </Item>
                </Accordion>
            </Inline>
        </Stack>
    );
