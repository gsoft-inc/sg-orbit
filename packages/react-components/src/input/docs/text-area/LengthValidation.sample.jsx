() => {
    const MAX = 25;

    const [value, setValue] = useState("");

    const handleChange = useCallback(event => {
        setValue(event.target.value);
        console.log(event.target.value);
    }, [setValue]);

    const isValid = useMemo(() => value.length <= MAX, [value]);

    return (
        <TextArea
            validationState={isValid ? "valid" : "invalid"}
            value={value}
            placeholder={`Why should you go to space? (max ${MAX} characters)`}
            help={`${MAX - value.length} characters left.`}
            onChange={handleChange}
        />
    );
};
