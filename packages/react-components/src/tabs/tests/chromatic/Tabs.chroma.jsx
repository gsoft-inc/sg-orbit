import { Box } from "@react-components/box";
import { CheckCircleIcon, CrossIcon, NotificationIcon } from "@react-components/icons";
import { Content, Header } from "@react-components/placeholders";
import { Inline, Stack } from "@react-components/layout";
import { Item } from "@react-components/collection";
import { Lozenge } from "@react-components/lozenge";
import { Tab, TabPanel, Tabs, useTabsContext } from "@react-components/tabs";
import { Text } from "@react-components/typography";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Tabs")
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .build())
        .build();
}

stories()
    .add("default", () =>
        <Tabs aria-label="Planets">
            <Item>
                <Header>Mars</Header>
                <Content>
                    Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System (in adherence with the IAU's controversial 2006 definition of planet),
                    being larger than only Mercury. In English, Mars carries the name of the Roman god of war and is often referred to as the "Red Planet".[17][18] The latter refers
                    to the effect of the iron oxide prevalent on Mars's surface, which gives it a reddish appearance distinctive among the astronomical bodies visible to the naked eye.
                    [19] Mars is a terrestrial planet with a thin atmosphere, with surface features reminiscent of the impact craters of the Moon and the valleys, deserts and polar ice caps of Earth.
                </Content>
            </Item>
            <Item>
                <Header>Jupiter</Header>
                <Content>
                    Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass one-thousandth that of the Sun, but two-and-a-half
                    times that of all the other planets in the Solar System combined. Jupiter is one of the brightest objects visible to the naked eye in the night sky, and has
                    been known to ancient civilizations since before recorded history. It is named after the Roman god Jupiter.[19] When viewed from Earth, Jupiter can be
                    bright enough for its reflected light to cast visible shadows,[20] and is on average the third-brightest natural object in the night sky after the Moon and Venus.
                </Content>
            </Item>
            <Item>
                <Header>Venus</Header>
                <Content>
                    Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.
                </Content>
            </Item>
        </Tabs>
    )
    .add("fluid", () =>
        <Tabs fluid aria-label="Planets">
            <Item>
                <Header>Mars</Header>
                <Content>
                    Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System (in adherence with the IAU's controversial 2006 definition of planet),
                    being larger than only Mercury. In English, Mars carries the name of the Roman god of war and is often referred to as the "Red Planet".[17][18] The latter refers
                    to the effect of the iron oxide prevalent on Mars's surface, which gives it a reddish appearance distinctive among the astronomical bodies visible to the naked eye.
                    [19] Mars is a terrestrial planet with a thin atmosphere, with surface features reminiscent of the impact craters of the Moon and the valleys, deserts and polar ice caps of Earth.
                </Content>
            </Item>
            <Item>
                <Header>Jupiter</Header>
                <Content>
                    Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass one-thousandth that of the Sun, but two-and-a-half
                    times that of all the other planets in the Solar System combined. Jupiter is one of the brightest objects visible to the naked eye in the night sky, and has
                    been known to ancient civilizations since before recorded history. It is named after the Roman god Jupiter.[19] When viewed from Earth, Jupiter can be
                    bright enough for its reflected light to cast visible shadows,[20] and is on average the third-brightest natural object in the night sky after the Moon and Venus.
                </Content>
            </Item>
            <Item>
                <Header>Venus</Header>
                <Content>
                    Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.
                </Content>
            </Item>
        </Tabs>
    )
    .add("selected key with manual keys", () =>
        <Stack>
            <Tabs defaultSelectedKey="jupiter" aria-label="Planets">
                <Item key="mars">
                    <Header>Mars</Header>
                    <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
                </Item>
                <Item key="jupiter">
                    <Header>Jupiter</Header>
                    <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
                </Item>
                <Item key="venus">
                    <Header>Venus</Header>
                    <Content>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
                </Item>
            </Tabs>
            <Tabs selectedKey="jupiter" aria-label="Planets">
                <Item key="mars">
                    <Header>Mars</Header>
                    <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
                </Item>
                <Item key="jupiter">
                    <Header>Jupiter</Header>
                    <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
                </Item>
                <Item key="venus">
                    <Header>Venus</Header>
                    <Content>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
                </Item>
            </Tabs>
        </Stack>
    )
    .add("selected key with generated keys", () =>
        <Stack>
            <Tabs defaultSelectedKey="1" aria-label="Planets">
                <Item>
                    <Header>Mars</Header>
                    <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
                </Item>
                <Item>
                    <Header>Jupiter</Header>
                    <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
                </Item>
                <Item>
                    <Header>Venus</Header>
                    <Content>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
                </Item>
            </Tabs>
            <Tabs selectedKey="1" aria-label="Planets">
                <Item>
                    <Header>Mars</Header>
                    <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
                </Item>
                <Item>
                    <Header>Jupiter</Header>
                    <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
                </Item>
                <Item>
                    <Header>Venus</Header>
                    <Content>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
                </Item>
            </Tabs>
        </Stack>
    )
    .add("tab with icon", () =>
        <Tabs aria-label="Planets">
            <Item>
                <Header>
                    <NotificationIcon />
                    <Text>Mars</Text>
                </Header>
                <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
            </Item>
            <Item>
                <Header>Jupiter</Header>
                <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
            </Item>
        </Tabs>
    )
    .add("tab with lozenge", () =>
        <Tabs aria-label="Planets">
            <Item>
                <Header>
                    <Text>Mars</Text>
                    <Lozenge>New</Lozenge>
                </Header>
                <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
            </Item>
            <Item>
                <Header>
                    <NotificationIcon />
                    <Text>Jupiter</Text>
                    <Lozenge>New</Lozenge>
                </Header>
                <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
            </Item>
        </Tabs>
    )
    .add("tab overflow", () =>
        <Stack>
            <Tabs width="300px" aria-label="Planets">
                <Item>
                    <Header>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Header>
                    <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
                </Item>
                <Item>
                    <Header>Jupiter</Header>
                    <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
                </Item>
            </Tabs>
            <Tabs width="300px" aria-label="Planets">
                <Item>
                    <Header>
                        <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                        <Lozenge>New</Lozenge>
                    </Header>
                    <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
                </Item>
                <Item>
                    <Header>Jupiter</Header>
                    <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
                </Item>
            </Tabs>
            <Tabs width="300px" aria-label="Planets">
                <Item>
                    <Header>
                        <NotificationIcon />
                        <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                    </Header>
                    <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
                </Item>
                <Item>
                    <Header>Jupiter</Header>
                    <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
                </Item>
            </Tabs>
        </Stack>
    )
    .add("tab as div", () =>
        <Tabs aria-label="Planets">
            <Item>
                <Header as="div">Mars</Header>
                <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
            </Item>
            <Item>
                <Header>Jupiter</Header>
                <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
            </Item>
            <Item>
                <Header>Venus</Header>
                <Content>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
            </Item>
        </Tabs>
    )
    .add("states", () =>
        <Stack>
            <Tabs aria-label="Planets">
                <Item selected>
                    <Header>Uranus</Header>
                    <Content>Uranus is the seventh planet from the Sun.</Content>
                </Item>
                <Item active>
                    <Header>Mars</Header>
                    <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
                </Item>
                <Item focus>
                    <Header>Jupiter</Header>
                    <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
                </Item>
                <Item hover>
                    <Header>Venus</Header>
                    <Content>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
                </Item>
                <Item focus hover>
                    <Header>Saturn</Header>
                    <Content>Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter.</Content>
                </Item>
            </Tabs>
            <Tabs aria-label="Planets">
                <Item disabled>
                    <Header>Uranus</Header>
                    <Content>Uranus is the seventh planet from the Sun.</Content>
                </Item>
                <Item disabled active>
                    <Header>Mars</Header>
                    <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
                </Item>
                <Item disabled focus>
                    <Header>Jupiter</Header>
                    <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
                </Item>
                <Item disabled hover>
                    <Header>Venus</Header>
                    <Content>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
                </Item>
                <Item disabled focus hover>
                    <Header>Saturn</Header>
                    <Content>Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter.</Content>
                </Item>
            </Tabs>
            <Tabs aria-label="Planets">
                <Item>
                    <Header>Mars</Header>
                    <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
                </Item>
                <Item disabled>
                    <Header>Jupiter</Header>
                    <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
                </Item>
                <Item>
                    <Header>Venus</Header>
                    <Content>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
                </Item>
            </Tabs>
        </Stack>
    )
    .add("disabled tab is not the default tab", () =>
        <Tabs aria-label="Planets">
            <Item disabled>
                <Header>
                    <NotificationIcon />
                    <Text>Mars</Text>
                </Header>
                <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
            </Item>
            <Item>
                <Header>Jupiter</Header>
                <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
            </Item>
        </Tabs>
    )
    .add("disabled selected tab is not the default tab", () =>
        <Tabs selectedKey="0" aria-label="Planets">
            <Item disabled>
                <Header>
                    <NotificationIcon />
                    <Text>Mars</Text>
                </Header>
                <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
            </Item>
            <Item>
                <Header>Jupiter</Header>
                <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
            </Item>
        </Tabs>
    )
    .add("dynamic tabs", () =>
        <Tabs aria-label="Planets">
            {["1", "2", "3"].map(x => (
                <Item key={x}>
                    <Header>{`Header ${x}`}</Header>
                    <Content>{`Content ${x}`}</Content>
                </Item>
            ))}
        </Tabs>
    )
    .add("custom components", () => {
        const ActiveHeader = ({ tab, children, ...rest }) => {
            const { selectedKey } = useTabsContext();
            const { key } = tab;

            return (
                <Tab
                    {...rest}
                    tab={tab}
                >
                    {key === selectedKey ? <CheckCircleIcon /> : <CrossIcon />}
                    <Text>{children}</Text>
                </Tab>
            );
        };

        const ColoredHeader = ({ children, ...rest }) => {
            return (
                <Tab {...rest} >
                    <Text color="red">{children}</Text>
                </Tab>
            );
        };

        const ColoredContent = ({ panel, children, ...rest }) => {
            const { selectedKey } = useTabsContext();
            const { key } = panel;

            return (
                <TabPanel
                    {...rest}
                    panel={panel}
                    backgroundColor={key === selectedKey ? "red" : undefined}
                >
                    {children}
                </TabPanel>
            );
        };

        return (
            <Stack>
                <Tabs aria-label="Planets">
                    <Item>
                        <ActiveHeader>Mars</ActiveHeader>
                        <ColoredContent>Mars is the fourth planet from the Sun and the second-smallest planet.</ColoredContent>
                    </Item>
                    <Item>
                        <ActiveHeader>Jupiter</ActiveHeader>
                        <ColoredContent>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</ColoredContent>
                    </Item>
                    <Item>
                        <ActiveHeader>Venus</ActiveHeader>
                        <ColoredContent>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</ColoredContent>
                    </Item>
                </Tabs>
                <Tabs aria-label="Planets">
                    <Item>
                        <ColoredHeader>Mars</ColoredHeader>
                        <ColoredContent>Mars is the fourth planet from the Sun and the second-smallest planet.</ColoredContent>
                    </Item>
                    <Item>
                        <ColoredHeader>Jupiter</ColoredHeader>
                        <ColoredContent>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</ColoredContent>
                    </Item>
                    <Item>
                        <ColoredHeader>Venus</ColoredHeader>
                        <ColoredContent>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</ColoredContent>
                    </Item>
                </Tabs>
            </Stack>
        );
    })
    .add("custom as", () => {
        const RedHeader = ({ children, ...rest }) => {
            return (
                <Box
                    {...rest}
                    color="red"
                >
                    {children}
                </Box>
            );
        };

        const BlueContent = ({ children, ...rest }) => {
            return (
                <Box
                    {...rest}
                    backgroundColor="blue"
                >
                    {children}
                </Box>
            );
        };

        return (
            <Tabs aria-label="Planets">
                <Item>
                    <Header as={RedHeader}>Mars</Header>
                    <Content as={BlueContent}>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
                </Item>
                <Item>
                    <Header as={RedHeader}>Jupiter</Header>
                    <Content as={BlueContent}>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
                </Item>
                <Item>
                    <Header as={RedHeader}>Venus</Header>
                    <Content as={BlueContent}>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
                </Item>
            </Tabs>
        );
    })
    .add("conditional rendering", () =>
        <Tabs aria-label="Planets">
            <Item key="mars">
                <Header>Mars</Header>
                <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
            </Item>
            {false && <Item key="jupiter">
                <Header>Jupiter</Header>
                <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
            </Item>}
        </Tabs>
    )
    .add("styling", () =>
        <Stack>
            <Inline>
                <Tabs className="border-red" aria-label="Planets">
                    <Item>
                        <Header>Mars</Header>
                        <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
                    </Item>
                </Tabs>
                <Tabs style={{ border: "1px solid red" }} aria-label="Planets">
                    <Item>
                        <Header>Mars</Header>
                        <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
                    </Item>
                </Tabs>
            </Inline>
            <Inline>
                <Tabs aria-label="Planets">
                    <Item>
                        <Header className="border-red">Mars</Header>
                        <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
                    </Item>
                </Tabs>
                <Tabs aria-label="Planets">
                    <Item>
                        <Header style={{ border: "1px solid red" }}>Mars</Header>
                        <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
                    </Item>
                </Tabs>
            </Inline>
            <Inline>
                <Tabs aria-label="Planets">
                    <Item>
                        <Header>Mars</Header>
                        <Content className="border-red">Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
                    </Item>
                </Tabs>
                <Tabs aria-label="Planets">
                    <Item>
                        <Header>Mars</Header>
                        <Content style={{ border: "1px solid red" }}>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
                    </Item>
                </Tabs>
            </Inline>
        </Stack>
    );

stories("/vertical")
    .add("default", () =>
        <Tabs orientation="vertical" aria-label="Planets">
            <Item>
                <Header>Mars</Header>
                <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
            </Item>
            <Item>
                <Header>Jupiter</Header>
                <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
            </Item>
            <Item>
                <Header>Venus</Header>
                <Content>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
            </Item>
        </Tabs>
    )
    .add("fluid", () =>
        <Tabs orientation="vertical" fluid height="300px" aria-label="Planets">
            <Item>
                <Header>Mars</Header>
                <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
            </Item>
            <Item>
                <Header>Jupiter</Header>
                <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
            </Item>
            <Item>
                <Header>Venus</Header>
                <Content>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
            </Item>
        </Tabs>
    )
    .add("tab with icon", () =>
        <Tabs orientation="vertical" aria-label="Planets">
            <Item>
                <Header>
                    <NotificationIcon />
                    <Text>Mars</Text>
                </Header>
                <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
            </Item>
            <Item>
                <Header>Jupiter</Header>
                <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
            </Item>
        </Tabs>
    )
    .add("tab with lozenge", () =>
        <Tabs orientation="vertical" aria-label="Planets">
            <Item>
                <Header>
                    <Text>Mars</Text>
                    <Lozenge>New</Lozenge>
                </Header>
                <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
            </Item>
            <Item>
                <Header>
                    <NotificationIcon />
                    <Text>Jupiter</Text>
                    <Lozenge>New</Lozenge>
                </Header>
                <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
            </Item>
        </Tabs>
    )
    .add("states", () =>
        <Inline>
            <Tabs orientation="vertical" aria-label="Planets">
                <Item selected>
                    <Header>Uranus</Header>
                    <Content>Uranus is the seventh planet from the Sun.</Content>
                </Item>
                <Item active>
                    <Header>Mars</Header>
                    <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
                </Item>
                <Item focus>
                    <Header>Jupiter</Header>
                    <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
                </Item>
                <Item hover>
                    <Header>Venus</Header>
                    <Content>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
                </Item>
                <Item focus hover>
                    <Header>Saturn</Header>
                    <Content>Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter.</Content>
                </Item>
                <Item disabled>
                    <Header>Neptune</Header>
                    <Content>Neptune is the eighth and farthest-known Solar planet from the Sun.</Content>
                </Item>
            </Tabs>
            <Tabs orientation="vertical" aria-label="Planets">
                <Item disabled>
                    <Header>Uranus</Header>
                    <Content>Uranus is the seventh planet from the Sun.</Content>
                </Item>
                <Item disabled active>
                    <Header>Mars</Header>
                    <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
                </Item>
                <Item disabled focus>
                    <Header>Jupiter</Header>
                    <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
                </Item>
                <Item disabled hover>
                    <Header>Venus</Header>
                    <Content>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
                </Item>
                <Item disabled focus hover>
                    <Header>Saturn</Header>
                    <Content>Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter.</Content>
                </Item>
            </Tabs>
        </Inline>
    );
