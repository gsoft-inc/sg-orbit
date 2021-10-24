() => {
    const [value, setValue] = useState(null);

    const isValid = value === "pluto";

    const handleChange = useCallback((event, newValue) => {
        setValue(newValue);
        console.log(newValue);
    }, [setValue]);

    return (
        <RadioGroup
            validationState={isValid ? "valid" : "invalid"}
            value={value}
            onChange={handleChange}
        >
            <Radio value="mars">Mars</Radio>
            <Radio value="jupiter">Jupiter</Radio>
            <Radio value="pluto">Pluto</Radio>
        </RadioGroup>
    );
};
