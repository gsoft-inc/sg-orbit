import { Accordion, AccordionHeader, useAccordionItemContext } from "@react-components/accordion";
import { Content, Header } from "@react-components/view";
import { Item } from "@react-components/collection";
import { LightbulbIcon, NotificationIcon } from "@react-components/icons";
import { Text } from "@react-components/text";

function ActiveHeader({ children, ...rest }) {
    const { isOpen } = useAccordionItemContext();

    return (
        <AccordionHeader {...rest}>
            {isOpen ? <LightbulbIcon /> : <NotificationIcon />}
            <Text>{children}</Text>
        </AccordionHeader>
    );
}

export function CustomAccordion() {
    return (
        <Accordion aria-label="Planets">
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
        </Accordion>
    );
}
