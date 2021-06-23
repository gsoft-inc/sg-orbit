() => {
    const MaxValue = 25;

    const [value, setValue] = useState("");

    const handleValueChange = useCallback(event => {
        setValue(event.target.value);
        console.log(event.target.value);
    }, [setValue]);

    const isValid = useMemo(() => value.length <= MaxValue, [value]);

    return (
        <TextArea
            validationState={isValid ? "valid" : "invalid"}
            value={value}
            placeholder={`Why should you go to space? (max ${MaxValue} characters)`}
            help={`${MaxValue - value.length} characters left.`}
            onValueChange={handleValueChange}
        />
    );
};
