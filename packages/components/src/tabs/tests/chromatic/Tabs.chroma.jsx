import { PlaceholderMajorIcon, CrossMajorIcon, NotificationMajorIcon } from "@components/icons";
import { Content, Header } from "@components/placeholders";
import { Inline, Stack } from "@components/layout";
import { Tab, TabPanel, Tabs, useTabsContext } from "@components/tabs";

import { Div } from "@components/html";
import { Item } from "@components/collection";
import { Lozenge } from "@components/lozenge";
import { Text } from "@components/typography";

export default {
    title: "Chromatic/Tabs",
    component: Tabs,
    parameters: {
        chromatic: {
            delay: 100
        }
    }
};

export const Default = () => (
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
);

Default.storyName = "default";

export const Fluid = () => (
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
);

Fluid.storyName = "fluid";

export const SelectedKeyWithManualKeys = () => (
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
);

SelectedKeyWithManualKeys.storyName = "selected key with manual keys";

export const SelectedKeyWithGeneratedKeys = () => (
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
);

SelectedKeyWithGeneratedKeys.storyName = "selected key with generated keys";

export const TabWithIcon = () => (
    <Tabs aria-label="Planets">
        <Item>
            <Header>
                <NotificationMajorIcon />
                <Text>Mars</Text>
            </Header>
            <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
        </Item>
        <Item>
            <Header>Jupiter</Header>
            <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
        </Item>
    </Tabs>
);

TabWithIcon.storyName = "tab with icon";

export const TabWithLozenge = () => (
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
                <NotificationMajorIcon />
                <Text>Jupiter</Text>
                <Lozenge>New</Lozenge>
            </Header>
            <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
        </Item>
    </Tabs>
);

TabWithLozenge.storyName = "tab with lozenge";

export const TabAsDiv = () => (
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
);

TabAsDiv.storyName = "tab as div";

export const States = () => (
    <Stack>
        <Tabs aria-label="Planets">
            <Item selected>
                <Header>Uranus</Header>
                <Content>Uranus is the seventh planet from the Sun.</Content>
            </Item>
            <Item selected hover>
                <Header>Neptune</Header>
                <Content>It was the first planet located through mathematical calculations, rather than by telescope.</Content>
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
        <Tabs fluid aria-label="Planets">
            <Item selected>
                <Header>Uranus</Header>
                <Content>Uranus is the seventh planet from the Sun.</Content>
            </Item>
            <Item selected hover>
                <Header>Neptune</Header>
                <Content>It was the first planet located through mathematical calculations, rather than by telescope.</Content>
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
            <Item disabled selected>
                <Header>Uranus</Header>
                <Content>Uranus is the seventh planet from the Sun.</Content>
            </Item>
            <Item disabled selected hover>
                <Header>Neptune</Header>
                <Content>It was the first planet located through mathematical calculations, rather than by telescope.</Content>
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
);

States.storyName = "states";

export const DisabledTabIsNotTheDefaultTab = () => (
    <Tabs aria-label="Planets">
        <Item disabled>
            <Header>
                <NotificationMajorIcon />
                <Text>Mars</Text>
            </Header>
            <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
        </Item>
        <Item>
            <Header>Jupiter</Header>
            <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
        </Item>
    </Tabs>
);

DisabledTabIsNotTheDefaultTab.storyName = "disabled tab is not the default tab";

export const DisabledSelectedTabIsNotTheDefaultTab = () => (
    <Tabs selectedKey="0" aria-label="Planets">
        <Item disabled>
            <Header>
                <NotificationMajorIcon />
                <Text>Mars</Text>
            </Header>
            <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
        </Item>
        <Item>
            <Header>Jupiter</Header>
            <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
        </Item>
    </Tabs>
);

DisabledSelectedTabIsNotTheDefaultTab.storyName = "disabled selected tab is not the default tab";

