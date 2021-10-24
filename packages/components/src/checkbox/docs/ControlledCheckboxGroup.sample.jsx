() => {
    const [value, setValue] = useState([]);

    const handleChange = useCallback((event, newValue) => {
        setValue(newValue);
        console.log(newValue);
    }, [setValue]);

    return (
        <CheckboxGroup
            value={value}
            onChange={handleChange}
        >
            <Checkbox value="milky-way">Milky Way</Checkbox>
            <Checkbox value="andromeda">Andromeda</Checkbox>
            <Checkbox value="medusa">Medusa</Checkbox>
        </CheckboxGroup>
    );
};
