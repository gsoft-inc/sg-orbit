() => {
    const [value, setValue] = useState("me@spacex.com");

    const isValid = useMemo(() => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value), [value]);

    return (
        <TextInput
            validationState={isValid ? "valid" : "invalid"}
            placeholder="Enter your email"
            value={value}
            onChange={event => {
                setValue(event.target.value);
                console.log(event.target.value);
            }}
        />
    );
};
