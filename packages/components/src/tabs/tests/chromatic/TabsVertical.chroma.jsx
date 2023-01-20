import { NotificationMajorIcon } from "@components/icons";
import { Content, Header } from "@components/placeholders";
import { Inline } from "@components/layout";
import { Tabs } from "@components/tabs";

import { Item } from "@components/collection";
import { Lozenge } from "@components/lozenge";
import { Text } from "@components/typography";

export default {
    title: "Chromatic/Tabs/vertical",
    component: Tabs,
    parameters: {
        chromatic: {
            delay: 100
        }
    }
};

export const Default = () => (
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
);

Default.storyName = "default";

export const Fluid = () => (
    <Tabs orientation="vertical" fluid height={14} aria-label="Planets">
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
);

Fluid.storyName = "fluid";

export const TabWithIcon = () => (
    <Tabs orientation="vertical" aria-label="Planets">
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
                <NotificationMajorIcon />
                <Text>Jupiter</Text>
                <Lozenge>New</Lozenge>
            </Header>
            <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
        </Item>
    </Tabs>
);

TabWithLozenge.storyName = "tab with lozenge";

export const States = () => (
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
        <Tabs orientation="vertical" fluid aria-label="Planets">
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

States.storyName = "states";
