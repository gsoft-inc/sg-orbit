() => {
    const [value, setValue] = useState(18);

    const handleChange = useCallback((event, newValue) => {
        setValue(newValue);
        console.log(newValue);
    }, [setValue]);

    const handleClick = useCallback(() => { setValue(""); }, [setValue]);

    const isValid = useMemo(() => value !== "", [value]);

    return (
        <Inline verticalAlign="center">
            <NumberInput
                validationState={isValid ? "valid" : "invalid"}
                value={value}
                min={1}
                placeholder="Age"
                onChange={handleChange}
            />
            <TextLink
                as="button"
                onClick={handleClick}
            >
                clear
            </TextLink>
        </Inline>
    );
};
