import { Content, Header } from "@react-components/placeholders";
import { Item } from "@react-components/placeholders";
import { Tabs } from "@react-components/tabs";
import { useCallback, useState } from "react";

export function ControlledTabs() {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleChange = useCallback((event, index) => {
        setSelectedIndex(index);
        console.log(index);
    }, [setSelectedIndex]);

    return (
        <Tabs index={selectedIndex} onChange={handleChange} aria-label="Planets">
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
}
