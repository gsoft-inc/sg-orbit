() => {
    const [value, setValue] = useState([]);

    const handleChange = useCallback((event, newValue) => {
        setValue(newValue);
        console.log(newValue);
    }, [setValue]);

    return (
        <TileGroup
            value={value}
            selectionMode="multiple"
            onChange={handleChange}
            rowSize={3}
        >
            <Tile value="buy">
                <Heading>Buy a ticket</Heading>
                <Content>Purchase a ticket for any of our space travel adventure.</Content>
            </Tile>
            <Tile value="refund">
                <Heading>Refund a ticket</Heading>
                <Content>Get a refund for any space travel adventure ticket.</Content>
            </Tile>
            <Tile value="manage-account">
                <Heading>Manage Account</Heading>
                <Content>Update your address or any other information related to your account.</Content>
            </Tile>
        </TileGroup>
    );
};
