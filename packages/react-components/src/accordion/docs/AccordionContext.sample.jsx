function SelectedHeader({ header, children, ...rest }) {
    const { selectedIndexes } = useAccordionContext();
    const { index } = header;

    return (
        <AccordionHeader
            {...rest}
            header={header}
            className={cx({ "primary-600": selectedIndexes.includes(index) })}
        >
            {children}
        </AccordionHeader>
    );
}

render(() => {
    return (
        <Accordion aria-label="Planets">
            <Item>
                <SelectedHeader as="h3">Mars</SelectedHeader>
                <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
            </Item>
            <Item>
                <SelectedHeader as="h3">Jupiter</SelectedHeader>
                <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
            </Item>
            <Item>
                <SelectedHeader as="h3">Venus</SelectedHeader>
                <Content>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
            </Item>
        </Accordion>
    );
}
);