export const Overflow = () => (
    <Div width="300px">
        <Tabs aria-label="Planets">
            <Item key="mars">
                <Header>Mars</Header>
                <Content>Mars is a dusty, cold, desert world with a very thin atmosphere. There is strong evidence Mars was—billions of years ago—wetter and warmer, with a thicker atmosphere.</Content>
            </Item>
            <Item key="jupiter">
                <Header>Jupiter</Header>
                <Content>Jupiter is more than twice as massive than the other planets of our solar system combined. The giant planet's Great Red spot is a centuries-old storm bigger than Earth.</Content>
            </Item>
            <Item key="venus">
                <Header>Venus</Header>
                <Content>Venus spins slowly in the opposite direction from most planets. A thick atmosphere traps heat in a runaway greenhouse effect, making it the hottest planet in our solar system.</Content>
            </Item>
            <Item key="earth">
                <Header>
                    <Text>Earth</Text>
                    <Lozenge>Home</Lozenge>
                </Header>
                <Content>Earth—our home planet—is the only place we know of so far that’s inhabited by living things. It's also the only planet in our solar system with liquid water on the surface.</Content>
            </Item>
            <Item key="saturn">
                <Header>
                    <NotificationMajorIcon />
                    <Text>Saturn</Text>
                </Header>
                <Content>Adorned with a dazzling, complex system of icy rings, Saturn is unique in our solar system. The other giant planets have rings, but none are as spectacular as Saturn's.</Content>
            </Item>
            <Item key="uranus">
                <Header>
                    <Text>Uranus</Text>
                    <NotificationMajorIcon />
                </Header>
                <Content>Uranus—seventh planet from the Sun—rotates at a nearly 90-degree angle from the plane of its orbit. This unique tilt makes Uranus appear to spin on its side.</Content>
            </Item>
            <Item key="neptune">
                <Header>
                    <NotificationMajorIcon />
                    <Text>Neptune</Text>
                    <Lozenge>New</Lozenge>
                </Header>
                <Content>Neptune—the eighth and most distant major planet orbiting our Sun—is dark, cold and whipped by supersonic winds. It was the first planet located through mathematical calculations, rather than by telescope.</Content>
            </Item>
        </Tabs>
    </Div>
);

Overflow.storyName = "overflow";

export const OverflowFluid = () => (
    <Div width="300px">
        <Tabs aria-label="Planets" fluid>
            <Item key="mars">
                <Header>Mars</Header>
                <Content>Mars is a dusty, cold, desert world with a very thin atmosphere. There is strong evidence Mars was—billions of years ago—wetter and warmer, with a thicker atmosphere.</Content>
            </Item>
            <Item key="jupiter">
                <Header>Jupiter</Header>
                <Content>Jupiter is more than twice as massive than the other planets of our solar system combined. The giant planet's Great Red spot is a centuries-old storm bigger than Earth.</Content>
            </Item>
            <Item key="venus">
                <Header>Venus</Header>
                <Content>Venus spins slowly in the opposite direction from most planets. A thick atmosphere traps heat in a runaway greenhouse effect, making it the hottest planet in our solar system.</Content>
            </Item>
            <Item key="earth">
                <Header>
                    <Text>Earth</Text>
                    <Lozenge>Home</Lozenge>
                </Header>
                <Content>Earth—our home planet—is the only place we know of so far that’s inhabited by living things. It's also the only planet in our solar system with liquid water on the surface.</Content>
            </Item>
            <Item key="saturn">
                <Header>Saturn</Header>
                <Content>Adorned with a dazzling, complex system of icy rings, Saturn is unique in our solar system. The other giant planets have rings, but none are as spectacular as Saturn's.</Content>
            </Item>
            <Item key="uranus">
                <Header>Uranus</Header>
                <Content>Uranus—seventh planet from the Sun—rotates at a nearly 90-degree angle from the plane of its orbit. This unique tilt makes Uranus appear to spin on its side.</Content>
            </Item>
            <Item key="neptune">
                <Header>Neptune</Header>
                <Content>Neptune—the eighth and most distant major planet orbiting our Sun—is dark, cold and whipped by supersonic winds. It was the first planet located through mathematical calculations, rather than by telescope.</Content>
            </Item>
        </Tabs>
    </Div>
);

