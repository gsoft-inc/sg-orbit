() => {
    const [value, setValue] = useState("");

    const handleValueChange = useCallback((event, newValue) => {
        setValue(newValue);
        console.log(newValue);
    }, [setValue]);

    return (
        <TextArea
            value={value}
            onValueChange={handleValueChange}
            placeholder="Where to?"
        />
    );
};
