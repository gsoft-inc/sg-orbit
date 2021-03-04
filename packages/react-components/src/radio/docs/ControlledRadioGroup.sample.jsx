() => {
    const [value, setValue] = useState(null);

    const handleChange = useCallback((event, newValue) => {
        setValue(newValue);
        console.log(newValue);
    }, [setValue]);

    return (
        <RadioGroup
            value={value}
            onChange={handleChange}
        >
            <Radio value="mars">Mars</Radio>
            <Radio value="jupiter">Jupiter</Radio>
            <Radio value="pluto">Pluto</Radio>
        </RadioGroup>
    );
};