OverflowFluid.storyName = "overflow fluid";

export const OverflowNotCollapsible = () => (
    <Div width="300px">
        <Tabs aria-label="Planets" collapsible={false}>
            <Item key="mars">
                <Header>Mars</Header>
                <Content>Mars is a dusty, cold, desert world with a very thin atmosphere. There is strong evidence Mars was—billions of years ago—wetter and warmer, with a thicker atmosphere.</Content>
            </Item>
            <Item key="jupiter">
                <Header>Jupiter</Header>
                <Content>Jupiter is more than twice as massive than the other planets of our solar system combined. The giant planet's Great Red spot is a centuries-old storm bigger than Earth.</Content>
            </Item>
            <Item key="venus">
                <Header>Venus</Header>
                <Content>Venus spins slowly in the opposite direction from most planets. A thick atmosphere traps heat in a runaway greenhouse effect, making it the hottest planet in our solar system.</Content>
            </Item>
            <Item key="earth">
                <Header>
                    <Text>Earth</Text>
                    <Lozenge>Home</Lozenge>
                </Header>
                <Content>Earth—our home planet—is the only place we know of so far that’s inhabited by living things. It's also the only planet in our solar system with liquid water on the surface.</Content>
            </Item>
            <Item key="saturn">
                <Header>Saturn</Header>
                <Content>Adorned with a dazzling, complex system of icy rings, Saturn is unique in our solar system. The other giant planets have rings, but none are as spectacular as Saturn's.</Content>
            </Item>
            <Item key="uranus">
                <Header>Uranus</Header>
                <Content>Uranus—seventh planet from the Sun—rotates at a nearly 90-degree angle from the plane of its orbit. This unique tilt makes Uranus appear to spin on its side.</Content>
            </Item>
            <Item key="neptune">
                <Header>Neptune</Header>
                <Content>Neptune—the eighth and most distant major planet orbiting our Sun—is dark, cold and whipped by supersonic winds. It was the first planet located through mathematical calculations, rather than by telescope.</Content>
            </Item>
        </Tabs>
    </Div>
);

OverflowNotCollapsible.storyName = "overflow + not collapsible";

export const DynamicTabs = () => (
    <Tabs aria-label="Planets">
        {["1", "2", "3"].map(x => (
            <Item key={x}>
                <Header>{`Header ${x}`}</Header>
                <Content>{`Content ${x}`}</Content>
            </Item>
        ))}
    </Tabs>
);

DynamicTabs.storyName = "dynamic tabs";

const ActiveHeader = ({ tab, children, ...rest }) => {
    const { selectedKey } = useTabsContext();
    const { key } = tab;

    return (
        <Tab
            {...rest}
            tab={tab}
        >
            {key === selectedKey ? <PlaceholderMajorIcon /> : <CrossMajorIcon />}
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

export const CustomComponents = () => (
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

CustomComponents.storyName = "custom components";

export const ConditionalRendering = () => (
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
);

ConditionalRendering.storyName = "conditional rendering";

export const Zoom = () => (
    <Stack>
        <Div className="zoom-in">
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
        </Div>
        <Div className="zoom-out">
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
        </Div>
    </Stack>
);

Zoom.storyName = "zoom";

export const Styling = () => (
    <Stack>
        <Inline>
            <Tabs border="warning-7" aria-label="Planets">
                <Item>
                    <Header className="border-red">Mars</Header>
                    <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
                </Item>
            </Tabs>
            <Tabs className="border-red" aria-label="Planets">
                <Item>
                    <Header className="border-red">Mars</Header>
                    <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
                </Item>
            </Tabs>
            <Tabs style={{ border: "1px solid red" }} aria-label="Planets">
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
                    <Content border="warning-7">Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
                </Item>
            </Tabs>
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

Styling.storyName = "styling";
