() => {
    const [value, setValue] = useState(null);

    const handleValueChange = useCallback((event, newValue) => {
        setValue(newValue);
        console.log(newValue);
    }, [setValue]);

    return (
        <NumberInput
            value={value}
            onValueChange={handleValueChange}
            placeholder="Where to?"
        />
    );
};
