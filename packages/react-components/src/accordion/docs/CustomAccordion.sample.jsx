function ActiveHeader({ header, children, ...rest }) {
    const { selectedIndexes } = useAccordionContext();
    const { index } = header;

    return (
        <AccordionHeader
            {...rest}
            header={header}
            className={selectedIndexes.includes(index) ? "primary-600" : undefined}
        >
            {children}
        </AccordionHeader>
    );
}

function CustomAccordion() {
    return (
        <Accordion aria-label="Planets">
            <Item>
                <ActiveHeader as="h3">Mars</ActiveHeader>
                <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
            </Item>
            <Item>
                <ActiveHeader as="h3">Jupiter</ActiveHeader>
                <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
            </Item>
            <Item>
                <ActiveHeader as="h3">Venus</ActiveHeader>
                <Content>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
            </Item>
        </Accordion>
    );
}

render(
    <CustomAccordion />
);
