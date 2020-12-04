() => {
    const [value, setValue] = useState(null);

    const isValid = value === "pluto";

    return (
        <RadioGroup
            validationState={isValid ? "valid" : "invalid"}
            value={value}
            onChange={(event, x) => {
                setValue(x);
                console.log(x);
            }}
        >
            <Radio value="mars">Mars</Radio>
            <Radio value="jupiter">Jupiter</Radio>
            <Radio value="pluto">Pluto</Radio>
        </RadioGroup>
    );
};
