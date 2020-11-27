import { Content, Header } from "@react-components/placeholders";
import { Item } from "@react-components/placeholders";
import { LightbulbIcon, NotificationIcon } from "@react-components/icons";
import { Tab, Tabs } from "@react-components/tabs";
import { Text } from "@react-components/text";

function ActiveHeader({ selected, children, ...rest }) {
    return (
        <Tab
            {...rest}
            selected={selected}
        >
            {selected ? <LightbulbIcon /> : <NotificationIcon />}
            <Text>{children}</Text>
        </Tab>
    );
}

export function CustomTabs() {
    return (
        <Tabs aria-label="Planets">
            <Item>
                <ActiveHeader>Mars</ActiveHeader>
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
}
