import { Box } from "@react-components/box";
import { Content, Header } from "@react-components/view";
import { Lozenge } from "@react-components/lozenge";
import { NotificationIcon } from "@react-components/icons";
import { Stack } from "@react-components/layout";
import { Tab, Tabs } from "@react-components/tabs";
import { Text } from "@react-components/text";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { forwardRef } from "react";
import { slot } from "@react-components/shared";

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
        <Tabs>
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
        <Tabs fluid>
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
        <Tabs defaultIndex={1}>
            <Tab>
                <Header>Mars</Header>
                <Content>
                    Mars is the fourth planet from the Sun and the second-smallest planet.
                </Content>
            </Tab>
            <Tab>
                <Header>Jupiter</Header>
                <Content>
                    Jupiter is the fifth planet from the Sun and the largest in the Solar System.
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
    .add("tab with icon", () =>
        <Tabs>
            <Tab>
                <Header>
                    <NotificationIcon />
                    <Text>Mars</Text>
                </Header>
                <Content>
                    Mars is the fourth planet from the Sun and the second-smallest planet.
                </Content>
            </Tab>
            <Tab>
                <Header>Jupiter</Header>
                <Content>
                    Jupiter is the fifth planet from the Sun and the largest in the Solar System.
                </Content>
            </Tab>
        </Tabs>
    )
    .add("tab with lozenge", () =>
        <Tabs>
            <Tab>
                <Header>
                    <Text>Mars</Text>
                    <Lozenge>New</Lozenge>
                </Header>
                <Content>
                    Mars is the fourth planet from the Sun and the second-smallest planet.
                </Content>
            </Tab>
            <Tab>
                <Header>
                    <NotificationIcon />
                    <Text>Jupiter</Text>
                    <Lozenge>New</Lozenge>
                </Header>
                <Content>
                    Jupiter is the fifth planet from the Sun and the largest in the Solar System.
                </Content>
            </Tab>
        </Tabs>
    )
    .add("tab overflow", () =>
        <Stack>
            <Tabs style={{ width: "300px" }}>
                <Tab>
                    <Header>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Header>
                    <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
                </Tab>
                <Tab>
                    <Header>Jupiter</Header>
                    <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
                </Tab>
            </Tabs>
            <Tabs style={{ width: "300px" }}>
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
            <Tabs style={{ width: "300px" }}>
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
            <Tabs>
                <Tab selected>
                    <Header>Uranus</Header>
                    <Content>
                        Uranus is the seventh planet from the Sun.
                    </Content>
                </Tab>
                <Tab active>
                    <Header>Mars</Header>
                    <Content>
                        Mars is the fourth planet from the Sun and the second-smallest planet.
                    </Content>
                </Tab>
                <Tab focus>
                    <Header>Jupiter</Header>
                    <Content>
                        Jupiter is the fifth planet from the Sun and the largest in the Solar System.
                    </Content>
                </Tab>
                <Tab hover>
                    <Header>Venus</Header>
                    <Content>
                        Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.
                    </Content>
                </Tab>
                <Tab focus hover>
                    <Header>Saturn</Header>
                    <Content>
                        Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter.
                    </Content>
                </Tab>
                <Tab disabled>
                    <Header>Neptune</Header>
                    <Content>
                        Neptune is the eighth and farthest-known Solar planet from the Sun.
                    </Content>
                </Tab>
            </Tabs>
            <Tabs>
                <Tab>
                    <Header>Mars</Header>
                    <Content>
                        Mars is the fourth planet from the Sun and the second-smallest planet.
                    </Content>
                </Tab>
                <Tab disabled>
                    <Header>Jupiter</Header>
                    <Content>
                        Jupiter is the fifth planet from the Sun and the largest in the Solar System.
                    </Content>
                </Tab>
                <Tab>
                    <Header>Venus</Header>
                    <Content>
                        Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.
                    </Content>
                </Tab>
            </Tabs>
        </Stack>
    )
    .add("custom components", () => {
        const RedHeader = slot("header", ({ children }) => {
            return (
                <Header style={{ backgroundColor: "red" }}>
                    {children}
                </Header>
            );
        });

        const BlueHeader = slot("header", forwardRef(({ children }, ref) => {
            return (
                <Header style={{ backgroundColor: "blue" }} ref={ref}>
                    {children}
                </Header>
            );
        }));

        const PurpleHeader = ({ children, ...rest }) => {
            return (
                <Box style={{ backgroundColor: "purple" }} {...rest}>
                    {children}
                </Box>
            );
        };

        return (
            <Tabs>
                <Tab>
                    <RedHeader>Mars</RedHeader>
                    <Content>
                        Mars is the fourth planet from the Sun and the second-smallest planet.
                    </Content>
                </Tab>
                <Tab>
                    <BlueHeader>Jupiter</BlueHeader>
                    <Content>
                        Jupiter is the fifth planet from the Sun and the largest in the Solar System.
                    </Content>
                </Tab>
                <Tab>
                    <PurpleHeader slot="header">Venus</PurpleHeader>
                    <Content>
                        Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.
                    </Content>
                </Tab>
            </Tabs>
        );
    })
    .add("data render", () =>
        <Tabs>
            {[1, 2, 3].map(x => (
                <Tab key={x}>
                    <Header>{`Header ${x}`}</Header>
                    <Content>{`Content ${x}`}</Content>
                </Tab>
            ))}
        </Tabs>
    )
    .add("autofocus", () =>
        <Tabs autoFocus>
            <Tab>
                <Header>Mars</Header>
                <Content>
                    Mars is the fourth planet from the Sun and the second-smallest planet.
                </Content>
            </Tab>
            <Tab>
                <Header>Jupiter</Header>
                <Content>
                    Jupiter is the fifth planet from the Sun and the largest in the Solar System.
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
    .add("autofocus + default index", () =>
        <Tabs autoFocus defaultIndex={1}>
            <Tab>
                <Header>Mars</Header>
                <Content>
                    Mars is the fourth planet from the Sun and the second-smallest planet.
                </Content>
            </Tab>
            <Tab>
                <Header>Jupiter</Header>
                <Content>
                    Jupiter is the fifth planet from the Sun and the largest in the Solar System.
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
    .add("autofocus with delay", () =>
        <Tabs autoFocus autoFocusDelay={50}>
            <Tab>
                <Header>Mars</Header>
                <Content>
                    Mars is the fourth planet from the Sun and the second-smallest planet.
                </Content>
            </Tab>
            <Tab>
                <Header>Jupiter</Header>
                <Content>
                    Jupiter is the fifth planet from the Sun and the largest in the Solar System.
                </Content>
            </Tab>
            <Tab>
                <Header>Venus</Header>
                <Content>
                    Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.
                </Content>
            </Tab>
        </Tabs>
    );

stories("/vertical")
    .add("default", () =>
        <Tabs orientation="vertical">
            <Tab>
                <Header>Mars</Header>
                <Content>
                    Mars is the fourth planet from the Sun and the second-smallest planet.
                </Content>
            </Tab>
            <Tab>
                <Header>Jupiter</Header>
                <Content>
                    Jupiter is the fifth planet from the Sun and the largest in the Solar System.
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
        <Tabs orientation="vertical" fluid style={{ height: "300px" }}>
            <Tab>
                <Header>Mars</Header>
                <Content>
                    Mars is the fourth planet from the Sun and the second-smallest planet.
                </Content>
            </Tab>
            <Tab>
                <Header>Jupiter</Header>
                <Content>
                    Jupiter is the fifth planet from the Sun and the largest in the Solar System.
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
    .add("tab with icon", () =>
        <Tabs orientation="vertical">
            <Tab>
                <Header>
                    <NotificationIcon />
                    <Text>Mars</Text>
                </Header>
                <Content>
                    Mars is the fourth planet from the Sun and the second-smallest planet.
                </Content>
            </Tab>
            <Tab>
                <Header>Jupiter</Header>
                <Content>
                    Jupiter is the fifth planet from the Sun and the largest in the Solar System.
                </Content>
            </Tab>
        </Tabs>
    )
    .add("tab with lozenge", () =>
        <Tabs orientation="vertical">
            <Tab>
                <Header>
                    <Text>Mars</Text>
                    <Lozenge>New</Lozenge>
                </Header>
                <Content>
                    Mars is the fourth planet from the Sun and the second-smallest planet.
                </Content>
            </Tab>
            <Tab>
                <Header>
                    <NotificationIcon />
                    <Text>Jupiter</Text>
                    <Lozenge>New</Lozenge>
                </Header>
                <Content>
                    Jupiter is the fifth planet from the Sun and the largest in the Solar System.
                </Content>
            </Tab>
        </Tabs>
    )
    .add("states", () =>
        <Tabs orientation="vertical">
            <Tab selected>
                <Header>Uranus</Header>
                <Content>
                    Uranus is the seventh planet from the Sun.
                </Content>
            </Tab>
            <Tab active>
                <Header>Mars</Header>
                <Content>
                    Mars is the fourth planet from the Sun and the second-smallest planet.
                </Content>
            </Tab>
            <Tab focus>
                <Header>Jupiter</Header>
                <Content>
                    Jupiter is the fifth planet from the Sun and the largest in the Solar System.
                </Content>
            </Tab>
            <Tab hover>
                <Header>Venus</Header>
                <Content>
                    Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.
                </Content>
            </Tab>
            <Tab focus hover>
                <Header>Saturn</Header>
                <Content>
                    Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter.
                </Content>
            </Tab>
            <Tab disabled>
                <Header>Neptune</Header>
                <Content>
                    Neptune is the eighth and farthest-known Solar planet from the Sun.
                </Content>
            </Tab>
        </Tabs>
    );
