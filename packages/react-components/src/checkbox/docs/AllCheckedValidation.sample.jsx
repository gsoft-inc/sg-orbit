() => {
    const [value, setValue] = useState([]);

    const isValid = ["milky-way", "andromeda", "medusa"].every(x => value.includes(x));

    return (
        <CheckboxGroup
            validationState={isValid ? "valid" : "invalid"}
            value={value}
            onChange={(event, x) => {
                setValue(x);
                console.log(x);
            }}
        >
            <Checkbox value="milky-way">Milky Way</Checkbox>
            <Checkbox value="andromeda">Andromeda</Checkbox>
            <Checkbox value="medusa">Medusa</Checkbox>
        </CheckboxGroup>
    );
};
