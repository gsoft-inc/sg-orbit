() => {
    const [isValid, setIsValid] = useState(false);

    return (
        <Select
            defaultSelectedKey="mars"
            validationState={isValid ? "valid" : "invalid"}
            placeholder="Planets"
            onChange={(event, newValue) => {
                setIsValid(newValue === "earth");
                console.log(newValue);
            }}
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
