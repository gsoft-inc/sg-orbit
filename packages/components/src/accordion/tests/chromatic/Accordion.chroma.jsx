import { Accordion } from "@components/accordion";
import { Content } from "@components/placeholders";
import { H3 } from "@components/typography";
import { Inline } from "@components/layout";
import { Item } from "@components/collection";
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
                <H3>Mars</H3>
                <Content>Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System.</Content>
            </Item>
            {false && <Item>
                <H3>Jupiter</H3>
                <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
            </Item>}
        </Accordion>
    )
    .add("styling", () =>
        <Inline>
            <Accordion border="warning-7" expandedKeys={["0"]}>
                <Item>
                    <H3 border="warning-7">Mars</H3>
                    <Content border="warning-7">Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System.</Content>
                </Item>
            </Accordion>
            <Accordion className="border-red" expandedKeys={["0"]}>
                <Item>
                    <H3 className="border-red">Mars</H3>
                    <Content className="border-red">Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System.</Content>
                </Item>
            </Accordion>
            <Accordion style={{ border: "0.0625rem solid red" }} expandedKeys={["0"]}>
                <Item>
                    <H3 style={{ border: "0.0625rem solid red" }}>Mars</H3>
                    <Content style={{ border: "0.0625rem solid red" }}>Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System.</Content>
                </Item>
            </Accordion>
        </Inline>
    );
