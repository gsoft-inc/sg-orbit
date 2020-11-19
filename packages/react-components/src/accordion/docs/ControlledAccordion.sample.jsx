import { Accordion } from "@react-components/accordion";
import { Content, Header } from "@react-components/view";
import { Item } from "@react-components/collection";
import { useCallback, useState } from "react";

export function ControlledAccordion() {
    const [openedIndexes, setOpenedIndexes] = useState(0);

    const handleChange = useCallback((event, index) => {
        setOpenedIndexes(index);
    }, [setOpenedIndexes]);

    return (
        <Accordion index={openedIndexes} onChange={handleChange}>
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
        </Accordion>
    );
}
