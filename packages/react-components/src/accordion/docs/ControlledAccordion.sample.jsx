() => {
    const [selectedIndex, setSelectedIndex] = useState(null);

    const handleSelectionChange = useCallback((event, index) => {
        setSelectedIndex(index);
        console.log(index);
    }, [setSelectedIndex]);

    return (
        <Accordion
            index={selectedIndex}
            onSelectionChange={handleSelectionChange}
        >
            <Item>
                <Header as="h3">Mars</Header>
                <Content>Mars is the fourth planet from the Sun and the second-smallest planet.</Content>
            </Item>
            <Item>
                <Header as="h3">Jupiter</Header>
                <Content>Jupiter is the fifth planet from the Sun and the largest in the Solar System.</Content>
            </Item>
            <Item>
                <Header as="h3">Venus</Header>
                <Content>Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty.</Content>
            </Item>
        </Accordion>
    );
};
