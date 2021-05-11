() => {
    const [value, setValue] = useState([]);

    const isValid = ["milky-way", "andromeda", "medusa"].every(x => value.includes(x));

    const handleChange = useCallback((event, newValue) => {
        setValue(newValue);
        console.log(newValue);
    }, [setValue]);

    return (
        <CheckboxGroup
            validationState={isValid ? "valid" : "invalid"}
            value={value}
            onChange={handleChange}
        >
            <Checkbox value="milky-way">Milky Way</Checkbox>
            <Checkbox value="andromeda">Andromeda</Checkbox>
            <Checkbox value="medusa">Medusa</Checkbox>
        </CheckboxGroup>
    );
};
