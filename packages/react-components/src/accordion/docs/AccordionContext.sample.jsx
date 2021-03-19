function SelectedHeader({ header, children, ...rest }) {
    const { expandedKeys } = useAccordionContext();
    const { key } = header;

    return (
        <AccordionHeader
            {...rest}
            header={header}
            className={cx({ "primary-600": expandedKeys.includes(key) })}
        >
            {children}
        </AccordionHeader>
    );
}

render(() => {
    return (
        <Accordion aria-label="Planets">
            <Item key="mars">
                <SelectedHeader as="h3">Mars</SelectedHeader>
                <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
            </Item>
            <Item key="jupiter">
                <SelectedHeader as="h3">Jupiter</SelectedHeader>
                <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
            </Item>
            <Item key="venus">
                <SelectedHeader as="h3">Venus</SelectedHeader>
                <Content>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
            </Item>
        </Accordion>
    );
}
);
