() => {
    const [value, setValue] = useState(null);

    const isValid = useMemo(() => !value || value > new Date(1970, 0, 5), [value]);

    return (
        <DateInput
            validationState={isValid ? "valid" : "invalid"}
            placeholder="dd/mm/yyyy"
            value={value}
            onDateChange={(event, newDate) => {
                setValue(newDate);
                console.log(newDate);
            }}
        />
    );
};
