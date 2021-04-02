() => {
    const [expandedKeys, setExpandedKeys] = useState([]);

    const handleExpansionChange = useCallback((event, keys) => {
        setExpandedKeys(keys);
        console.log(keys);
    }, [setExpandedKeys]);

    return (
        <Accordion
            expandedKeys={expandedKeys}
            onExpansionChange={handleExpansionChange}
        >
            <Item key="mars">
                <Header as="h3">Mars</Header>
                <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
            </Item>
            <Item key="jupiter">
                <Header as="h3">Jupiter</Header>
                <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
            </Item>
            <Item key="venus">
                <Header as="h3">Venus</Header>
                <Content>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
            </Item>
        </Accordion>
    );
};
