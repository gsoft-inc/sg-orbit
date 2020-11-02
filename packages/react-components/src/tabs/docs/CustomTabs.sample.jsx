import { Content, Header } from "@react-components/view";
import { LightbulbIcon, NotificationIcon } from "@react-components/icons";
import { Tab, TabElement, Tabs } from "@react-components/tabs";
import { Text } from "@react-components/text";

function ActiveHeader({ selected, children, ...rest }) {
    return (
        <TabElement
            {...rest}
            selected={selected}
        >
            {selected ? <LightbulbIcon /> : <NotificationIcon />}
            <Text>{children}</Text>
        </TabElement>
    );
}

export function CustomTabs() {
    return (
        <Tabs aria-label="Planets">
            <Tab>
                <ActiveHeader>Mars</ActiveHeader>
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
}
