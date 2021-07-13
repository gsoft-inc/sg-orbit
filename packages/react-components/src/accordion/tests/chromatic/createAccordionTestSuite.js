import { AccordionHeader, useAccordionContext } from "@react-components/accordion";
import { Box } from "@react-components/box";
import { Content, Header } from "@react-components/placeholders";
import { Counter } from "@react-components/counter";
import { InfoIcon } from "@react-components/icons";
import { Item } from "@react-components/collection";
import { Stack } from "@react-components/layout";
import { Text } from "@react-components/typography";
import { augmentElement } from "@react-components/shared";
import { cloneElement } from "react";

function Accordion({ element, ...rest }) {
    return cloneElement(element, rest);
}

export function createAccordionTestSuite(element, stories) {
    return stories
        .add("default", () =>
            <Accordion element={element}>
                <Item>
                    <Header as="h3">Mars</Header>
                    <Content>
                    Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System (in adherence with the IAU's controversial 2006 definition of planet),
                    being larger than only Mercury. In English, Mars carries the name of the Roman god of war and is often referred to as the "Red Planet".[17][18] The latter refers
                    to the effect of the iron oxide prevalent on Mars's surface, which gives it a reddish appearance distinctive among the astronomical bodies visible to the naked eye.
                    [19] Mars is a terrestrial planet with a thin atmosphere, with surface features reminiscent of the impact craters of the Moon and the valleys, deserts and polar ice caps of Earth.
                    </Content>
                </Item>
                <Item>
                    <Header as="h3">Jupiter</Header>
                    <Content>
                    Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass one-thousandth that of the Sun, but two-and-a-half
                    times that of all the other planets in the Solar System combined. Jupiter is one of the brightest objects visible to the naked eye in the night sky, and has
                    been known to ancient civilizations since before recorded history. It is named after the Roman god Jupiter.[19] When viewed from Earth, Jupiter can be
                    bright enough for its reflected light to cast visible shadows,[20] and is on average the third-brightest natural object in the night sky after the Moon and Venus.
                    Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass one-thousandth that of the Sun, but two-and-a-half
                    times that of all the other planets in the Solar System combined. Jupiter is one of the brightest objects visible to the naked eye in the night sky, and has
                    been known to ancient civilizations since before recorded history. It is named after the Roman god Jupiter.[19] When viewed from Earth, Jupiter can be
                    bright enough for its reflected light to cast visible shadows,[20] and is on average the third-brightest natural object in the night sky after the Moon and Venus.
                    Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass one-thousandth that of the Sun, but two-and-a-half
                    times that of all the other planets in the Solar System combined. Jupiter is one of the brightest objects visible to the naked eye in the night sky, and has
                    been known to ancient civilizations since before recorded history. It is named after the Roman god Jupiter.[19] When viewed from Earth, Jupiter can be
                    bright enough for its reflected light to cast visible shadows,[20] and is on average the third-brightest natural object in the night sky after the Moon and Venus.
                    Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass one-thousandth that of the Sun, but two-and-a-half
                    times that of all the other planets in the Solar System combined. Jupiter is one of the brightest objects visible to the naked eye in the night sky, and has
                    been known to ancient civilizations since before recorded history. It is named after the Roman god Jupiter.[19] When viewed from Earth, Jupiter can be
                    bright enough for its reflected light to cast visible shadows,[20] and is on average the third-brightest natural object in the night sky after the Moon and Venus.
                    </Content>
                </Item>
                <Item>
                    <Header as="h3">Venus</Header>
                    <Content>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
                </Item>
            </Accordion>
        )
        .add("icon", () =>
            <Accordion element={element}>
                <Item>
                    <Header as="h3">
                        <InfoIcon />
                        <Text>Mars</Text>
                    </Header>
                    <Content>Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System.</Content>
                </Item>
                <Item>
                    <Header as="h3">
                        <InfoIcon />
                        <Text>Jupiter</Text>
                    </Header>
                    <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
                </Item>
                <Item>
                    <Header as="h3">
                        <InfoIcon />
                        <Text>Venus</Text>
                    </Header>
                    <Content>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
                </Item>
            </Accordion>
        )
        .add("counter", () =>
            <Accordion element={element}>
                <Item>
                    <Header as="h3">
                        <Text>Mars</Text>
                        <Counter>8</Counter>
                    </Header>
                    <Content>Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System.</Content>
                </Item>
                <Item>
                    <Header as="h3">
                        <Text>Jupiter</Text>
                        <Counter>9</Counter>
                    </Header>
                    <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
                </Item>
                <Item>
                    <Header as="h3">
                        <Text>Venus</Text>
                        <Counter>10</Counter>
                    </Header>
                    <Content>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
                </Item>
            </Accordion>
        )
        .add("expanded keys with manual keys", () =>
            <Stack>
                <Accordion element={element} defaultExpandedKeys={["jupiter"]}>
                    <Item key="mars">
                        <Header as="h3">Mars</Header>
                        <Content>Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System.</Content>
                    </Item>
                    <Item key="jupiter">
                        <Header as="h3">Jupiter</Header>
                        <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
                    </Item>
                    <Item key="venus">
                        <Header as="h3">Venus</Header>
                        <Content>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
                    </Item>
                </Accordion>
                <Accordion element={element} expansionMode="multiple" expandedKeys={["mars", "venus"]}>
                    <Item key="mars">
                        <Header as="h3">Mars</Header>
                        <Content>Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System.</Content>
                    </Item>
                    <Item key="jupiter">
                        <Header as="h3">Jupiter</Header>
                        <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
                    </Item>
                    <Item key="venus">
                        <Header as="h3">Venus</Header>
                        <Content>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
                    </Item>
                </Accordion>
            </Stack>
        )
        .add("expanded keys with generated keys", () =>
            <Stack>
                <Accordion element={element} defaultExpandedKeys={["1"]}>
                    <Item>
                        <Header as="h3">Mars</Header>
                        <Content>Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System.</Content>
                    </Item>
                    <Item>
                        <Header as="h3">Jupiter</Header>
                        <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
                    </Item>
                    <Item>
                        <Header as="h3">Venus</Header>
                        <Content>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
                    </Item>
                </Accordion>
                <Accordion element={element} expansionMode="multiple" expandedKeys={["0", "2"]}>
                    <Item>
                        <Header as="h3">Mars</Header>
                        <Content>Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System.</Content>
                    </Item>
                    <Item>
                        <Header as="h3">Jupiter</Header>
                        <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
                    </Item>
                    <Item>
                        <Header as="h3">Venus</Header>
                        <Content>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
                    </Item>
                </Accordion>
            </Stack>
        )
        .add("narrow container", () =>
            <div style={{ width: "200px" }}>
                <Accordion element={element}>
                    <Item>
                        <Header as="h3">Mars</Header>
                        <Content>Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System.</Content>
                    </Item>
                    <Item>
                        <Header as="h3">Jupiter</Header>
                        <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
                    </Item>
                    <Item>
                        <Header as="h3">Venus</Header>
                        <Content>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
                    </Item>
                </Accordion>
            </div>
        )
        .add("states", () =>
            <Accordion element={element}>
                <Item active>
                    <Header as="h3">Uranus</Header>
                    <Content>Uranus is the seventh planet from the Sun.</Content>
                </Item>
                <Item focus>
                    <Header as="h3">Mars</Header>
                    <Content>Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System.</Content>
                </Item>
                <Item hover>
                    <Header as="h3">Jupiter</Header>
                    <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
                </Item>
                <Item focus hover>
                    <Header as="h3">Venus</Header>
                    <Content>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
                </Item>
                <Item disabled>
                    <Header as="h3">Saturn</Header>
                    <Content>Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter.</Content>
                </Item>
            </Accordion>
        )
        .add("dynamic items", () =>
            <Stack>
                <Accordion element={element}>
                    {["1", "2", "3"].map(x => (
                        <Item key={x}>
                            <Header as="h3">{`Header ${x}`}</Header>
                            <Content>{`Content ${x}`}</Content>
                        </Item>
                    ))}
                </Accordion>
            </Stack>
        )
        .add("custom component", () => {
            const ActiveHeader = ({ header, children, ...rest }) => {
                const { expandedKeys } = useAccordionContext();
                const { key } = header;

                return (
                    <AccordionHeader
                        {...rest}
                        header={header}
                        style={{ backgroundColor: expandedKeys.includes(key) ? "blue" : "red" }}
                    >
                        {children}
                    </AccordionHeader>
                );
            };

            return (
                <Accordion element={element} defaultExpandedKeys={["1"]}>
                    <Item>
                        <ActiveHeader as="h3">Mars</ActiveHeader>
                        <Content>Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System.</Content>
                    </Item>
                    <Item>
                        <ActiveHeader as="h3">Jupiter</ActiveHeader>
                        <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
                    </Item>
                    <Item>
                        <Header as="h3">Venus</Header>
                        <Content>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
                    </Item>
                </Accordion>
            );
        })
        .add("custom as", () => {
            const ActiveHeader = ({ children, ...rest }) => {
                return (
                    <Box
                        {...rest}
                        as="h3"
                    >
                        {augmentElement(children, {
                            style: { backgroundColor: "red" }
                        })}
                    </Box>
                );
            };

            return (
                <Accordion element={element} defaultExpandedKeys={["1"]}>
                    <Item>
                        <Header as={ActiveHeader}>Mars</Header>
                        <Content>Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System.</Content>
                    </Item>
                    <Item>
                        <Header as={ActiveHeader}>Jupiter</Header>
                        <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
                    </Item>
                    <Item>
                        <Header as="h3">Venus</Header>
                        <Content>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
                    </Item>
                </Accordion>
            );
        });
}
