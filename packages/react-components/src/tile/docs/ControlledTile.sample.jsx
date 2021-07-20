() => {
    const [isChecked, setIsChecked] = useState(false);

    const handleChange = useCallback(() => {
        setIsChecked(x => !x);
        console.log(!isChecked);
    }, [isChecked, setIsChecked]);

    return (
        <Tile
            style={{ "width": "500px" }}
            checked={isChecked}
            onChange={handleChange}
        >
            <Heading>Buy a ticket</Heading>
            <Content>Purchase a ticket for any of our space travel adventure.</Content>
        </Tile>
    );
};
