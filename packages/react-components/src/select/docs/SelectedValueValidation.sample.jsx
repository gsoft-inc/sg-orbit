() => {
    const [isValid, setIsValid] = useState(true);

    const handleChange = useCallback((event, newValue) => {
        setIsValid(newValue === "earth");
        console.log(newValue);
    }, [setIsValid]);

    return (
        <Select
            validationState={isValid ? "valid" : "invalid"}
            placeholder="Planets"
            onChange={handleChange}
            aria-label="Planets"
        >
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
            <Item key="mercury">Mercury</Item>
            <Item key="neptune">Neptune</Item>
            <Item key="saturn">Saturn</Item>
            <Item key="uranus">Uranus</Item>
        </Select>
    );
};
