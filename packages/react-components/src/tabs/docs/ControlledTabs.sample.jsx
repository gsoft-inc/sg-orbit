import { Content, Header } from "@react-components/view";
import { Tab, Tabs } from "@react-components/tabs";
import { useCallback, useState } from "react";

export function ControlledTabs() {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleChange = useCallback((event, index) => {
        setSelectedIndex(index);
    }, [setSelectedIndex]);

    return (
        <Tabs index={selectedIndex} onChange={handleChange}>
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
}
