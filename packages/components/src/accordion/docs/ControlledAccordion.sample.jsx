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
                <H3>Mars</H3>
                <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
            </Item>
            <Item key="jupiter">
                <H3>Jupiter</H3>
                <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
            </Item>
            <Item key="venus">
                <H3>Venus</H3>
                <Content>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
            </Item>
        </Accordion>
    );
};
