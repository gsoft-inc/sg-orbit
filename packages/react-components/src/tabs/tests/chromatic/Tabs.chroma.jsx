import { Box } from "@react-components/box";
import { CheckCircleIcon, CrossIcon, NotificationIcon } from "@react-components/icons";
import { Content, Header } from "@react-components/view";
import { Lozenge } from "@react-components/lozenge";
import { Stack } from "@react-components/layout";
import { Tab, TabElement, TabPanel, Tabs } from "@react-components/tabs";
import { Text } from "@react-components/text";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Tabs"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

stories()
    .add("default", () =>
        <Tabs aria-label="Planets">
            <Tab>
                <Header>Mars</Header>
                <Content>
                    Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System (in adherence with the IAU's controversial 2006 definition of planet),
                    being larger than only Mercury. In English, Mars carries the name of the Roman god of war and is often referred to as the "Red Planet".[17][18] The latter refers
                    to the effect of the iron oxide prevalent on Mars's surface, which gives it a reddish appearance distinctive among the astronomical bodies visible to the naked eye.
                    [19] Mars is a terrestrial planet with a thin atmosphere, with surface features reminiscent of the impact craters of the Moon and the valleys, deserts and polar ice caps of Earth.
                </Content>
            </Tab>
            <Tab>
                <Header>Jupiter</Header>
                <Content>
                    Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass one-thousandth that of the Sun, but two-and-a-half
                    times that of all the other planets in the Solar System combined. Jupiter is one of the brightest objects visible to the naked eye in the night sky, and has
                    been known to ancient civilizations since before recorded history. It is named after the Roman god Jupiter.[19] When viewed from Earth, Jupiter can be
                    bright enough for its reflected light to cast visible shadows,[20] and is on average the third-brightest natural object in the night sky after the Moon and Venus.
                </Content>
            </Tab>
            <Tab>
                <Header>Venus</Header>
                <Content>
                    Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.
                </Content>
            </Tab>
        </Tabs>
    )
    .add("fluid", () =>
        <Tabs fluid aria-label="Planets">
            <Tab>
                <Header>Mars</Header>
                <Content>
                    Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System (in adherence with the IAU's controversial 2006 definition of planet),
                    being larger than only Mercury. In English, Mars carries the name of the Roman god of war and is often referred to as the "Red Planet".[17][18] The latter refers
                    to the effect of the iron oxide prevalent on Mars's surface, which gives it a reddish appearance distinctive among the astronomical bodies visible to the naked eye.
                    [19] Mars is a terrestrial planet with a thin atmosphere, with surface features reminiscent of the impact craters of the Moon and the valleys, deserts and polar ice caps of Earth.
                </Content>
            </Tab>
            <Tab>
                <Header>Jupiter</Header>
                <Content>
                    Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass one-thousandth that of the Sun, but two-and-a-half
                    times that of all the other planets in the Solar System combined. Jupiter is one of the brightest objects visible to the naked eye in the night sky, and has
                    been known to ancient civilizations since before recorded history. It is named after the Roman god Jupiter.[19] When viewed from Earth, Jupiter can be
                    bright enough for its reflected light to cast visible shadows,[20] and is on average the third-brightest natural object in the night sky after the Moon and Venus.
                </Content>
            </Tab>
            <Tab>
                <Header>Venus</Header>
                <Content>
                    Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.
                </Content>
            </Tab>
        </Tabs>
    )
    .add("default index", () =>
        <Tabs defaultIndex={1} aria-label="Planets">
            <Tab>
                <Header>Mars</Header>
                <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
            </Tab>
            <Tab>
                <Header>Jupiter</Header>
                <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
            </Tab>
            <Tab>
                <Header>Venus</Header>
                <Content>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
            </Tab>
        </Tabs>
    )
    .add("tab with icon", () =>
        <Tabs aria-label="Planets">
            <Tab>
                <Header>
                    <NotificationIcon />
                    <Text>Mars</Text>
                </Header>
                <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
            </Tab>
            <Tab>
                <Header>Jupiter</Header>
                <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
            </Tab>
        </Tabs>
    )
    .add("tab with lozenge", () =>
        <Tabs aria-label="Planets">
            <Tab>
                <Header>
                    <Text>Mars</Text>
                    <Lozenge>New</Lozenge>
                </Header>
                <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
            </Tab>
            <Tab>
                <Header>
                    <NotificationIcon />
                    <Text>Jupiter</Text>
                    <Lozenge>New</Lozenge>
                </Header>
                <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
            </Tab>
        </Tabs>
    )
    .add("tab overflow", () =>
        <Stack>
            <Tabs style={{ width: "300px" }} aria-label="Planets">
                <Tab>
                    <Header>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Header>
                    <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
                </Tab>
                <Tab>
                    <Header>Jupiter</Header>
                    <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
                </Tab>
            </Tabs>
            <Tabs style={{ width: "300px" }} aria-label="Planets">
                <Tab>
                    <Header>
                        <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                        <Lozenge>New</Lozenge>
                    </Header>
                    <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
                </Tab>
                <Tab>
                    <Header>Jupiter</Header>
                    <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
                </Tab>
            </Tabs>
            <Tabs style={{ width: "300px" }} aria-label="Planets">
                <Tab>
                    <Header>
                        <NotificationIcon />
                        <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                    </Header>
                    <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
                </Tab>
                <Tab>
                    <Header>Jupiter</Header>
                    <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
                </Tab>
            </Tabs>
        </Stack>
    )
    .add("states", () =>
        <Stack>
            <Tabs aria-label="Planets">
                <Tab selected>
                    <Header>Uranus</Header>
                    <Content>Uranus is the seventh planet from the Sun.</Content>
                </Tab>
                <Tab active>
                    <Header>Mars</Header>
                    <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
                </Tab>
                <Tab focus>
                    <Header>Jupiter</Header>
                    <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
                </Tab>
                <Tab hover>
                    <Header>Venus</Header>
                    <Content>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
                </Tab>
                <Tab focus hover>
                    <Header>Saturn</Header>
                    <Content>Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter.</Content>
                </Tab>
                <Tab disabled>
                    <Header>Neptune</Header>
                    <Content>Neptune is the eighth and farthest-known Solar planet from the Sun.</Content>
                </Tab>
            </Tabs>
            <Tabs aria-label="Planets">
                <Tab>
                    <Header>Mars</Header>
                    <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
                </Tab>
                <Tab disabled>
                    <Header>Jupiter</Header>
                    <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
                </Tab>
                <Tab>
                    <Header>Venus</Header>
                    <Content>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
                </Tab>
            </Tabs>
        </Stack>
    )
    .add("disabled tab is not tabbable", () =>
        <Tabs aria-label="Planets">
            <Tab disabled>
                <Header>
                    <NotificationIcon />
                    <Text>Mars</Text>
                </Header>
                <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
            </Tab>
            <Tab>
                <Header>Jupiter</Header>
                <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
            </Tab>
        </Tabs>
    )
    .add("render props", () =>
        <Tabs aria-label="Planets">
            <Tab>
                {({ isActive }) => (
                    <>
                        <Header>
                            {isActive ? <CheckCircleIcon /> : <CrossIcon />}
                            <Text>Mars</Text>
                        </Header>
                        <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
                    </>
                )}
            </Tab>
            <Tab>
                {({ isActive }) => (
                    <>
                        <Header>
                            {isActive ? <CheckCircleIcon /> : <CrossIcon />}
                            <Text>Jupiter</Text>
                        </Header>
                        <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
                    </>
                )}
            </Tab>
        </Tabs>
    )
    .add("data render", () =>
        <Stack>
            <Tabs aria-label="Planets">
                {[1, 2, 3].map(x => (
                    <Tab key={x}>
                        <Header>{`Header ${x}`}</Header>
                        <Content>{`Content ${x}`}</Content>
                    </Tab>
                ))}
            </Tabs>
            <Tabs aria-label="Planets">
                {[1, 2, 3].map(x => (
                    <Tab key={x}>
                        {({ isActive }) => (
                            <>
                                <Header>
                                    {isActive ? <CheckCircleIcon /> : <CrossIcon />}
                                    <Text>{`Header ${x}`}</Text>
                                </Header>
                                <Content>{`Content ${x}`}</Content>
                            </>
                        )}
                    </Tab>
                ))}
            </Tabs>
        </Stack>
    )
    .add("custom components", () => {
        const ActiveHeader = ({ selected, children, ...rest }) => {
            return (
                <TabElement
                    {...rest}
                    selected={selected}
                >
                    {selected ? <CheckCircleIcon /> : <CrossIcon />}
                    <Text>{children}</Text>
                </TabElement>
            );
        };

        const ColoredHeader = ({ children, ...rest }) => {
            return (
                <TabElement {...rest} >
                    <Text style={{ color: "red" }}>{children}</Text>
                </TabElement>
            );
        };

        const ColoredContent = ({ selected, children, ...rest }) => {
            return (
                <TabPanel
                    {...rest}
                    selected={selected}
                    style={selected ? { backgroundColor: "red" } : undefined}
                >
                    {children}
                </TabPanel>
            );
        };

        return (
            <Stack>
                <Tabs aria-label="Planets">
                    <Tab>
                        <ActiveHeader>Mars</ActiveHeader>
                        <ColoredContent>Mars is the fourth planet from the Sun and the second-smallest planet.</ColoredContent>
                    </Tab>
                    <Tab>
                        <ActiveHeader>Jupiter</ActiveHeader>
                        <ColoredContent>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</ColoredContent>
                    </Tab>
                    <Tab>
                        <ActiveHeader>Venus</ActiveHeader>
                        <ColoredContent>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</ColoredContent>
                    </Tab>
                </Tabs>
                <Tabs aria-label="Planets">
                    <Tab>
                        <ColoredHeader>Mars</ColoredHeader>
                        <ColoredContent>Mars is the fourth planet from the Sun and the second-smallest planet.</ColoredContent>
                    </Tab>
                    <Tab>
                        <ColoredHeader>Jupiter</ColoredHeader>
                        <ColoredContent>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</ColoredContent>
                    </Tab>
                    <Tab>
                        <ColoredHeader>Venus</ColoredHeader>
                        <ColoredContent>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</ColoredContent>
                    </Tab>
                </Tabs>
            </Stack>
        );
    })
    .add("custom as", () => {
        const RedHeader = ({ children, ...rest }) => {
            return (
                <Box
                    {...rest}
                    style={{ color: "red" }}
                >
                    {children}
                </Box>
            );
        };

        const BlueContent = ({ children, ...rest }) => {
            return (
                <Box
                    {...rest}
                    style={{ backgroundColor: "blue" }}
                >
                    {children}
                </Box>
            );
        };

        return (
            <Tabs aria-label="Planets">
                <Tab>
                    <Header as={RedHeader}>Mars</Header>
                    <Content as={BlueContent}>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
                </Tab>
                <Tab>
                    <Header as={RedHeader}>Jupiter</Header>
                    <Content as={BlueContent}>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
                </Tab>
                <Tab>
                    <Header as={RedHeader}>Venus</Header>
                    <Content as={BlueContent}>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
                </Tab>
            </Tabs>
        );
    })
    .add("autofocus", () =>
        <Tabs autoFocus aria-label="Planets">
            <Tab>
                <Header>Mars</Header>
                <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
            </Tab>
            <Tab>
                <Header>Jupiter</Header>
                <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
            </Tab>
            <Tab>
                <Header>Venus</Header>
                <Content>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
            </Tab>
        </Tabs>
    )
    .add("autofocus + default index", () =>
        <Tabs autoFocus defaultIndex={1} aria-label="Planets">
            <Tab>
                <Header>Mars</Header>
                <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
            </Tab>
            <Tab>
                <Header>Jupiter</Header>
                <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
            </Tab>
            <Tab>
                <Header>Venus</Header>
                <Content>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
            </Tab>
        </Tabs>
    )
    .add("autofocus with delay", () =>
        <Tabs autoFocus autoFocusDelay={50} aria-label="Planets">
            <Tab>
                <Header>Mars</Header>
                <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
            </Tab>
            <Tab>
                <Header>Jupiter</Header>
                <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
            </Tab>
            <Tab>
                <Header>Venus</Header>
                <Content>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
            </Tab>
        </Tabs>
    );

stories("/vertical")
    .add("default", () =>
        <Tabs orientation="vertical" aria-label="Planets">
            <Tab>
                <Header>Mars</Header>
                <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
            </Tab>
            <Tab>
                <Header>Jupiter</Header>
                <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
            </Tab>
            <Tab>
                <Header>Venus</Header>
                <Content>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
            </Tab>
        </Tabs>
    )
    .add("fluid", () =>
        <Tabs orientation="vertical" fluid style={{ height: "300px" }} aria-label="Planets">
            <Tab>
                <Header>Mars</Header>
                <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
            </Tab>
            <Tab>
                <Header>Jupiter</Header>
                <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
            </Tab>
            <Tab>
                <Header>Venus</Header>
                <Content>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
            </Tab>
        </Tabs>
    )
    .add("tab with icon", () =>
        <Tabs orientation="vertical" aria-label="Planets">
            <Tab>
                <Header>
                    <NotificationIcon />
                    <Text>Mars</Text>
                </Header>
                <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
            </Tab>
            <Tab>
                <Header>Jupiter</Header>
                <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
            </Tab>
        </Tabs>
    )
    .add("tab with lozenge", () =>
        <Tabs orientation="vertical" aria-label="Planets">
            <Tab>
                <Header>
                    <Text>Mars</Text>
                    <Lozenge>New</Lozenge>
                </Header>
                <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
            </Tab>
            <Tab>
                <Header>
                    <NotificationIcon />
                    <Text>Jupiter</Text>
                    <Lozenge>New</Lozenge>
                </Header>
                <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
            </Tab>
        </Tabs>
    )
    .add("states", () =>
        <Tabs orientation="vertical" aria-label="Planets">
            <Tab selected>
                <Header>Uranus</Header>
                <Content>Uranus is the seventh planet from the Sun.</Content>
            </Tab>
            <Tab active>
                <Header>Mars</Header>
                <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
            </Tab>
            <Tab focus>
                <Header>Jupiter</Header>
                <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
            </Tab>
            <Tab hover>
                <Header>Venus</Header>
                <Content>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
            </Tab>
            <Tab focus hover>
                <Header>Saturn</Header>
                <Content>Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter.</Content>
            </Tab>
            <Tab disabled>
                <Header>Neptune</Header>
                <Content>Neptune is the eighth and farthest-known Solar planet from the Sun.</Content>
            </Tab>
        </Tabs>
    );
